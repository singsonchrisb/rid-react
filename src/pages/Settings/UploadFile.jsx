import { Button } from '@mui/material';

const UploadFile = ({ onChange, accept, children }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onChange(file);
  };

  return (
    <label>
      <input
        type="file"
        style={{ display: 'none' }}
        accept={accept}
        onChange={handleFileChange}
      />
      {children}
    </label>
  );
};

export { UploadFile };
