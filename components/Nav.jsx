import React from "react"
import {Link, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Nav(props) {

    const [open, setOpen]=React.useState(false)
    const { pathname } = useLocation();

    function toggleOpen(){
        setOpen(prevOpen => !prevOpen)
    }

    function close(){
        setOpen(false)
    }
    return (
        <div className={pathname=="/"? "header-wrapper" : "" }>
            <header>
                <Link className="site-logo" to="/">{props.info.companyName}</Link>
                <nav>
                    <Link to="/">Home</Link >
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    {!props.user && <Link to="/login">Login</Link>}
                    {props.user && <Link to="/admin">Admin</Link>}
                    {props.user && <button onClick={props.handleLogout}>Logout</button>}
                </nav>

                {pathname.includes("/admin") && <div className="sub-nav"> 
                    <Link to="/admin">Admin Home</Link>
                    <Link to="/admin/videos">Videos</Link>
                    <Link to="/admin/lightboxes">Lightboxes</Link>
                    <Link to="/admin/cards">Cards</Link>
                
                </div>}



                <a className="hamburger-menu-btn " onClick={toggleOpen}>
                    <FontAwesomeIcon icon={faBars} />
                </a>
                {open && 
                        <div className="hamburger-links">
                            <Link to="/" onClick={close}>Home</Link >
                            <Link to="/about" onClick={close}>About</Link>
                            <Link to="/contact" onClick={close}>Contact</Link>
                            {!props.user && <Link to="/login" onClick={close}>Login</Link>}
                            {props.user && <Link to="/admin">Admin</Link>}
                            {pathname.includes("/admin") &&<div className="hamburger-links hamburger-sub-links">
                                <Link to="/admin/videos" onClick={close}>Videos</Link>
                                <Link to="/admin/lightboxes">Lightboxes</Link>
                                <Link to="/admin/cards" onClick={close}>Cards</Link>
                            </div>}
                            {props.user && <button onClick={props.handleLogout}>Logout</button>}
                        </div>
                    }
                    
            </header>
            
            
       </div>
    )
}