import { useState } from 'react';
import { downloadFile } from '../api/api';

export const Download = () => {
  const [fileId, setFileId] = useState('');
  const [passcode, setPasscode] = useState('');

  const handleDownload = async (e) => {
    e.preventDefault();

    if (!fileId || !passcode) {
      alert('Please enter the file ID and passcode.');
      return;
    }

    try {
      // Call your api helper
      const response = await downloadFile(fileId, passcode);

      // Get blob from response
      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');

      // Extract file name
      let fileName = 'downloaded_file';
      if (contentDisposition && contentDisposition.includes('filename=')) {
        fileName = contentDisposition.split('filename=')[1].replace(/"/g, '');
      }

      // Create a download link
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert('Download error');
    }
  };

  return (
    <div className="main-container">
      <form className="input-container" onSubmit={handleDownload}>
        <div>
          <label>File ID:</label>
          <input
            type="text"
            value={fileId}
            onChange={(e) => setFileId(e.target.value)}
            placeholder="Paste file ID from generated link"
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

        <button type="submit">Download File</button>
      </form>
    </div>
  );
};
