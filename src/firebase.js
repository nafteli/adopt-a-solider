import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsQqDQr2tcpeMCizvIiOOeO8FLhpM0Wwc",
  authDomain: "adopt-a-solide.firebaseapp.com",
  projectId: "adopt-a-solide",
  storageBucket: "adopt-a-solide.appspot.com",
  messagingSenderId: "530302056066",
  appId: "1:530302056066:web:8d1c9b7e861b7b0c7ce69b",
  measurementId: "G-TJW3RQNM89"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const addData = async (collectionName, data) => {
  const checkFund = await readData(collectionName);
  const check = checkFund.find(soldier => soldier.name === data.name);
  if (!check) {
    try {
      data = { ...data, courage: false };
      const docRef = await db.collection(collectionName).add(data);
      return docRef.id;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }
  throw new Error("soldierFund")
};

export const noteAdopted = async (collectionName = "soldier") => {
  const soldiersNoteAdopted = await readData(collectionName)
  return await soldiersNoteAdopted.filter(adoptable => !adoptable.courage)
}

export const readData = async (collectionName = "soldier") => {
  try {
    const snapshot = await db.collection(collectionName).get();
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (error) {
    console.error("Error reading documents: ", error);
    throw error;
  }
};

export const updateData = async (documentId, newData, collectionName = "soldier") => {
  try {
    await db.collection(collectionName).doc(documentId).update(newData);
    return true; 
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export const deleteData = async (collectionName, documentId) => {
  try {
    await db.collection(collectionName).doc(documentId).delete();
    return true; // Success
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
