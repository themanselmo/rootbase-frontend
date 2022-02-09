import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import TaskPage from './components/TaskPage';
import EmployeeLoginPage from './components/EmployeeLoginPage';
import GardenPage from './components/GardenPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentWorker, setCurrentWorker] = useState(null)
  const [currentAvatar, setCurrentAvatar] = useState(null)
  
  const theme = createTheme({
        palette: {
            primary: {
            // Purple and green play nicely together.
            main: '#598F14',
            },
            secondary: {
            // This is green.A700 as hex.
            main: '#598F14',
            },
        },
    });

  useEffect(()=> {
    fetch("/me")
    .then(res => {
      if(res.ok) {
        res.json().then((user) => {
          setCurrentUser(user)
          console.log(user)
        })
      }
      else {
        setCurrentUser(null)
      }
    })

    fetch("/me2")
    .then(res => {
      if(res.ok) {
        res.json().then((data) => {
          setCurrentWorker(data.employee)
          setCurrentAvatar(data.avatar)
          console.log("Reloading from app.js")
        })
      }
      else {
        setCurrentWorker(null)
        setCurrentAvatar(null)
      }
    })
  }, [])



  if (!currentUser) return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LoginPage setCurrentUser={setCurrentUser} />
      </ThemeProvider>
    </div>
  )

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<TaskPage 
          currentUser={currentUser} 
          currentWorker={currentWorker}
          currentAvatar={currentAvatar}
          setCurrentAvatar={setCurrentAvatar}
          setCurrentWorker={setCurrentWorker}
          />} 
            
        />
        <Route path="/EmployeeLogin" element={<EmployeeLoginPage 
          currentUser={currentUser} 
          setCurrentWorker={setCurrentWorker} 
          
          />} 
        />
        <Route path="/GardenPage" element={<GardenPage 
          currentUser={currentUser}
          currentWorker={currentWorker}
          setCurrentWorker={setCurrentWorker}
          currentAvatar={currentAvatar}
          setCurrentAvatar={setCurrentAvatar}
          />} 
        />
        
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;