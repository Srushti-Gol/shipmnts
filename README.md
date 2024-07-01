# Company and Contact Data Upload App

Implement a feature that allows users to upload an Excel sheet containing company and contact data. Upon upload, display the data in a table for review and confirmation before storing it in the database.
which is live on https://shipmnts-uplodecompanydata.vercel.app/

## Features

- Upload Excel files containing company and contact data.
- Validate uploaded data against required columns and format.
- Update existing company information and add new contacts if the company already exists.
- Display errors if data validation fails during upload.
- Cancel upload option to discard uploaded data.
- Responsive UI with error messages and confirmation alerts.

## Technologies Used

- Frontend: React, Axios
- Backend: Node.js, Express, MongoDB (for storing data)
- Excel Handling: XLSX for parsing Excel files
- Styling: CSS for basic styling

## Installation

1. **Clone the repository:**

   ```
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies:**

   ```
   cd frontend && npm install
   cd backend && npm install
   ```

3. **Set up environment variables:**

   - Create `.env` file in `server` folder and define necessary variables (`MONGO_URI`, etc.).

4. **Start the application:**

   ```
   #for both frontend and backend 
   npm start
   ```

   This will start both the frontend and backend servers concurrently.

## Usage

1. **Upload Data:**

   - Click on the "Choose File" button to select an Excel file (.xls or .xlsx) containing company and contact data.
   - Click "Upload" to validate and upload the data. Errors will be displayed if any required columns are missing or if the file format is incorrect.

2. **Confirm Upload:**

   - After successful validation, the uploaded data will be displayed in a table.
   - Click "Confirm Upload" to save the data. If a company already exists, only new contacts will be added.

3. **Cancel Upload:**

   - Click "Cancel" to discard the uploaded data and start over.

