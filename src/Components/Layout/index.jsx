import React, {useState} from 'react';
import './style.scss';
import {useDispatch} from "react-redux";
import {signOut} from "../../Redux/Actions";
import {NavLink} from "react-router-dom";
import DarkModeToggle from "../Theme/ThemeToggle";

const Layout = (props) => {

    const [navValue, setNavValue] = useState(true);
    const dispatch = useDispatch();
    const user = JSON.parse(window.localStorage.getItem("user"))
    return (
        <>
            <div className={`bodyClass ${navValue?'body-pd':''}`} id="body-pd">
                <header className={`header ${navValue?'body-pd':''}`} id="header">
                    <div className="header__toggle" onClick={()=> {
                        setNavValue(!navValue)
                    }}>
                        <i className={`bx bx-menu ${navValue?'bx-x':''}`} id="header-toggle"/>
                    </div>
                    <div className="d-flex align-items-center">
                        {/*<div className="header__img">*/}
                        {/*    <img src="assets/img/perfil.jpg" alt=""/>*/}
                        {/*</div>*/}

                        <p>Hi, <b>{user.firstName}</b></p>&nbsp;
                        <DarkModeToggle />
                    </div>
                </header>

                <div className=
                         {`l-navbar ${navValue?'show':''}`} id="nav-bar">
                    <nav className="nav">
                        <div>
                            <a href="/home" className="nav__logo">
                                <i className='bx bx-layer nav__logo-icon'/>
                                <span className="nav__logo-name">We Showed Up</span>
                            </a>

                            <div className="nav__list">

                                <NavLink to="/dashboard" className="nav__link">
                                    <i className='bx bx-grid-alt nav__icon'/>
                                    <span className="nav__name">Dashboard</span>
                                </NavLink>

                                <NavLink to="/product" className="nav__link">
                                    <i className='bx bx-grid-alt nav__icon'/>
                                    <span className="nav__name">Product</span>
                                </NavLink>

                                <NavLink to='/team' className="nav__link">
                                    <i className='bx bx-user nav__icon'/>
                                    <span className="nav__name">Team</span>
                                </NavLink>

                                <NavLink to="/contacts" className="nav__link">
                                    <i className='bx bx-message-square-detail nav__icon'/>
                                    <span className="nav__name">Contacts Query</span>
                                </NavLink>

                                <NavLink to="/products" className="nav__link">
                                    <i className='bx bx-message-square-detail nav__icon'/>
                                    <span className="nav__name">Careers Query</span>
                                </NavLink>
                            </div>
                        </div>

                        <a href="#" className="nav__link"  onClick={()=>{
                            dispatch(signOut())
                        }}>
                            <i className='bx bx-log-out nav__icon'/>
                            <span className="nav__name">Log Out</span>
                        </a>

                    </nav>
                </div>
                <div className={"pt-3 pb-2"} id="transition-wrapper">
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default Layout;
