
import React, { useState } from 'react';

const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await fetch('/upload-avatar', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update user avatar in the UI
        const avatarImg = document.querySelector('.user-avatar');
        if (avatarImg) {
          avatarImg.src = data.avatarUrl;
        }
        // Close modal
        const modal = document.getElementById('avatarUploadModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="modal fade" id="avatarUploadModal" tabIndex="-1" aria-labelledby="avatarUploadModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="avatarUploadModalLabel">Upload Avatar</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-3">
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="rounded-circle avatar-xl"
                  style={{ width: '110px', height: '110px', objectFit: 'cover' }}
                />
              )}
            </div>
            <input 
              type="file" 
              className="form-control" 
              accept="image/*"
              onChange={handleFileSelect}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
