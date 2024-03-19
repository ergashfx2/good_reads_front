import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBpp4hnCZmX4ytbxr4c7Oy9uPQ9ZUtvQE",
  authDomain: "konspekt-349411.firebaseapp.com",
  projectId: "konspekt-349411",
  storageBucket: "konspekt-349411.appspot.com",
  messagingSenderId: "20623673329",
  appId: "1:20623673329:web:2a37311c049749ad612650",
  measurementId: "G-6W6B7JK4K2"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const uploadImage = async (file) => {
  try {
    // Create a reference to the storage service
    const storageRef = firebase.storage().ref();

    // Generate a unique name for the file
    const fileName = `${Date.now()}_${file.name}`;

    // Upload file to the storage reference
    const uploadTask = storageRef.child(`images/${fileName}`).put(file);

    // Wait for the upload to complete and get the download URL
    const snapshot = await uploadTask;
    return await snapshot.ref.getDownloadURL();
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};


export { storage,uploadImage };
