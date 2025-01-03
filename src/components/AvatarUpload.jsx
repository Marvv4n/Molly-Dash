
import React, { useState } from 'react';

export default function AvatarUpload() {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    // Handle the upload logic here
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
    }
  };

  return (
    <div className="modal fade" id="avatarUploadModal" tabIndex="-1" aria-labelledby="avatarUploadModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title" id="avatarUploadModalLabel">Upload Avatar</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body text-center">
            <div className="avatar-preview mb-3">
              <div className="avatar-circle">
                {preview ? (
                  <img src={preview} alt="Preview" className="preview-image" />
                ) : (
                  <div className="upload-placeholder">
                    <i className="bx bx-image-add"></i>
                  </div>
                )}
              </div>
            </div>
            <input 
              type="file" 
              className="form-control" 
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="avatarInput"
            />
            <label htmlFor="avatarInput" className="btn btn-outline-primary mb-3">
              Choose Image
            </label>
          </div>
          <div className="modal-footer border-top-0">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleUpload} disabled={!selectedFile}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
