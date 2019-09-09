import * as React from 'react';
import { Link } from 'react-router-dom';
//import  icon from '/public/icons/blog-icon.png';

class Navbar extends React.Component {

    render() {
        return (
            <div className="custom-nav">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/AllContacts">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={{ pathname: '/ContactForm/0' }}>+ADD</Link>

                    </li>
                    <li className="nav-item">
                        <Link href="#" to="/" className="nav-link"><img src={"icon"} alt="icon" /></Link>
                    </li>
                </ul>
            </div>
        );
    }
}
export default Navbar;