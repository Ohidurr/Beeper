import React, { useState, useEffect } from "react";
import '../css/ProfilePage.css'

import axios from 'axios';
import Modal from './Modal';
import navBar from "./navBar";

const ProfilePage = () => {
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [profilePic, setProfilePic] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [focusPost,setFocusPost] = useState("");

    const fetchData = async () => {
        try{
            let id = sessionStorage.getItem("currentUser")
            let res = await axios.get(`http://localhost:3001/users/${id}`)
            let data = Object.values(res.data.body)
            setUser(data)
            console.log(user)
        } catch(error) {
            setUser([])
            console.log(error)
        }
    }

    useEffect(() => {   
        fetchData()
    }, [])
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let id = sessionStorage.getItem("currentUser")
                let res = await axios.get(`http://localhost:3001/posts/${id}`)
                let postImages = res.data.body
                setPosts(postImages)
            } catch(error) {
                setPosts([])
                console.log(error)
            }
        }
        fetchPosts()
    }, [])

    const toggleModal = (id) => {
        setFocusPost(id)
        setShowModal(!showModal) 
    }

    let userInfo = user.map(info => {
        return <section>
        <div className="profilePic"> 
        </div>
         <div className="userName">
         {info.display_name}    
         </div>
         </section>
    })
    
    let userPosts = posts.map(post => {
        return <div>
            <img src={post.post_pic} onClick={() => toggleModal(post.id)}></img>
            <div>
                <p>{post.caption}</p>
            </div>
        </div>
    })
    
    const selectProfilePic = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0])
            data.append('upload_preset', 'the_box')
             const res = await fetch(
            'https://api.cloudinary.com/v1_1/akb48/image/upload', 
            {
                method: 'POST',
                body: data
            })
        const file = await res.json()
        setProfilePic(file.secure_url)
    }

    const handleDisplayName = async (e) => {
        setDisplayName(e.target.value)
    }
    
    const updateUser = async (e) => {
        let form = e.target
        e.preventDefault();
        // debugger
        const id = sessionStorage.getItem("currentUser")    
        try{
            let res = await axios.patch(`http://localhost:3001/users/${id}`, { display_name: displayName, profile_pic: profilePic })
            fetchData()
        } catch(err) {
            console.log(err)
        }
        // debugger
        form.reset()
    }

    return( 
        <div>
            <nav>
                <navBar />
            </nav>
            <div className="userInfo">
                {userInfo}
            </div>      
            <div className="file">
                <form onSubmit={updateUser}>
                    <input type="text" onChange={handleDisplayName}/>
                    <input type="file" onChange={selectProfilePic}/>
                    <button type="submit">Edit User</button>
                </form>
            </div>
            <div className="userPosts">
                {userPosts}
            </div>
            <br></br>
            {showModal ? <Modal post={focusPost} /> : null}
        </div>
    )
}

export default userProfiles