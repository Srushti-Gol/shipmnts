import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const data = new FormData();
    data.append('file', file);

    try {
      const response = await axios.post('https://shipmnts-tffd.onrender.com/api/upload', data);
      if (response.data.errors) {
        setError(response.data.errors.join(', '));
      } else {
        setError('');
        onUpload(response.data);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default FileUpload;
