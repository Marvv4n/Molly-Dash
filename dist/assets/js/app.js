function openAvatarUpload(){const t=new bootstrap.Modal(document.getElementById("avatarUploadModal"));t.show()}function closeAvatarUpload(){const t=bootstrap.Modal.getInstance(document.getElementById("avatarUploadModal"));t&&t.hide()}async function handleAvatarUpload(t){t.preventDefault();t=document.getElementById("avatarFile").files[0];if(t){const e=new FileReader;e.onloadend=function(){const t=document.querySelectorAll(".user-avatar-image");t.forEach(t=>{t.src=e.result}),localStorage.setItem("userAvatar",e.result)},e.readAsDataURL(t),closeAvatarUpload()}}document.addEventListener("DOMContentLoaded",function(){const t=document.getElementById("light-dark-mode");t&&t.addEventListener("click",function(){document.documentElement.setAttribute("data-bs-theme","dark"===document.documentElement.getAttribute("data-bs-theme")?"light":"dark"),localStorage.setItem("theme",document.documentElement.getAttribute("data-bs-theme"))});var e=localStorage.getItem("theme")||"light";document.documentElement.setAttribute("data-bs-theme",e)}),document.addEventListener("DOMContentLoaded",function(){const e=localStorage.getItem("userAvatar");if(e){const t=document.querySelectorAll(".user-avatar-image");t.forEach(t=>{t.src=e})}[...document.querySelectorAll('[data-bs-toggle="popover"]')].map(t=>new bootstrap.Popover(t)),[...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map(t=>new bootstrap.Tooltip(t))});