import React, { useState, useEffect } from "react";
import LandingNavBar from './LandingPageNav'
import { useHistory } from 'react-router-dom';
import '../css/FeedPage.css'
import imgs from '../css/images/WhiteLogo.png'
import Modal from './Modal'
import axios from 'axios'

const Feed = () => {

}import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import "../css/LandingPage.css"
import axios from 'axios';
import imgs from '../css/images/logo1.png'
import thebox from '../css/images/image.png'
const LandingPage = () => {

    const [Form,setShowForm] = useState(false)
    const [signUpForm, setsignUpForm] = useState(false)
    const history = useHistory()

    
    const handleLogInClick = () =>  {
        console.log(Form)
        setShowForm(!Form)
    }
    const handleSignUpClick = () =>  {
        console.log(signUpForm)
        setsignUpForm(!signUpForm)
    }
    const handleLogin = async(e) => {
        e.preventDefault()
        let display_name = e.target.display_name.value
        let url=`http://localhost:3001/users/search/${display_name}`
        try{
        let res = await axios.get(url)
        let user=res.data.body.searchUser
            if(user.length){
                sessionStorage.setItem("currentUser",user[0].id)
                history.push(`/feed`)
            }else{
                alert("fail")
            }
        }catch(error){
            console.log(error);
        }
    }

    const  handleSignup = async(e) => {
        e.preventDefault()
        let first_name={firstname:e.target.firstname.value}
        let last_name={lastname:e.target.lastname.value}
        let display_name={username:e.target.username.value}
        let profile_pic={profile_pic:e.target.profile_pic.value}
        if(!profile_pic){
            profile_pic="https://img.favpng.com/6/14/19/computer-icons-user-profile-icon-design-png-favpng-vcvaCZNwnpxfkKNYzX3fYz7h2.jpg"
        }
        let newUser={first_name,last_name,display_name,profile_pic}
        try{
            let res = await axios.post(`http://localhost:3001/users/`,newUser)
            debugger
            sessionStorage.setItem("currentUser",res.data.body.newUser.id)
            history.push(`/feed`)
     }catch(error){
         console.log(error);
     }
    }

    const login = ()=>{
        return <div className="login-info">
            <form id="loginForm" onSubmit={handleLogin}>
                <input name="display_name" placeholder="username"></input>
                {/* <input name="password" type="password" placeholder="password"></input> */}
                <button type="submit">submit</button>
            </form>
        
        </div>
    }

    
    const signup = () => {
        return( 
            <div className="signup-info">
     <form id="signupForm" onSubmit={handleSignup}>
        <input name="firstname"placeholder="First Name"></input>
        <input name="lastname" placeholder="Last Name"></input>
        <input name="username" placeholder="Username"></input>
        <input name="profile_pic" placeholder="VARCHAR"></input>
        <button type="submit">Submit</button>
     </form>
     </div>
        )
    }

    return(
        <div className="LandingPage">
            <div>
        <div id="leftSide">
            <img className="logo" src={imgs}/>
                <h1 className="header">The Box</h1>
            </div>
            {/* <img src='FrontEnd/thebox/src/css/images/whitespeaker.jpg' alt=""></img> */}
            </div>
            <div id='rightSide'>
                <header>
                    <button id="logIN" onClick={handleLogInClick}>Login</button>
                    <button id="signUP" onClick={handleSignUpClick}>Signup</button>
                </header>
                <div className="bottom">
                
                </div>
                <h1 id="slogan">Box in [ ] Box out </h1>
                </div>


                {Form?login():null}
                {signUpForm?signup():null}


                <img id="box" src={thebox} alt="Thank you Roddie" />
            </div>
    )
}

export default LandingPage