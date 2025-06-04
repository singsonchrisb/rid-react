// src/forms/UploadDocumentsForm.js

import React, { useState, useEffect, useRef } from 'react';
import { TextField, Box, Typography, Button,Grid, Card, CardMedia, useTheme,useMediaQuery } from '@mui/material';
import Swal from 'sweetalert2';

import imgUser from '../../../images/imgblank.jpg';
// import ProofOfPaymentForm from './ProofOfPaymentForm';

import { insertRIDImagesFile, addDataToFirebase }  from '../../../firebase/queriesRID.js';
import { decryptPWord } from '../../../functions/ChrisFunctions';

const UploadDocumentsForm = () => {
  let loginName = decryptPWord(sessionStorage.getItem("loginName"));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imageFile3, setImageFile3] = useState(null);
  const [imageFile4, setImageFile4] = useState(null);

  const [imageShow1, setImageShow1] = useState(imgUser);
  const [imageShow2, setImageShow2] = useState(imgUser);
  const [imageShow3, setImageShow3] = useState(imgUser);
  const [imageShow4, setImageShow4] = useState(imgUser);
 
  
  useEffect(() => {
     fetchImages();
  }, []);

  
  const handleImageChange = (e) => {
    const tFile = URL.createObjectURL(e.target.files[0]);
    const timer = setTimeout(() => {
      alert(e.name)
      if (e.name==='imageFile1') {
         setImageFile1(e.target.files[0]);
         setImageShow1(tFile);
      } else if (e.name==='imageFile2') {
        setImageFile2(e.target.files[0]);
        setImageShow2(tFile);
      } else if (e.name==='imageFile3') {
        setImageFile3(e.target.files[0]);
        setImageShow3(tFile);
      } else if (e.name==='imageFile4') {
        setImageFile4(e.target.files[0]);
        setImageShow4(tFile);    
      }
    }, 50);
    return () => clearTimeout(timer);
  };

  
  const handleSave = async () => {
    // hiddenFileInput.current.click();
    
    if (!imageFile1) {
      // console.error('No image file selected');
      // return;
    }

    try {
      const imageRef1 = ref(storage, `application/${imageFile1.name}`);
      await uploadBytes(imageRef1, imageFile1);
      const imageUrl1 = await getDownloadURL(imageRef1);

      const imageRef2 = ref(storage, `application/${imageFile2.name}`);
      await uploadBytes(imageRef2, imageFile2);
      const imageUrl2 = await getDownloadURL(imageRef2);

      const imageRef3 = ref(storage, `application/${imageFile3.name}`);
      await uploadBytes(imageRef3, imageFile3);
      const imageUrl3 = await getDownloadURL(imageRef3);

      const imageRef4 = ref(storage, `application/${imageFile4.name}`);
      await uploadBytes(imageRef4, imageFile4);
      const imageUrl4 = await getDownloadURL(imageRef4);
      
      let newData= {
        loginName: loginName,
        imageUrl1: imageUrl1,
        imageUrl2: imageUrl2,
        imageUrl3: imageUrl3,
        imageUrl4: imageUrl4,
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
          setImageFile1(imagesData[0].imageUrl1);
          setImageShow1(imagesData[0].imageUrl1);
        } else {
          console.log('No images found for the specified loginName.');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

  return (
    <Box sx={{marginLeft: isMobile ? '10px':'60px'}}>
      {/* <Typography variant="h5">Upload Documents</Typography> */}
      {/* <Button variant="contained" component="label">
        Upload Birth Certificate
        <input type="file" hidden />
      </Button>

      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Barangay Clearance
        <input type="file" hidden />
      </Button>
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload Police Clearance
        <input type="file" hidden />
      </Button> */}

      <br></br>
      <Typography align='left' sx={{fontSize:'16px', fontWeight:'bold'}} >PSA (Birth Certificate)</Typography>
      <br></br>
  
      <Grid container spacing={2} gutterBottom sx={{marginLeft:'1px'}} >
        <Box border={1} borderRadius={2} borderColor="lightgray" sx={{ width:'200px', padding:'20px 20px 20px 25px' }}>
          <Card>
              <CardMedia
                component="img"
                height="180"
                width="180"
                image={imageShow1}
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
                name="imageFile1"
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


      <br></br><br></br>
      <Typography align='left' sx={{fontSize:'16px', fontWeight:'bold'}} >Valid ID's</Typography>
      <br></br>
  
      <Grid container spacing={2} gutterBottom sx={{marginLeft:'1px'}} >
        <Box border={1} borderRadius={2} borderColor="lightgray" sx={{ width:'200px', padding:'20px 20px 20px 25px' }}>
          <Card>
              <CardMedia
                component="img"
                height="180"
                width="180"
                // name="imageFile2"
                image={imageShow2}
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
                name="imageFile2"
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


      <br></br><br></br>
      <Typography align='left' sx={{fontSize:'16px', fontWeight:'bold'}} >Police Clearance</Typography>
      <br></br>
  
      <Grid container spacing={2} gutterBottom sx={{marginLeft:'1px'}} >
        <Box border={1} borderRadius={2} borderColor="lightgray" sx={{ width:'200px', padding:'20px 20px 20px 25px' }}>
          <Card>
              <CardMedia
                component="img"
                height="180"
                width="180"
                image={imageShow3}
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
                name="imageFile3"
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


      <br></br><br></br>
      <Typography align='left' sx={{fontSize:'16px', fontWeight:'bold'}} >Barangaay Clearance</Typography>
      <br></br>
  
      <Grid container spacing={2} gutterBottom sx={{marginLeft:'1px'}} >
        <Box border={1} borderRadius={2} borderColor="lightgray" sx={{ width:'200px', padding:'20px 20px 20px 25px' }}>
          <Card>
              <CardMedia
                component="img"
                height="180"
                width="180"
                image={imageShow4}
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
                name="imageFile4"
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
      <Box mt={3} align='center'>
            <Button style ={{width: '100%', fontSize:'16px', textTransform:'none'}} type="button" variant="contained" color="success" onClick={() => handleSave()}>Save</Button>
            {/* <Button style ={{marginLeft:'40px', width:'100px', textTransform:'none', backgroundColor: '#DC4C64'}} variant="contained" onClick={() => handleCancel()}>Cancel</Button> */}
      </Box>
    </Box>
  );
};

export default UploadDocumentsForm;
