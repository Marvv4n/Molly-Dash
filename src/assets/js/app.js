
// Theme Handling
document.addEventListener('DOMContentLoaded', function() {
    // Theme switcher
    const lightDarkButton = document.getElementById('light-dark-mode');
    if (lightDarkButton) {
        lightDarkButton.addEventListener('click', function() {
            document.documentElement.setAttribute('data-bs-theme', 
                document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'
            );
            localStorage.setItem('theme', document.documentElement.getAttribute('data-bs-theme'));
        });
    }

    // Set theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);

    // Initialize Bootstrap components
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});

// Avatar Upload Handling - Make functions globally available
window.openAvatarUpload = function() {
    const modal = new bootstrap.Modal(document.getElementById('avatarUploadModal'));
    modal.show();
};

window.closeAvatarUpload = function() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('avatarUploadModal'));
    if (modal) {
        modal.hide();
    }
};

window.handleAvatarUpload = async function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('avatarFile');
    const file = fileInput.files[0];
    
    if (!file) return;

    try {
        // Create preview
        const reader = new FileReader();
        reader.onloadend = function() {
            // Update all avatar images in the UI
            const avatarImages = document.querySelectorAll('.user-avatar-image');
            avatarImages.forEach(img => {
                img.src = reader.result;
            });
            
            // Store in localStorage
            localStorage.setItem('userAvatar', reader.result);
            
            // Close modal
            window.closeAvatarUpload();
        };
        reader.readAsDataURL(file);
    } catch (error) {
        console.error('Error uploading avatar:', error);
    }
};

// Load saved avatar on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        const avatarImages = document.querySelectorAll('.user-avatar-image');
        avatarImages.forEach(img => {
            img.src = savedAvatar;
        });
    }
});
