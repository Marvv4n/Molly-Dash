
<div className="modal fade" id="avatarUploadModal" tabIndex="-1" aria-labelledby="avatarUploadModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="avatarUploadModalLabel">Upload Avatar</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <input 
          type="file" 
          className="form-control" 
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary" onClick={handleUpload}>Upload</button>
      </div>
    </div>
  </div>
</div>
