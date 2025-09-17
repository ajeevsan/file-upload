export const uploadFile = async (file, passcode) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('passcode', passcode);

  const response = await fetch('http://localhost:4000/api/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Upload failed');
  return await response.json();
};

export const downloadFile = async (id, passcode) => {
  const response = await fetch(`http://localhost:4000/api/download/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ passcode }),
  });
  if (!response.ok) throw new Error('Download failed');
  return response;
};
