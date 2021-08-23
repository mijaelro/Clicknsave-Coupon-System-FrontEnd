import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Components/LayoutArea/Layout/Layout';
import reportWebVitals from './reportWebVitals';
import "./assets/css/nucleo-icons.css";
import "./assets/scss/blk-design-system-react.scss?v=1.2.0";
import "./assets/demo/demo.css";
import './index.css';




ReactDOM.render(
    <React.Fragment>
        <Layout/>
    </React.Fragment>,
document.getElementById('root')
);

reportWebVitals();
