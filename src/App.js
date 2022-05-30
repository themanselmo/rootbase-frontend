import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import LoginPage from "./components/LoginPage";
import { ThemeProvider } from "@mui/material/styles";
import TaskPage from "./components/TaskPage";
import EmployeeLoginPage from "./components/EmployeeLoginPage";
import GardenPage from "./components/GardenPage";
import TopNav from "./components/TopNav";
import theme from "./theme";
import ProtectedRoute from "./components/atoms/ProtectedRoute";

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
