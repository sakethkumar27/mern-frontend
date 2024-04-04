import RegistrationForm from './components/register/registrationform.jsx';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/login/login.jsx';
 import HOME from './components/home/home.jsx';
 import ENTRY from './components/addentry/addentry.jsx';
import Update from './components/update/update.jsx'
import Viewentry from './components/viewentry/viewentry.jsx'


function App() {
  return (
    <div className="App">
     
     <BrowserRouter>
      <div className="App">
        
        <Routes  >
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/home" element={<HOME/>}/>
          <Route path="/addentry" element={<ENTRY/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          <Route path="/viewentry/:id" element={<Viewentry/>}/>
          <Route path="/" element={<RegistrationForm/>}/>

        </Routes>
      </div>
    </BrowserRouter>

    
      
    </div>
  );
}

export default App;