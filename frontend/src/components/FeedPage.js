import React, { useState, useEffect } from "react";
import navBar from './navBar'
import { useHistory } from 'react-router-dom';
import '../css/FeedPage.css'
import Modal from './Modal'
import axios from 'axios'


const FeedPage = () => {
    
    const [posts, setPosts] = useState([]);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState("");
    const [showModal, setShowModal] = useState(false)
    const [focusPost,setFocusPost] = useState("")
    const [searchFail,setsearchFail] = useState(false)


    const fetchData = async () => {
        try{
            let res = await axios.get("http://localhost:3001/posts")
            let data = res.data.body  
            setPosts(data)
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    
    const wordSearch = (async (str)=>{
        if(str===""){
            setsearchFail(false)
            return fetchData()
        }
        try{
            let res = await axios.get(`http://localhost:3001/hashtags/search/?hashtag=${str}`)
            // debugger
            if(res.data.status==="fail"){
                setsearchFail(true)
                // debugger
                setPosts([])
            }else if(res.data.status==="Success"){
                setsearchFail(false)
                setPosts(res.data.body)
            }
            // let data = res.data.body  
            // setPosts(data)
        } catch(error) {
            console.log(error)
        }
    })
    
    const handleSearch =(e)=>{
        e.preventDefault()
        wordSearch(e.target.value)
        // setSearchActive(true)
        // debugger
    }

    const toggleModal = (id) => {
        setFocusPost(id)
        setShowModal(!showModal) 
    }

    const postPics = posts.map(post => {
        return <div> 
         <img src={post.post_pic} name="modal-button" height="200px" width="200px" onClick={() => toggleModal(post.id)}/>
       <br/> {post.caption} </div>
    })  



    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0])
        data.append('upload_preset', 'the_box')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/akb48/image/upload', 
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        setLoading(false)
        
    }

    const handleCaption = (e) => {
        setCaption(e.target.value)
    }
    
    axios.post("http://localhost:3001/posts", post)
        .then((data) => {
            console.log(data)
        })
        .catch((err) => {
            console.log(err)
        })

 
   
    return(
        <div>
        <nav>
            <navBar/>
        </nav>
        <section>
        <div className="search">
            <input type="text" placeholder="Search #Hashtags" onChange={handleSearch}/>
            <br></br>
        </div>
            <br></br>
            <form> 
            // className="fileUpload" onSubmit={handleClick}>
            <input type="file" name="myFile" placeholder="Upload an Image" onChange={uploadImage}/>
            <input  id="caption" name="caption" placeholder="Comment" onChange={handleCaption}></input>
            <button  id="submit" type="submit">Create Post</button>
            </form>
            {loading ? (
                <h3>Loading...</h3>
            ): (
                <img src={image} name="modal-button" style ={{width: '200px'}} />
            )}
            <br></br>
        <div className="feed">
            {postPics}
            <p></p>
        </div>


        </section>
                
        {showModal ? <Modal post={focusPost} /> : null} 
        {searchFail?<div><h2> No Posts found </h2></div>:null}
        
       

        </div>
    )
}


export default FeedPage