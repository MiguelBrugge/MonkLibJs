import { Notification } from "./notification.js";

document.addEventListener('DOMContentLoaded', () => {
    const checkElementExists = setInterval(() => {
        const notiButton = document.getElementById('notification-button');
        if (notiButton) {
            clearInterval(checkElementExists);
            notiButton.addEventListener('click', () => {
                const types = ['Error', 'Warning', 'Info', 'Success'];
                const randomType = types[Math.floor(Math.random() * types.length)];
                const noti = new Notification('Hello there!', true, randomType);
            });
        }
    }, 100);
});