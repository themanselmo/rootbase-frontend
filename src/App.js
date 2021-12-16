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
  const [tasks, setTasls] = useState([])
  
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
  }, [])

  const handleLoginEmployee = () => {

  }

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
        <Route path="/" element={<TaskPage  currentUser={currentUser} currentWorker={currentWorker} />} />
        <Route path="/EmployeeLogin" element={<EmployeeLoginPage currentUser={currentUser} handleLoginEmployee={handleLoginEmployee} />} />
      </Routes>
    </div>
  );
}

export default App;
