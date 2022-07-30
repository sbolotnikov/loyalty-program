
import { ref, deleteObject } from "firebase/storage";
import { storage } from '../firebase';

 const deleteStorageRecord=(fileName)=>{


// Create a reference to the file to delete
const desertRef = ref(storage, fileName);

// Delete the file
deleteObject(desertRef).then(() => {
  // File deleted successfully
  console.log("delete storage file")
}).catch((error) => {
  // Uh-oh, an error occurred!
  console.log(error.message)
});
  }  
    export default { deleteStorageRecord}