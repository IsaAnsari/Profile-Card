// DOM Elements
const likeData = document.querySelector('.analytics .data:first-child');
const likeNumber = document.querySelector('.analytics .data:first-child .number');
const heartIcon = likeData.querySelector('i');
const messageBtn = document.querySelector('.buttons .button:last-child');
const shareBtn = document.querySelector('.analytics .data:last-child');



// LIKE BUTTON - Updated with double-click protection
let isLiked = localStorage.getItem('heartLiked') === 'true';
let likeCounter = parseInt(localStorage.getItem('likeCounter')) || 0;
likeNumber.textContent = likeCounter;

// Set initial heart state
if (isLiked) {
    heartIcon.classList.replace('bx-heart', 'bxs-heart');
}

likeData.addEventListener('click', () => {
    if (!isLiked) {
        // Only increase counter if NOT already liked
        likeCounter++;
        likeNumber.textContent = likeCounter;
        localStorage.setItem('likeCounter', likeCounter);
    }

    // Toggle like state
    isLiked = !isLiked;
    heartIcon.classList.toggle('bx-heart');
    heartIcon.classList.toggle('bxs-heart');
    localStorage.setItem('heartLiked', isLiked);

    // Click animation
    likeData.style.transform = 'scale(1.2)';
    setTimeout(() => {
        likeData.style.transform = 'scale(1)';
    }, 200);
});

// Message Button with Confirmation
messageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Open Messenger to send a message?')) {
        window.open('https://www.messenger.com/', '_blank');
    }
});

// Enhanced Share Button
shareBtn.addEventListener('click', async () => {
    try {
        if (navigator.share) {
            await navigator.share({
                title: 'Check out this profile!',
                text: 'Amazing designer and developer profile',
                url: window.location.href
            });
        } else {
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    } catch (err) {
        console.error('Sharing failed:', err);
        prompt('Copy this link:', window.location.href);
    }
});

// Dynamic Styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .bxs-heart {
            color: red !important;
            animation: pulse 0.5s;
        }
        .analytics .data {
            cursor: pointer;
            transition: all 0.3s;
            user-select: none;
        }
        .analytics .data:hover {
            transform: translateY(-2px);
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
    </style>
`);