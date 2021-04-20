import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCEqdwBsZDu2eEgS-Q18Q7pw6pO24Ww6nE",
    authDomain: "johnston313-84387.firebaseapp.com",
    projectId: "johnston313-84387",
    storageBucket: "johnston313-84387.appspot.com",
    messagingSenderId: "153292089690",
    appId: "1:153292089690:web:069d57d75319f5a5cfeb63"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;

