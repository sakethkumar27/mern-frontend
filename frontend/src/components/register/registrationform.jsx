import React, { useState} from 'react'
import './registrationform.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import icon from './icon.png';




const RegistrationForm = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()



  const handleSubmit = (e) => {

    e.preventDefault();
    axios
      .post('http://localhost:8000/register', { username, password })
      .then(() => {
        alert('Registration Successful')
        navigate('/login')
      })
      .catch((error) => {
        console.log('Unable to register user')
      })


  }


  return (
    <>
       <div className="full">
       <div className="thin-line">
        <div className="heading">
          <div className="icon-container">
            <img className="icon1" alt="icon" src={icon} />
            <p className="app-title">My Diary App</p>
          </div>
        </div>
        <div className="vertical-lines"></div>
        <div className="signup-block">
          

          <div  className="registration-form">
          <img  className='book'  alt=""src="https://uxwing.com/wp-content/themes/uxwing/download/education-school/open-book-icon.png"/><p>Registration Form</p>

                
            <form method="POST" onSubmit={handleSubmit}>

              <div className="username"> Username
                <input className="search" type="search-box" onChange={(e) => { setUsername(e.target.value) }} required />
              </div>
              <div className="password"> Password
                <input className="password-input" type="password" onChange={(e) => { setPassword(e.target.value) }} required />
              </div>
              <div>
                <button className="register-button" type="submit">Register</button>

                <div className="link">Existing User? login
                  <a href="/login"> here</a>
                </div>

              </div>
            </form>
          </div>
        </div>
        </div>
       </div>
     
  


    </>








  )



};



export default RegistrationForm;
