import React, { useState } from 'react';
import FileUpload from './Components/FileUpload';
import DataTable from './Components/DataTable';
import axios from 'axios';
import './Components/style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [uploading, setUploading] = useState(false); // Track whether upload is in progress

  const handleUpload = (data) => {
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setData(data);
      setErrors([]);
    }
  };

  const confirmUpload = async () => {
    try {
      setUploading(true); // Start upload process
      const response = await axios.post('https://shipmnts-tffd.onrender.com/api/confirm', { data });
      setUploading(false); // End upload process
      if (response.data.errors) {
        setErrors(response.data.errors);
      } else {
        toast.success('Data successfully uploaded');
        setData([]);
        setErrors([]);
      }
    } catch (error) {
      setUploading(false); // End upload process on error
      console.error('Error confirming upload:', error);
      setErrors(['Error confirming upload. Please try again.']);
    }
  };

  const cancelUpload = () => {
    setData([]);
    setErrors([]);
  };

  return (
    <div>
      <h1>Upload Company and Contact Data</h1>
      <p>You need to provide data in the form of an Excel (.xls or .xlsx) file. The data must contain the following columns:</p>
      <ul>
        <li>Company Name</li>
        <li>Company Address</li>
        <li>Company Phone</li>
        <li>Company Email</li>
        <li>Company Website</li>
        <li>Number of Employees</li>
        <li>Founded Date</li>
        <li>Industry Type</li>
        <li>Contact Name</li>
        <li>Contact Email</li>
        <li>Contact Phone</li>
        <li>Date of Birth</li>
        <li>Contact Type</li>
      </ul>
      <h4>If your company already exists then we add only your contact</h4>
      <FileUpload onUpload={handleUpload} />
      {data.length > 0 && (
        <>
          <DataTable data={data} errors={errors} />
          <div>
            <button onClick={confirmUpload} disabled={uploading}>Confirm Upload</button>
            <button className="cancel-button" onClick={cancelUpload} disabled={uploading}>Cancel</button>
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
