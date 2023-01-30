import firebase from 'firebase';
//import 'firebase/storage';


const firebaseData = firebase.initializeApp({
    apiKey: "AIzaSyD2HU4yjN4ZYlngqKx5DvqlbAeaedaz2EI",
    authDomain: "covid-tracker-92c8b.firebaseapp.com",
    projectId: "covid-tracker-92c8b",
    storageBucket: "covid-tracker-92c8b.appspot.com",
    messagingSenderId: "1037393306847",
    appId: "1:1037393306847:web:d4d0a06cf64cc024bd356a",
    measurementId: "G-TZ647MYVEP"
});

const messdb = firebaseData.firestore();
const messStorage = firebase.storage();


export {messdb, messStorage};