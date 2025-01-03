
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
});

// Avatar Upload Handling
function openAvatarUpload() {
    const modal = new bootstrap.Modal(document.getElementById('avatarUploadModal'));
    modal.show();
}

function closeAvatarUpload() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('avatarUploadModal'));
    if (modal) {
        modal.hide();
    }
}

async function handleAvatarUpload(event) {
    event.preventDefault();
    const fileInput = document.getElementById('avatarFile');
    const file = fileInput.files[0];
    
    if (!file) return;

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
    };
    reader.readAsDataURL(file);

    closeAvatarUpload();
}

// Load saved avatar on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        const avatarImages = document.querySelectorAll('.user-avatar-image');
        avatarImages.forEach(img => {
            img.src = savedAvatar;
        });
    }

    // Initialize Bootstrap components
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});
