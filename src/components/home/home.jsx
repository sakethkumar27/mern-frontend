import React, { useState, useEffect } from 'react';
import './home.css';
import icon from './icon.png'
import { useLocation, useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

export const HOME = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const username = location.state && location.state.username ? location.state.username : localStorage.getItem('username')
  

const id=useParams()



  // console.log(id)



  // Function to fetch entries from the server
  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const uuid1 = localStorage.getItem('uuid1')// Get the JWT token from localStorage
      const response = await axios.post('https://mydiaryback.onrender.com/api/getuser', { uuid1 }, { headers: { 'x-token': token } }); // Make POST request to server with UUID in the request body and token in headers
      setEntries(response.data); // Update entries state with received data
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [])
  const addEntryButton = () => {
    navigate('/addentry');
  };


  const deleteEntry = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
    if (confirmDelete) {
        try {
            await axios.delete(`https://mydiaryback.onrender.com/deleteentry/${id}`)
            
            // Update state with the entries array excluding the deleted entry
            .then(res=>{console.log(res)
            window.location.reload()})
            .catch(err=>{console.error(err)})
        } catch (error) {
            console.error('Error deleting entry:', error);
        }
    }
};

const handleSignOut = () => {
  localStorage.removeItem('token'); // Remove authentication token from local storage
  localStorage.removeItem('uuid1'); // Remove user ID from local storage
  navigate('/login'); // Redirect to login page
};




  return (
    <>
      <div className="border">
        <div className="heading">
        <img className="icon1" alt="icon" src={icon} />
        <p className="diary1">MyDiary App</p>
        </div>
        <div className="standing-line"></div>
        <div className="name">
          <p className="greet">
            Welcome {username}
            <a className="logout" onClick={handleSignOut}>
              logout
            </a>
          </p>
        </div>

        <div>
          <p className="linep">
            
            List of past entries
            
            
            <button className="line" onClick={addEntryButton}>
              Add Entries
            </button>
          </p>

          <table className="table">
            <thead className="thead">
              <tr>
                <th>Date</th>
                <th colSpan={3}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render each entry as a row in the table */}
              {entries.map((entry, _id, index) => (
                <tr key={index}>
                  <td className="cell">{new Date(entry.date).toLocaleDateString('en-GB')}</td>
                  <td className="linkcell"><Link to={`/viewentry/${entry._id}?date=${entry.date}&description=${entry.description}`}>View</Link>

                  </td>
                  <td className="linkcell">
                    {/* Link to the update page with the entry ID included in the URL */}
                
                   <Link to={`/update/${entry._id}`}>Update</Link>
                    

                  </td>
                  <td className="linkcell ">
                  <button  className="delete"onClick={() => deleteEntry(entry._id)}>Delete</button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HOME;