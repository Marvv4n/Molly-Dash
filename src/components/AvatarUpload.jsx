
const AvatarUpload = () => {
    return (
        <div className="modal fade" id="avatarUploadModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Upload Profile Picture</h5>
                        <button type="button" className="btn-close" onClick={() => closeAvatarUpload()}></button>
                    </div>
                    <div className="modal-body text-center">
                        <div className="upload-preview mb-3">
                            <img id="avatarPreview" src="assets/images/users/avatar-1.jpg" 
                                 className="rounded-circle user-avatar-image" 
                                 style={{width: '100px', height: '100px', objectFit: 'cover'}} />
                        </div>
                        <form onSubmit={handleAvatarUpload}>
                            <div className="mb-3">
                                <input type="file" className="form-control" 
                                       id="avatarFile" accept="image/*" required 
                                       onChange={(e) => {
                                           const file = e.target.files[0];
                                           if (file) {
                                               const reader = new FileReader();
                                               reader.onloadend = () => {
                                                   document.getElementById('avatarPreview').src = reader.result;
                                               };
                                               reader.readAsDataURL(file);
                                           }
                                       }} />
                            </div>
                            <div className="text-end">
                                <button type="button" className="btn btn-secondary me-2" onClick={() => closeAvatarUpload()}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarUpload;
