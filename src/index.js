import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

//ReactDOM - provides connection between React and DOM
//DOM - Document Object Model, html document structure in js object 
const root = ReactDOM.createRoot(document.getElementById('root'));
// here's element with id 'root' created, react app is inserted into that element
root.render(
    <App />
);
// render - renders React elements/components in html(DOM)

//simple explanation - why React ?
//component and states are changes only what needs to be changed, thus website works fast
