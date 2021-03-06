import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/main.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProvider } from './context/ProductProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

ReactDOM.render(
 
  <React.StrictMode>
    <ProductProvider>
      <Router>
        <App />
      </Router>
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

