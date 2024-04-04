import React, { useState } from 'react';
import axios from 'axios';
import './update.css'; // Importing styles from the addentry.css file
import icon2 from './icon.png';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      await axios.put(`https://mydiaryback.onrender.com/update/${id}`, { date, description }, {
        headers: {
          'x-token': token,
        }
      });
      
      navigate('/home');
    } catch (error) {
      console.error('Error updating entry:', error);
    }

  };
  function tohome(){
    navigate('/home')
  }

  return (
    <>
      <div className="update-border">
        <div className="update-entry-container">
          <img alt="" src={icon2} />
          <p className="update-diary-title">MyDiary App</p>
        </div>
        <div className="update-h-line"></div>
        <div className='update-addentry'>
          <h2 className="update-add-entry-heading">Update Entry</h2>
          <form onSubmit={handleSubmit}>
            <div className="update-date">Date
              <input type="date" className="update-date-box" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="update-des">
              <label htmlFor="description" className="update-des-label">Description</label>
              <textarea id="description"  placeholder="Your message"className="update-des-box" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>
            <button className="update-entry-btn">Update Entry</button>
            <button className="update-entry-btn" onClick={tohome}>Back to home</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;
