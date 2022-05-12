import firebase from "firebase/compat/app"
import 'firebase/compat/storage'
import {upload} from './upload.js'

const firebaseConfig = {
    apiKey: "AIzaSyBwNIlBYVJCpWns2ijg6fCZx2aJOVO5pS0",
    authDomain: "fe-upload-fc754.firebaseapp.com",
    projectId: "fe-upload-fc754",
    storageBucket: "fe-upload-fc754.appspot.com",
    messagingSenderId: "841194410543",
    appId: "1:841194410543:web:9776d4eeb4830c9cedecda"
  }

   firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage()



upload( '#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],

    onUpload(files) {
        files.forEach(file => {
           const ref = storage.ref(`images/${file.name}`)
           const task = ref.put(file)

           task.on('statee__changed', snapshot => {
               const percentage = (snapshot.bytesTransferred / 
               snapshot.totalBytes) * 100
               console.log(percentage)
           }, error => {
               console.log(error)
           }, () => {
               console.log('Complate')
           })
        });
    }
})