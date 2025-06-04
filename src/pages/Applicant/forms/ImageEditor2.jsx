// src/ImageEditor.js
import React, { useState, useEffect } from 'react';
// import { db, storage } from './firebase';
// import storage from '../../api/firebase.js';
// import storage from '../../firebase/firestore.js';
// import db from '../../firebase/firestore.js';
import { db, storage }  from '../../../firebase/firestore.js';
// import { db, storage } from '../../api/firebaseRID.js';
import {
  TextField,
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ImageEditor = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const fetchImagesOLD = async () => {
    const querySnapshot = await getDocs(collection(db, 'images'));
    const imagesData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setImages(imagesData);
  };

  const fetchImages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'images'));
      const imagesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setImages(imagesData);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSaveOld = async () => {
    if (imageFile) {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, 'images'), {
        title,
        description,
        message,
        imageUrl,
      });

      setTitle('');
      setDescription('');
      setMessage('');
      setImageFile(null);

      // Refresh the images list
      fetchImages();
    }
  };

  const handleSave = async () => {
    if (!imageFile) {
      console.error('No image file selected');
      return;
    }

    try {
      const imageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, 'images'), {
        title,
        description,
        message,
        imageUrl,
      });

      setTitle('');
      setDescription('');
      setMessage('');
      setImageFile(null);

      // Refresh the images list
      fetchImages();
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Image Editor
      </Typography>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          component="label"
          sx={{ m: 1 }}
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ m: 1 }}
              onClick={handleSave}
            >
              Save
            </Button>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={image.imageUrl}
                alt={image.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {image.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {image.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {image.message}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ImageEditor;
