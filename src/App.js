import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import './App.css';
import TopNav from './components/TopNav';
import theme from './theme';
import ProtectedRoute from './components/atoms/ProtectedRoute';

import TaskPage from './pages/TaskPage';
import GardenPage from './pages/GardenPage';
import LoginPage from './pages/LoginPage';
import EmployeeLoginPage from './pages/EmployeeLoginPage';

function App() {
  const { organization } = useSelector((state) => state.authOrg);
  return (
    <>
      <Router>
        <div className="App">
          <ThemeProvider theme={theme}>
            {organization && <TopNav />}
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute user={organization}>
                    <TaskPage />
                  </ProtectedRoute>
                }
              />

              <Route path="/login" element={<LoginPage />} />

              <Route
                path="/EmployeeLogin"
                element={
                  <ProtectedRoute user={organization}>
                    <EmployeeLoginPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/GardenPage"
                element={
                  <ProtectedRoute user={organization}>
                    <GardenPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ThemeProvider>
        </div>
      </Router>
    </>
  );
}

export default App;
