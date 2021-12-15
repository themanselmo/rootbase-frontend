import { useEffect, useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import TaskPage from './components/TaskPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null)

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
        })
      }
      else {
        setCurrentUser(null)
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
      <TaskPage />
    </div>
  );
}

export default App;
