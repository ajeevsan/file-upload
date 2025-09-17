import { useState } from 'react';
import { uploadFile } from '../api/api';

export const Upload = () => {
  const [file, setFile] = useState(null);
  const [passcode, setPasscode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !passcode) {
      alert('Please select a file and enter a passcode.');
      return;
    }

    try {
      // Call our API helper
      const data = await uploadFile(file, passcode);
      console.log('Server response:', data);

      alert(`✅ File uploaded!\nDownload URL: ${data.downloadUrl}`);
    } catch (err) {
      console.error(err);
      alert('Upload error');
    }
  };

  return (
    <div className="main-container">
      <form className="input-container" onSubmit={handleSubmit}>
        <div>
          <label>Upload File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label>Passcode:</label>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter passcode"
            required
          />
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};
