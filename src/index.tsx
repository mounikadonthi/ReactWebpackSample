import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";


const result = <div>
    <Router>
        <App />
    </Router>
</div>

ReactDOM.render(result, document.getElementById('root'));

