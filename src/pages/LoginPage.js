import { useEffect, useState } from "react";
import logo from "../assets/rootbase-logo.png";

// component imports
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginOrg,
  registerOrg,
  resetOrg,
} from "../features/authOrg/authOrgSlice";

const LoginPage = () => {
  const [loggingIn, setLoggingIn] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const { name, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { organization, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authOrg
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || organization) {
      navigate("/");
    }

    return () => {
      dispatch(resetOrg());
    };
  }, [organization, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      name,
      password,
    };

    loggingIn ? dispatch(loginOrg(userData)) : dispatch(registerOrg(userData));
  };

  return (
    <div id="login-page">
      <img src={logo} id="login-logo" />
      {loggingIn ? (
        <Stack>
          <Input
            className="input"
            name="name"
            placeholder="Organization Name"
            onChange={handleChange}
          />
          <Input
            className="input"
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
          <Button color="secondary" onClick={handleLogin}>
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setLoggingIn(false);
            }}
          >
            Sign Up
          </Button>
          {isError ? <p>{message}</p> : null}
        </Stack>
      ) : (
        <Stack>
          <Input
            className="input"
            name="name"
            placeholder="Organization Name"
            onChange={handleChange}
          />
          <Input
            className="input"
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
          <Button color="secondary" onClick={handleLogin}>
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setLoggingIn(true);
            }}
          >
            Log In
          </Button>
          {isError ? <p>{message}</p> : null}
        </Stack>
      )}
    </div>
  );
};

export default LoginPage;
