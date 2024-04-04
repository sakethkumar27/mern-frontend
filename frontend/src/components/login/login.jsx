import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import icon from './icon.png';



const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

 

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
     const response= await axios.post("https://mydiaryback.onrender.com/login",{username,password})
    const token=response.data.token
 
   
    setUsername('')
    setPassword('')
    
    alert("sucessfully loged in ")
    localStorage.setItem('token',token)
    localStorage.setItem('username',username)


    navigate('/home', { state: { username } });
    }
    catch (e) {
      console.error(e);
      alert("invalid username or password")
    }




  }

  return (
    <>
      <div className="lines">
        <div className="headings">
        <img className="icon1" alt="icon" src={icon} />
        <p className="diary">My Diary App</p>
        </div>
        <div className="sleeping-line"></div>

        <div className="block">
        
          <div id="menu" className="register-form">
          <img alt="" className="book1" src="https://uxwing.com/wp-content/themes/uxwing/download/education-school/open-book-icon.png"/><p>Login Here</p>
            <form  onSubmit={handleSubmit}>
              <div className="userNAme">Username
                <input className="search-box" type="username"onChange={(e) => { setUsername(e.target.value) }}  required />
              </div>
              <div className="passwords">Password
                <input className="password-input-box" type="password" onChange={(e) => { setPassword(e.target.value) }} required />
              </div>
              <div className="submit">

                <button className="submit-button"  >LOGIN</button>
                <div className="links">New User? Register
                  <a className="now" href="/register"> Now</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};


export default LoginForm;