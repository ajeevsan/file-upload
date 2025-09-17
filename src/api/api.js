export const uploadFile = async (file, passcode) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('passcode', passcode);

  const response = await fetch('http://localhost:4000/api/upload', {
    method: 'POST',
    body: formData,
    // Don't set Content-Type header - let the browser set it with boundary
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(errorData.error || 'Upload failed');
  }
  
  return await response.json();
};

export const downloadFile = async (id, passcode) => {
  const response = await fetch(`http://localhost:4000/api/download/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passcode }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Download failed' }));
    throw new Error(errorData.error || 'Download failed');
  }
  
  return await response.json(); // This returns { downloadUrl, filename }
};
