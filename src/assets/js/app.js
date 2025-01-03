
/// Avatar Upload Modal
function openAvatarUpload() {
    const modal = document.getElementById('avatarUploadModal');
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('show');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
    }
}

function closeAvatarUpload() {
    const modal = document.getElementById('avatarUploadModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
    }
}

async function handleAvatarUpload(event) {
    event.preventDefault();
    const fileInput = document.getElementById('avatarFile');
    const file = fileInput.files[0];
    
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
        const response = await fetch('/api/upload-avatar', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            const data = await response.json();
            const userAvatar = document.querySelector('.user-profile-image');
            if (userAvatar && data.avatarUrl) {
                userAvatar.src = data.avatarUrl;
            }
            closeAvatarUpload();
        }
    } catch (error) {
        console.error('Error uploading avatar:', error);
    }
}

// Components
class Components {
    initBootstrapComponents() {
        // Bootstrap component initialization code...
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

        const offcanvasElementList = document.querySelectorAll('.offcanvas')
        const offcanvasList = [...offcanvasElementList].map(offcanvasEl => new bootstrap.Offcanvas(offcanvasEl))

        var toastPlacement = document.getElementById("toastPlacement");
        if (toastPlacement) {
            document.getElementById("selectToastPlacement").addEventListener("change", function () {
                if (!toastPlacement.dataset.originalClass) {
                    toastPlacement.dataset.originalClass = toastPlacement.className;
                }
                toastPlacement.className = toastPlacement.dataset.originalClass + " " + this.value;
            });
        }

        var toastElList = [].slice.call(document.querySelectorAll('.toast'))
        var toastList = toastElList.map(function (toastEl) {
            return new bootstrap.Toast(toastEl)
        })

        const alertTrigger = document.getElementById('liveAlertBtn')
        if (alertTrigger) {
            alertTrigger.addEventListener('click', () => {
                alert('Nice, you triggered this alert message!', 'success')
            })
        }
    }

    init() {
        this.initBootstrapComponents();
    }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new Components().init();
});
