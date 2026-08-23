//notifications
function showNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notification-container');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="close-btn" onclick="this.parentElement.remove()">×</button>
    `;

    // Add animation for smooth appearance
    notification.style.animation = 'fadeIn 0.5s ease-in-out';

    container.appendChild(notification);

    //remove notifier after the specified duration
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-in-out';
        setTimeout(() => notification.remove(), 500);
    }, duration);
}

const style = document.createElement('style');
style.innerHTML = `
    .notification {
        background-color: #333;
        color: white;
        padding: 10px;
        border-radius: 5px;
        margin: 10px;
        position: relative;
        max-width: 300px;
        box-sizing: border-box;
    }
    .notification.info {
        background-color: #4CAF50; /* Green */
    }
    .notification.error {
        background-color: #f44336; /* Red */
    }
    .notification.success {
        background-color: #2196F3; /* Blue */
    }
    .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 10px;
    }
    @keyframes fadeIn {
        0% {
            opacity: 0;
            transform: translateY(-20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);