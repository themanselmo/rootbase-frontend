import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginOrg, registerOrg, resetOrg } from '../features/authOrg/authOrgSlice';
import DayNightAnimation from '../components/molecules/DayNightAnimation';
import LoginForm from '../components/molecules/forms/LoginForm';
import SignUpForm from '../components/molecules/forms/SignUpForm';

const LoginPage = () => {
  const [loggingIn, setLoggingIn] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const { name, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { organization, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authOrg
  );

  useEffect(() => {
    seedToTree();

    if (isSuccess || organization) {
      navigate('/');
    }

    return () => {
      dispatch(resetOrg());
    };
  }, [organization, isSuccess, message, navigate, dispatch]);

  const [flip, setFlip] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(false);

  const DayNightState = {
    flip,
    hidden,
    hidden2
  };

  const seedToTree = () => {
    setFlip((prevState) => !prevState);
    setHidden((prevState) => !prevState);
    setTimeout(() => {
      setHidden2((prevState) => !prevState);
    }, 1000);
  };

  const handleAuthChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      password
    };

    loggingIn ? dispatch(loginOrg(userData)) : dispatch(registerOrg(userData));
  };

  const handleAuthState = () => {
    seedToTree();
    loggingIn ? setLoggingIn(true) : setLoggingIn(false);
  };

  const authProps = {
    handleAuthChange,
    handleAuthSubmit,
    handleAuthState,
    loggingIn,
    isError,
    isLoading
  };

  return (
    <div id="login-page">
      <DayNightAnimation {...DayNightState} />

      {/* Controller Organism */}
      {/* Takes in errors */}
      {/* Takes in loading */}
      {/* {isError ? <p>{message}</p> : null} */}
      {/* Sign up/ Log in button at bottom */}

      {loggingIn ? <LoginForm {...authProps} /> : <SignUpForm {...authProps} />}
    </div>
  );
};

export default LoginPage;
