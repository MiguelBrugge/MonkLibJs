export class Notification{
    notificationDiv;
    titleP;
    autoRemove = true;

    constructor(text, autoRemove, type) {
        this.autoRemove = autoRemove;
        const notiContainer = document.getElementById('notification-container');
        const notificationDiv = document.createElement('div');
        notificationDiv.className = 'notification';
    
        const bellSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        bellSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        bellSvg.setAttribute('width', '22');
        bellSvg.setAttribute('height', '22');
        bellSvg.setAttribute('fill', 'currentColor');
        bellSvg.setAttribute('class', 'bi bi-bell-fill');
        bellSvg.setAttribute('viewBox', '0 0 16 16');
    
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z');
    
        bellSvg.appendChild(path);
        notificationDiv.appendChild(bellSvg);
    
        const contentDiv = document.createElement('div');
        const titleP = document.createElement('p');
        titleP.className = 'title';
        titleP.textContent = 'Title';
        this.titleP = titleP;
    
        const textP = document.createElement('p');
        textP.className = 'text';
        textP.textContent = text;
    
        contentDiv.appendChild(titleP);
        contentDiv.appendChild(textP);
        notificationDiv.appendChild(contentDiv);
    
        notificationDiv.addEventListener('click', () => {
            this.remove();
        });
    
        this.notificationDiv = notificationDiv;
        notiContainer.appendChild(notificationDiv);
        setTimeout(() => {
            notificationDiv.classList.add('active');
        }, 10);
    
        if (!autoRemove) return;
        setTimeout(() => {
            this.remove();
        }, 5000);
        this.setType(type);
    }

    remove(){
        this.notificationDiv.classList.remove('active');
        setTimeout(() => {
            this.notificationDiv.remove();
        }, 1000);
    }

    setType(type){
        this.titleP.innerHTML = type + '!';
        switch(type){
            case 'Info': this.notificationDiv.classList.add('border-info');
            break;
            case 'Error': this.notificationDiv.classList.add('border-error');
            break;
            case 'Warning': this.notificationDiv.classList.add('border-warning');
            break;
            case 'Success': this.notificationDiv.classList.add('border-success');
            break;
        }
    }
}