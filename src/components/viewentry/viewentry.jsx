import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './viewentry.css';
import icon2 from './icon.png';



const Viewentry = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mydiaryback.onrender.com/viewentry/${id}`);
        setEntry(response.data);
      } catch (error) {
        console.error('Error fetching entry:', error);
      }
    };

    fetchData();
  }, [id]);
  function backtohome(){
    navigate('/home')
  }

  return (

    <div className="view-border">
    <div className="view-entry-container">
      <img alt="" src={icon2} className="view-icon" />
      <p className="view-diary-title">MyDiary App</p>
    </div>
    <div className="view-h-line"></div>
    <div className='view-addentry'>
      <h2 className="view-add-entry-heading">View Entry</h2>
      <div className="view-date">
      <p>Date: {new Date(entry.date).toLocaleDateString('en-GB')}</p>
        </div>
      <div className="view-des">
        <label htmlFor="view-description" className="view-des-label">Description</label>
        <div id="view-description" className="view-des-box">{entry.description}</div>
      </div>
      <button className="view-to-home" onClick={backtohome}> back to home</button>
    </div>
  </div>
     
    
  );
};

export default Viewentry;
