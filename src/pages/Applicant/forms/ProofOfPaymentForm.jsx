// src/forms/ProofOfPaymentForm.js
import React, { useState, useEffect, useRef } from 'react';
import { TextField, Box, Grid, Button,Card,CardMedia, useTheme,useMediaQuery, Typography } from '@mui/material';
// import axios from 'axios';

 import imgUser from '../../../images/imgblank.jpg';
//  import {db} from '../../../firebase/firestore2.js';
  //  import storage from '../../../firebase/firestore.js';
import { db, storage }  from '../../../firebase/firestore.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { collection, getDocs, query, where } from "firebase/firestore";

import { insertRIDImagesFile, addDataToFirebase }  from '../../../firebase/queriesRID.js';
import { decryptPWord } from '../../../functions/ChrisFunctions';
import Swal from 'sweetalert2';


// const imgUser = IoDocumentOutline;

const ProofOfPaymentForm = () => {
  let loginName = decryptPWord(sessionStorage.getItem("loginName"));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [imageFile, setImageFile] = useState(null);
  const [imageShow, setImageShow] = useState(imgUser);
  
  
  useEffect(() => {
     fetchImages();
  }, []);

  
  const handleImageChange = (e) => {
    // setImageFile(e.target.files[0]);
    // setImageFile(e.target.files[0]);
    const tFile = URL.createObjectURL(e.target.files[0]);
    const timer = setTimeout(() => {
      // setFile(e.target.files[0]);
      setImageFile(e.target.files[0]);
      setImageShow(tFile);
    }, 50);
    return () => clearTimeout(timer);

  };

  
  const handleSave = async () => {
    // hiddenFileInput.current.click();
    
    if (!imageFile) {
      console.error('No image file selected');
      return;
    }
    try {
      const imageRef = ref(storage, `application/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      
      let newData= {
        loginName: loginName,
        description: 'Proof of Payment',
        imageUrl: imageUrl
        }

      const data = await insertRIDImagesFile(newData)
      if (data===undefined || data.status !== 200) {
        //  alert('not save')

      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully save!",
          showConfirmButton: false,
          timer: 2500
        });
      }
      fetchImages();
    } catch (error) {
      console.error('Error saving document:', error);
    }
  
  };

  
  
    // const fetchImages = async () => {
    //   try {
    //     const querySnapshot = await getDocs(collection(db, 'ridimagesfile'));
    //     const imagesData = querySnapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //     console.log('imagesData',imagesData)
    //     // alert(imagesData.ima geUrl)
    //     setImageFile(imagesData[0].imageUrl);
    //     setImageShow(imagesData[0].imageUrl);
    //   } catch (error) {
    //     console.error('Error fetching images:', error);
    //   }
    // };

    const fetchImages = async () => {
      try {
        // Create a query against the collection.
        const q = query(collection(db, 'ridimagesfile'), where('loginName', '==', loginName));
    
        // Execute the query
        const querySnapshot = await getDocs(q);
        const imagesData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        
        console.log('imagesData', imagesData);
    
        if (imagesData.length > 0) {
          setImageFile(imagesData[0].imageUrl);
          setImageShow(imagesData[0].imageUrl);
        } else {
          console.log('No images found for the specified loginName.');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
  

  


  return (
    <Box>
      {/* <Button variant="contained" component="label" sx={{ml:5,mb:1, textTransform:'none'}}  >
        Upload Proof of Payment
        <input type="file" hidden />
      </Button> */}
       
      {/* <Box border={1} borderRadius={2} borderColor="lightgray" sx={{ width:'95%', padding:'40px 20px 10px 40px' }}> */}
      
      { isMobile || !isMobile ?
        <>
          <Typography align='left' sx={{fontSize:'16px', fontWeight:'bold'}} >Proof of Payment</Typography>
          <br></br><br></br>
        </>
        :""
      }
      <Grid container spacing={2} gutterBottom sx={{marginLeft:'1px'}} >
        <Box border={1} borderRadius={2} borderColor="lightgray" sx={{ width:'200px', padding:'20px 20px 20px 25px' }}>
          <Card>
              <CardMedia
                component="img"
                height="180"
                width="180"
                image={imageShow}
                // alt={image.title}
              />
           </Card>     
         </Box>
          <Grid item xs={3}>
            <Button
              variant="contained"
              component="label"

              sx={{ m: 1, mb:2, width:'160px' }}
            >
              Select Picture
              <input
                type="file"
                hidden
                onChange={handleImageChange}

              //   type="file"
              // ref={hiddenFileInput}
              // onChange={handleChange}
              // accept="/users/*"
              />
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ m: 1 , width:'160px'}}
              onClick={handleSave}
            >
              Upload Image
            </Button>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default ProofOfPaymentForm;
