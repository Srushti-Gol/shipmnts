import React, { useState } from 'react';
import FileUpload from './Components/FileUpload';
import DataTable from './Components/DataTable';
import axios from 'axios';
import './Components/style.css';

const App = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

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
      const response = await axios.post('https://shipmnts-tffd.onrender.com/api/confirm', { data });
      if (response.data.errors) {
        setErrors(response.data.errors);
      } else {
        alert('Data successfully uploaded');
        setData([]);
        setErrors([]);
      }
    } catch (error) {
      console.error('Error confirming upload:', error);
      setErrors(['Error confirming upload. Please try again.']);
    }
  };

  return (
    <div>
      <h1>Upload Company and Contact Data</h1>
      <h3>If your company already exit then we update only your contact</h3>
      <FileUpload onUpload={handleUpload} />
      {data.length > 0 && (
        <>
          <DataTable data={data} errors={errors} />
          <button onClick={confirmUpload}>Confirm Upload</button>
        </>
      )}
    </div>
  );
};

export default App;
