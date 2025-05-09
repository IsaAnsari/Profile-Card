// DOM Elements
const likeData = document.querySelector('.analytics .data:first-child');
const likeNumber = document.querySelector('.analytics .data:first-child .number');
const shareData = document.querySelector('.analytics .data:last-child');
const shareNumber = document.querySelector('.analytics .data:last-child .number');

// Like Button
let likeCounter = parseInt(localStorage.getItem('likeCounter')) || 0;
likeNumber.textContent = likeCounter;

likeData.addEventListener('click', () => {
    likeCounter++;
    likeNumber.textContent = likeCounter;
    localStorage.setItem('likeCounter', likeCounter);
    
    const heartIcon = likeData.querySelector('i');
    heartIcon.classList.toggle('bx-heart');
    heartIcon.classList.toggle('bxs-heart');
});

// Share Button (Fixed)
let shareCounter = parseInt(localStorage.getItem('shareCounter')) || 0;
shareNumber.textContent = shareCounter;

shareData.addEventListener('click', () => {
    shareCounter++;
    shareNumber.textContent = shareCounter;
    localStorage.setItem('shareCounter', shareCounter);
    
    // Share Functionality
    const shareUrl = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'My Profile',
            text: 'Check this out!',
            url: shareUrl
        }).catch(err => console.log('Share cancelled'));
    } else {
        navigator.clipboard.writeText(shareUrl)
            .then(() => alert('Link copied to clipboard!'));
    }
});

// Message Button
document.querySelector('.buttons .button:last-child').addEventListener('click', (e) => {
    e.preventDefault();
    window.open('https://www.messenger.com/', '_blank');
});
