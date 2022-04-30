import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./join.css"
import logo from './logo.jpg'


let user;

const sendUser= () =>{
    user=document.getElementById('joinInput').value;
    document.getElementById('joinInput').value="";
}



const Join = () => {
    
    const [name,setName]=useState("");


  return (
    <div className='JoinPage'>
        <div className="LoginContainer">
            <img src={logo} alt="not working" />
<h1>Chat Now</h1>
   <input onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' type="text" id="joinInput" />
  <Link  to='/chat' onClick={(e)=>!name?e.preventDefault():null}> <button className='joinbtn' onClick={sendUser}>
       Login IN
   </button> </Link>
        </div>

    </div>
  )
}

export default Join
export {user}