import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from "./firebase";

async function upload(file) {
  let date = new Date();
  const sanitizedFileName = file.name.replace(/\s+/g, '_');  // Replace spaces with underscores
  const storageRef = ref(storage, `image/${date.getTime()}_${sanitizedFileName}`);

  console.log("Uploading file:", file);  // Log file details
  console.log("Storage reference:", storageRef);  // Log the storage ref to check the path

  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error("Upload Error:", error);  // Log the full error
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

export default upload;
