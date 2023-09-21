import React,{useRef,useEffect, useContext} from "react"
import {Container,Row,Button} from 'reactstrap'
import {NavLink,Link,Navigate,useNavigate} from 'react-router-dom'
import logo from "../../assets/images/logo.png"
import "./header.css"

import { AuthContext } from "../../context/AuthContext.js"


const nav_links = [
    {
        path:'/home',
        display:'Home'
    },
    {
        path:'/about',
        display:'About'
    },
    {
        path: '/stocks',
        display: 'Stocks'
    }
]

const Header =()=>{

    const headerRef = useRef(null);
    const {user, dispatch} = useContext(AuthContext);

    const navigate =useNavigate();
    const logout = () =>{
        dispatch({type: 'LOGOUT'});
        Navigate('/');
    };


    const stickyHeaderFunc =()=>{
        window.addEventListener("scroll",()=>{
            if(document.body.scrollTop>80 || document.documentElement.scrollTop>80){
                headerRef.current.classList.add('sticky__header')
            }
            else{
                headerRef.current.classList.remove('sticky__header')
            }
        })
    }
 

    useEffect(()=>{
        
        stickyHeaderFunc()
        return window.removeEventListener('scroll',stickyHeaderFunc)

    });

    const checkLogin =(item)=>{  
        if(item.path=='/stocks'){
           if(!user){
            navigate('/signin');
           }
            
        }
    }
    
    return <div>
        <header className="header" ref={headerRef}>
            <Container>
                <Row className="headerRow">
                    <div className="nav_wrapper divContainer d-flex align-items-center justify-content-between" >
                        {/*logo start*/}
                        <div className="logo">
                            <img src={logo} alt=""/>
                        </div>
                        {/*==menu start==*/}
                        <div className="navigation">
                            <ul className="menu d-flex align-items-center gap-5">
                                {
                                    nav_links.map((item,index)=>(
                                        <li className="nav_item" key={index} onClick ={()=>checkLogin(item)} >      
                                           <NavLink to={item.path} className={navClass=> navClass.isActive ? "active_link" : ""}>{item.display}</NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                            {/* ==menu end== */ }
                        </div>
                        <div className="nav_right d-flex align-items-center gap-4 loginButtons">
                                <div className="nav_btns d-flex align-items-center gap-4">

                                    {
                                        user?(
                                        <>
                                        <h5 className="mb-0">{user.username}</h5>
                                        <Button className="btn btn-dark" onClick ={logout}>
                                            Logout
                                        </Button>
                                     </>):(<>
                
                                    <Button className="btn secondary__btn">
                                        <Link to='/signin'>Signin</Link>
                                    </Button>
                                    <Button className="btn primary__btn button">
                                        <Link to='/signup'>Singnup</Link>
                                    </Button>
                                    </>
                                    )}
                                    </div>
                                  <span className="mobile_menu">
                                    <i class='ri-menu-line'></i>
                                  </span>
                        
                    </div>
                    </div>
                </Row>
            </Container>
        </header>
    </div>;
};

export default Header;