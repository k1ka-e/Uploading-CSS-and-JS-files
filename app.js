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

    onUpload(files, blocks) {
        files.forEach((file, index) => {
           const ref = storage.ref(`images/${file.name}`)
           const task = ref.put(file)

           task.on('statee__changed', snapshot => {
               const percentage = ((snapshot.bytesTransferred / 
               snapshot.totalBytes) * 100).toFixed(0) + '%'
               const block = blocks[index].querySelector('.preview__info__progress')
               block.textContent = percentage
               block.style.width = percentage
            }, error => {
               console.log(error)
           }, () => {
               task.snapshot.ref.getDownloadURL().then(url => {
                   console.log('Download URL', url)
               })
           })
        });
    }
})