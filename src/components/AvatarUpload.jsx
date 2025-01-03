
import React, { useState, useCallback } from 'react';

const AvatarUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const response = await fetch('http://0.0.0.0:3000/upload-avatar', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      if (data.success) {
        document.querySelectorAll('.user-avatar').forEach(img => {
          img.src = data.avatarUrl;
        });
        localStorage.setItem('userAvatar', data.avatarUrl);
        
        const modal = document.getElementById('avatarUploadModal');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        if (modalInstance) modalInstance.hide();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  return (
    <div className="modal fade" id="avatarUploadModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Upload Avatar</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <div className="text-center mb-3">
              {previewUrl && (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="rounded-circle"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
              )}
            </div>
            <input 
              type="file" 
              className="form-control" 
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
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
