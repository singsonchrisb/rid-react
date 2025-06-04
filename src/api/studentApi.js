// studentApi.js
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from 'firebase/firestore';
  import { query, where, or } from 'firebase/firestore';
  import { db } from './firebaseConfig';
  
  const studentCollection = collection(db, 'students');
  
  // Create a student
  export const createStudent = async (studentData) => {
    const newStudent = {
      lastName: studentData.lastName || '',
      firstName: studentData.firstName || '',
      middleName: studentData.middleName || '',
      birthDate: studentData.birthDate || '',
      dateEncode: new Date().toISOString(), // defaults to current time
      address: studentData.address || '',
      mobileNo: studentData.mobileNo || '',
      photoUrl: studentData.photoUrl || '',
      email: studentData.email || '',
      remarks: studentData.remarks || '',
      status: studentData.status || 'active',
      gradeLevel: studentData.gradeLevel || '',
    };
    const docRef = await addDoc(studentCollection, newStudent);
    return { id: docRef.id, ...newStudent };
  };
  
  // Get all students
  export const getStudents = async () => {
    const snapshot = await getDocs(studentCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  
  // Update a student by ID
  export const updateStudent = async (id, updatedData) => {
    const studentDoc = doc(db, 'students', id);
    await updateDoc(studentDoc, updatedData);
    return true;
  };
  
  // Delete a student by ID
  export const deleteStudent = async (id) => {
    const studentDoc = doc(db, 'students', id);
    await deleteDoc(studentDoc);
    return true;
  };
  

  
export const searchStudent = async ({ lastName, firstName, birthDate }) => {
    const studentRef = collection(db, 'students');
  
    // Collect active filters
    const filters = [];
    if (lastName) filters.push(where('lastName', '==', lastName));
    if (firstName) filters.push(where('firstName', '==', firstName));
    if (birthDate) filters.push(where('birthDate', '==', birthDate));
  
    // If no filters provided, return all students (or empty array)
    if (filters.length === 0) return [];
  
    // Create OR query (FireStore OR queries require Firebase v9+ and indexed)
    const q = query(studentRef, or(...filters));
  
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };