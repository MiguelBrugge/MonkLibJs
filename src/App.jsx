import { useState, useEffect, useRef } from 'react'
import './App.css';
import 'tailwindcss/tailwind.css';
import Scrollspy from 'react-scrollspy';
import { CustomButton } from './components/CustomButton';
import { SpyButton } from './components/SpyButton';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faNewspaper,
  faBookOpen,
  faBell,
  faCopy,
  faMessage,
  faSquareCaretDown,
} from '@fortawesome/free-solid-svg-icons'


function App() {

  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Select a car');

  useEffect(() => {
    setIsOpen(false);
    toggle(dropdownRef.current)
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  function toggle(dropdown) {
    dropdown.classList.toggle('active');

    const itemContainer = dropdown.querySelector('.item-container');
    if (dropdown.classList.contains('active')) {
      itemContainer.style.height = itemContainer.scrollHeight + 'px';
    } else {
      itemContainer.style.height = 0;
    }
  }

  function handleDropdownToggle() {
    toggle(dropdownRef.current)
    setIsOpen(!isOpen);
  }

  function handleItemClick(item) {
    setSelectedItem(item);
    setIsOpen(false);
    toggle(dropdownRef.current)
  }

  function copy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  const gs = `*:focus {
  outline: none;
}

body {
  font-family: sans-serif;
}

/* Button click */
button{
    scale: 1;
}

button:active{
    scale: 0.93;
}

/* Button hover brightness */
button{
    transition: filter 0.1s ease-in-out;
    filter: brightness(1);
}

button:hover{
    filter: brightness(1.2);
}`;

  const notiHTML = `<div id="notification-container">
</div>`;
  const notiCSS = `#notification-container{
    position: fixed;
    top: 0;
    right: 0;
    padding: 5px;
    width: 22%;
    min-width: 200px;
}

.notification{
    display: flex;
    gap: 15px;
    align-items: center;

    background-color: white;
    padding: 8px 25px;
    margin-bottom: 5px;
    border-radius: 50px;
    /* border: solid 3px; */
    position: relative;
    transform: translateX(120%);
    transition: transform 0.3s ease-in-out;
    color: gray;
}

.notification .title{
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0;
}

.notification .text{
    margin: 0;
}

.notification.active{
    transform: translateX(0%);
}

.notification::after{
    /* Close Icon */
    content: '\ 00d7';
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 25px;
}

.notification:hover{
    filter: brightness(0.95);
    cursor: pointer;
}

.notification.border-info{
    border-color: gray;
}
.notification.border-error{
    border-color: red;
}
.notification.border-warning{
    border-color: orange;
}
.notification.border-success{
    border-color: rgb(37, 202, 128);
}
.notification.border-success svg, .notification.border-success .title{
    color: rgb(37, 202, 128);
}   

.notification.border-info svg, .notification.border-info .title {
    color: gray;
}

.notification.border-error svg, .notification.border-error .title {
    color: red;
}

.notification.border-warning svg, .notification.border-warning .title {
    color: orange;
}
`;
  const notiJS = `export class Notification{
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
}`;
  const notiJSModule = `import { Notification } from "./notification.js";

const notiButton = document.getElementById('notification-button');
notiButton.addEventListener('click', () => {
    const noti = new Notification('Hello there!', true, 'Error');
})`;

  const tooltipHTML = `<p data-toolTip="Hello there!">Hover over me</p>`;
  const tooltipCSS = `[data-toolTip]{
    position: relative;
}

[data-toolTip]::before, [data-toolTip]::after{
    transition: top 0.2s ease-out, opacity 0.1s ease-out;
    content: "";
    opacity: 0;
    position: absolute;
    left: 50%;
    width: min-content;
    top: 50%;
}

[data-toolTip]:hover::before, [data-toolTip]:hover::after{
    opacity: 1;
    transform: translate(-50%, 0);
}

[data-toolTip]:hover::before {
    content: attr(data-toolTip);
    padding: 5px;
    width: max-content;
    background-color: rgb(79, 100, 130);
    color: white;
    border-radius: 5px;
    top: -40px;

}

[data-toolTip]:hover::after {
    content: "";
    border-width: 10px;
    border-style: solid;
    border-color: rgb(79, 100, 130) transparent transparent transparent;
    rotate: 180;
    top: -15px;
}`;

  const dropdownHTML = `<div class="dropdown">
  <button>
      <span>Select a Car</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
      </svg>
  </button>
  <div class="item-container" style="height: 0px;">
      <li>Volvo</li>
      <li>Saab</li>
      <li>Mercedes</li>
      <li>Audi</li>
  </div>
</div> `;
  const dropdownCSS = `.dropdown{
  border: solid 1px gray;
  width: fit-content;
  min-width: 100px;
}
.dropdown button{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
}

.dropdown button svg{
  transition: rotate 0.1s ease-in-out;
  rotate: 0deg;
}

.dropdown.active svg{
  rotate: 180deg;
}

.dropdown .item-container {
  overflow: hidden;
  transition: height 0.5s ease-in-out;
}

.dropdown.active .item-container {
  height: auto;
}

.dropdown li{
  background-color: white;
  list-style-type: none;
  border-top: solid 1px gray;
  padding-block: 5px;
  padding-inline: 5px;
  cursor: pointer;
}

.dropdown li:hover{
  filter: brightness(0.95);
}`;
  const dropdownJS = `const dropdowns = document.getElementsByClassName('dropdown');
for (let dropdown of dropdowns) {
  const button = dropdown.querySelector('button');
  const itemLi = dropdown.querySelectorAll('.item-container li');

  button.addEventListener('click', () => {
    toggle(dropdown);
  });

  for (let li of itemLi) {
    li.addEventListener('click', event => {
      event.stopPropagation();
      toggle(dropdown);
      button.querySelector('span').innerHTML = li.innerHTML
    });
  }
}

function toggle(dropdown) {
  dropdown.classList.toggle('active');

  const itemContainer = dropdown.querySelector('.item-container');
  if (dropdown.classList.contains('active')) {
    itemContainer.style.height = itemContainer.scrollHeight + 'px';
  } else {
    itemContainer.style.height = 0;
  }
}
`;

  return (
    <>
      <div className="px-48 flex">
        <div className='w-4/5 flex flex-col pe-28 gap-5 relative'>
          {/* Introduction */}
          <section id="section-1">
            <br /><br />
            <h1 className="text-4xl text-black font-bold">Introduction to MonkLibJs</h1>
            <p className='text-black mt-5'>Welcome to MonkLibJs, your go-to resource for JavaScript, CSS, and HTML components. Whether you're a seasoned developer or just starting out, our collection of ready-to-use components will help you enhance your web projects effortlessly.</p>
            <p className='text-black mt-2'>With MonkLibJs, you can streamline your development process and bring your ideas to life without breaking a sweat. Explore our library of versatile components and take your web design to the next level. Let's code with ease, together.</p>
          </section>
          {/* Getting Started */}
          <section id="section-2">
            <br /><br />
            <h1 className="text-4xl text-black font-bold">Getting Started</h1>
            <p className='text-black mt-5'>The provided CSS code snippet enhances the user experience by adding subtle yet effective styling to web development components.</p>
            <p className='text-black mt-2'>This CSS code snippet contributes to a polished and user-friendly web development experience, improving both aesthetics and usability.</p>
            <p className='text-black mt-2 font-bold'>styles.css: <button onClick={() => { copy(gs) }} className='hover:brightness-150'><FontAwesomeIcon icon={faCopy} /></button></p>
            <SyntaxHighlighter language="css" style={dark} className="highlighter">
              {gs}
            </SyntaxHighlighter>
          </section>
          {/* Notifications */}
          <section id="section-3">
            <br /><br />
            <h1 className="text-4xl text-black font-bold">Notifications</h1>
            <p className='text-black mt-5'>The provided code introduces a notification component that can be utilized in web development. By importing the Notification class from a separate JavaScript file, developers can easily create and display notifications on their web pages.</p>
            <CustomButton id="notification-button" className="" text="Click for a notification"></CustomButton>
            <p className='text-black mt-2'>The notiButton variable represents a button element on the page that triggers the creation of a new notification when clicked. In this example, the notification has a text of "Hello there!", a close button enabled (true), and a type of "Error".</p>
            <p className='text-black mt-2 font-bold'>index.html: <button onClick={() => { copy(notiHTML) }} className='hover:brightness-150'><FontAwesomeIcon icon={faCopy} /></button></p>
            <SyntaxHighlighter language="html" style={dark} className="highlighter">
              {notiHTML}
            </SyntaxHighlighter>
            <p className='text-black mt-2 font-bold'>styles.css: <button onClick={() => { copy(notiCSS) }} className='hover:brightness-150'><FontAwesomeIcon icon={faCopy} /></button></p>
            <SyntaxHighlighter language="css" style={dark} className="highlighter">
              {notiCSS}
            </SyntaxHighlighter>
            <p className='text-black mt-2 font-bold'>notification.js: <button onClick={() => { copy(notiJS) }} className='hover:brightness-150'><FontAwesomeIcon icon={faCopy} /></button></p>
            <SyntaxHighlighter language="javascript" style={dark} className="highlighter">
              {notiJS}
            </SyntaxHighlighter>
            <p className='text-black mt-2 font-bold'>main.js: <button onClick={() => { copy(notiJSModule) }} className='hover:brightness-150'><FontAwesomeIcon icon={faCopy} /></button></p>
            <SyntaxHighlighter language="javascript" style={dark} className="highlighter">
              {notiJSModule}
            </SyntaxHighlighter>
          </section>
          {/* Tooltip */}
          <section id="section-4">
            <br /><br />
            <h1 className="text-4xl text-black font-bold">Tooltip</h1>
            <p className='text-black mt-5'>By incorporating tooltips, developers can offer users contextual hints or explanations about specific components or features.
            <span className='text-black font-bold mt-5 inline' data-tooltip="Hello there!"> Hover over me</span>              
            </p>
            <p className='text-black mt-2 font-bold'>index.html: <button onClick={() => { copy(tooltipHTML) }} className='hover:brightness-150'><FontAwesomeIcon icon={faCopy} /></button></p>
            <SyntaxHighlighter language="html" style={dark} className="highlighter">
              {tooltipHTML}
            </SyntaxHighlighter>
            <p className='text-black mt-2 font-bold'>styles.css: <button onClick={() => { copy(tooltipCSS) }} className='hover:brightness-150'><FontAwesomeIcon icon={faCopy} /></button></p>
            <SyntaxHighlighter language="css" style={dark} className="highlighter">
              {tooltipCSS}
            </SyntaxHighlighter>
          </section>
          {/* Dropdown */}
          <section id="section-5">
            <br /><br />
            <h1 className="text-4xl text-black font-bold">Dropdown</h1>
            <p className='text-black mt-5'>This custom dropdown allows for greater customization, enabling developers to style it to match the design and branding of their website or application.</p>
            <div className="dropdown" ref={dropdownRef}>
              <button onClick={handleDropdownToggle}>
                <span>{selectedItem}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className={`bi bi-caret-down-fill ${isOpen ? 'open' : ''}`} viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>
              <div className={`item-container ${isOpen ? 'active' : ''}`}>
                <li onClick={() => handleItemClick('Volvo')}>Volvo</li>
                <li onClick={() => handleItemClick('Saab')}>Saab</li>
                <li onClick={() => handleItemClick('Mercedes')}>Mercedes</li>
                <li onClick={() => handleItemClick('Audi')}>Audi</li>
                <li onClick={() => handleItemClick('BMW')}>BMW</li>
                <li onClick={() => handleItemClick('Toyota')}>Toyota</li>
              </div>
            </div>
            <p className='text-black mt-2 font-bold'>index.html: <button onClick={() => { copy(dropdownHTML) }} className='hover:brightness-150'><FontAwesomeIcon icon={faCopy} /></button></p>
            <SyntaxHighlighter language="html" style={dark} className="highlighter">
              {dropdownHTML}
            </SyntaxHighlighter>
            <p className='text-black mt-2 font-bold'>styles.css: <button onClick={() => { copy(dropdownCSS) }} className='hover:brightness-150'><FontAwesomeIcon icon={faCopy} /></button></p>
            <SyntaxHighlighter language="css" style={dark} className="highlighter">
              {dropdownCSS}
            </SyntaxHighlighter>
            <p className='text-black mt-2 font-bold'>dropdown.js: <button onClick={() => { copy(dropdownJS) }} className='hover:brightness-150'><FontAwesomeIcon icon={faCopy} /></button></p>
            <SyntaxHighlighter language="javascript" style={dark} className="highlighter">
              {dropdownJS}
            </SyntaxHighlighter>
          </section>
        </div>
        {/* Navigation */}
        <div className="flex gap-5 flex-col align-middle ml-auto w-1/5 fixed right-48">
          <br />
          <Scrollspy className='flex flex-col gap-5' items={['section-1', 'section-2', 'section-3', 'section-4', 'section-5']} currentClassName="text-white shadow-none bg-black-active">
            <SpyButton href="#section-1" text="Introduction" icon={faNewspaper} />
            <SpyButton href="#section-2" text="Getting Started" icon={faBookOpen} />
            <SpyButton href="#section-3" text="Notifications" icon={faBell} />
            <SpyButton href="#section-4" text="Tooltip" icon={faMessage} />
            <SpyButton href="#section-5" text="Dropdown" icon={faSquareCaretDown} />
          </Scrollspy>
        </div>
      </div>
    </>
  )
}

export default App
