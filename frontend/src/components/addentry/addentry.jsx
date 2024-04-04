import React, { useState } from 'react';
import axios from 'axios';
import './addentry.css'
import icon2 from './icon.png'
import { useNavigate } from 'react-router-dom';

export const Entry = () => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
 // const [uuid, setUuid] = useState('');
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     // Get the JWT token from localStorage
       const res = await axios.post(
        'http://localhost:8000/addentry',
        { date, description },
        { headers: { 'x-token': token } } // Include the token in the request headers with 'x-token' header
      );

     
      localStorage.setItem('uuid',res.data.uuid1)
      //setUuid1(res.data.uuid1);
      navigate('/home'); // Navigate to the home page after successful entry addition
    } catch (error) {
      console.error(error);
    }
    
  };
  function home(){
    navigate('/home')
   }
  return (
    <>
    <div className="border1">
     <div className="entry-container">
      <img  alt=""src={icon2}/>
      <p className="mydiary-title">MyDiary App</p>
      
      </div>
      <div className="h-line"> </div>
      <div className='addentry'>
      <h2 className="add-entry-heading">Add Entry</h2>
      
      <form onSubmit={handleSubmit} method="post">
        

        <div className="date">Date
        <input type="date" className="date-box" placeholder="Date" value={date} onChange={(e) => setDate(e.target.value)} required />
       </div>
      
       <div className="des">
       <label htmlFor="description" className="des-label">Description</label>
        <textarea  id="description"className="des-box" rows="5" placeholder="Your Message" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        
          </div>
        <button  className="entry">Add Entry</button>
        <button  className="entry home" onClick={home}> Back to home</button>
      </form>
      </div>
      </div>
      
    </>
  );
};

export default Entry;
