import { useEffect, useState } from "react";
import logo from "../assets/rootbase-logo.png";
import styled from "styled-components";
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
import PlantPot from "../components/atoms/icons/PlantPot";
import Seedling from "../components/atoms/icons/Seedling";
import Tree from "../components/atoms/icons/Tree";
import Circle from "../components/atoms/icons/Circle";

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
    seedToTree();

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

  const [flip, setFlip] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(false);

  const seedToTree = () => {
    setFlip((prevState) => !prevState);

    setHidden((prevState) => !prevState);
    setTimeout(() => {
      setHidden2((prevState) => !prevState);
    }, 1000);
  };

  return (
    <div id="login-page">
      <Div>
        <span className={`moon-sun ${flip ? "daylight-animated" : "nightlight-animated"}`}>
          <Circle height="100px" width="100px" />
        </span>
       
        

        <section className="upper-animation">
          <span
            className={`${
              flip ? "tree popdown-animated" : "tree popup-animated"
            }  ${!hidden ? "hidden" : ""}`}
          >
            <Tree width="150px" height="150px" />
          </span>
          <span
            className={`${!flip ? "tree popup-animated" : "tree"} ${
              hidden2 ? "hidden" : ""
            }`}
          >
            <Tree width="150px" height="150px" />
          </span>
          <span
            className={`${
              !flip ? "seedling popdown-animated" : "seedling popup-animated"
            }  ${hidden ? "hidden" : ""}`}
          >
            <Seedling width="150px" height="150px" />
          </span>
          <span
            className={`${flip ? "seedling popup-animated" : "seedling"} ${
              !hidden2 ? "hidden" : ""
            }`}
          >
            <Seedling width="150px" height="150px" />
          </span>
        </section>

        <section className="lower-animation">
          <span className="plant-pot">
            <PlantPot width="250px" height="250px" />
          </span>
        </section>
      </Div>

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
              seedToTree();
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
              seedToTree();
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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 400px;
  .upper-animation{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .lower-animation{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .tree {
    fill: #598f14;
    position: absolute;
    bottom: -13px
  }
  .seedling {
    fill: #598f14;
    position: absolute;
    bottom: -22px;
  }
  .plant-pot {
    fill: #936647;
    position: absolute;
    bottom: 20px;
  }
  .hidden{
    display: none;
  }
  .moon-sun {
    position: absolute;
    transition: 1s;
    animation: sun-to-moon 1s linear;
    transform: rotate(0deg) translateX(200px) rotate(0deg)
  }

  .daylight-animated {
    fill: yellow;
    animation: sun-to-moon 1s linear;
  }

  .nightlight-animated{
    fill: white;
    animation: sun-to-moon 1s linear reverse;
  }
  
  .popup-animated {
    animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
    animation: cartoon-slide 1s ease;
  }

  .popdown-animated {
    animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
    animation: cartoon-slide 1s ease reverse
  }

  @keyframes cartoon-slide {
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-50px); }
        50%  { transform: scale(1.05,.95) translateY(100); }
        57%  { transform: scale(1,1)      translateY(200px); }
        64%  { transform: scale(1,1)      translateY(300); }
        100% { transform: scale(1,1)      translateY(300px); }
    }

  @keyframes sun-to-moon {
    from { fill: yellow;}
    to  { fill: white;}
  }
  }
`;
