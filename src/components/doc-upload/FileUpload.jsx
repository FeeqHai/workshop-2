import React, { useState, useRef } from "react";
import { FileUpload } from "primereact/fileupload";
import { storage } from "../../firebase/upload"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Toast } from "primereact/toast";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './FileUpload.css';


const FileUploadComponent = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState("");
  const toast = useRef(null); // for showing success/error messages

  const handleUpload = async (e) => {
    setIsUploading(true);
    setStatus("Uploading...");

    try {
      for (const file of e.files) {
        const storageRef = ref(storage, `documents/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        console.log("Uploaded file URL:", url);
      }
      setStatus("✅ Files uploaded to Firebase successfully!");
      toast.current.show({ severity: 'success', summary: 'Upload Success', detail: 'Files uploaded successfully.' });
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed.");
      toast.current.show({ severity: 'error', summary: 'Upload Failed', detail: 'There was an error uploading the files.' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Toast ref={toast} /> {/* Toast component for success/error feedback */}

      <FileUpload
        customUpload
        multiple
        uploadHandler={handleUpload} // handles file upload
        chooseLabel="Choose Files"
        uploadLabel="Upload"
        cancelLabel="Cancel"
        disabled={isUploading} // disable during upload
      />

      <p>{status}</p>
    </div>
  );
};

export default FileUploadComponent;
