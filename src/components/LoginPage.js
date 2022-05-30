import { useEffect, useState } from "react";
import logo from "../assets/rootbase-logo.png";

// component imports
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, register, reset } from "../features/authOrg/authOrgSlice";

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
    if (isSuccess || organization) {
      navigate("/");
    }

    dispatch(reset());
  });

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

    loggingIn ? dispatch(login(userData)) : dispatch(register(userData));
  };

  // const [loggingIn, setLoggingIn] = useState(true)

  // const [formData, setFormData] = useState({
  //     name: "",
  //     password: "",
  // });

  // const [error, setErrors] = useState([]);

  // const stuff = {
  //     method: "POST",
  //     headers: {
  //     "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  // }

  // const handleLogin = (e) => {
  //     e.preventDefault()
  //     console.log("logging in: ", formData)
  //     fetch("/login", stuff)
  //     .then(res => {
  //     if (res.ok) {
  //         res.json().then((user) => {
  //         console.log(user);
  //         setCurrentUser(user);
  //         });
  //     } else {
  //         res.json().then((errors) => {
  //         console.log(errors);
  //         setErrors(errors.errors);
  //         });
  //     }
  //     })
  // }

  // const handleSignup = (e) => {
  //     e.preventDefault()
  //     console.log("signing up: ", formData)

  //     fetch("/organizations", stuff)
  //     .then(res => {
  //     if (res.ok) {
  //         res.json().then((user) => {
  //         console.log(user);
  //         setCurrentUser(user);
  //         });
  //     } else {
  //         res.json().then((errors) => {
  //         console.log(errors);
  //         setErrors(errors.errors);
  //         });
  //     }
  //     })
  // }

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
