import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import TaskPage from './components/TaskPage';
import EmployeeLoginPage from './components/EmployeeLoginPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [currentWorker, setCurrentWorker] = useState(null)
  
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
          // console.log(user)
        })
      }
      else {
        setCurrentUser(null)
      }
    })

    fetch("/me2")
    .then(res => {
      if(res.ok) {
        res.json().then((worker) => {
          setCurrentWorker(worker)
          // console.log(worker)
        })
      }
      else {
        setCurrentWorker(null)
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
      <Routes>
        <Route path="/" element={<TaskPage 
          currentUser={currentUser} 
          currentWorker={currentWorker} 
          setCurrentWorker={setCurrentWorker}
          />} 
            
        />
        <Route path="/EmployeeLogin" element={<EmployeeLoginPage 
          currentUser={currentUser} 
          setCurrentWorker={setCurrentWorker} 
          
          />} />
      </Routes>
    </div>
  );
}

export default App;
