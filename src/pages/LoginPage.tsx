import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginOrg, registerOrg, resetOrg } from '../features/authOrg/authOrgSlice';
import DayNightAnimation from '../components/molecules/DayNightAnimation';
import LandingFormContainer from '../components/organisms/LandingFormContainer';
import { asyncOrganization } from '../interfaces/organization';
import styled from 'styled-components';

const LoginPage = () => {
  const [loggingInState, setLoggingInState] = useState<{ loggingIn: boolean }>({ loggingIn: true });
  const { loggingIn }: { loggingIn: boolean } = loggingInState;
  const [formData, setFormData] = useState<{ name: string; password: string }>({
    name: '',
    password: ''
  });

  const { name, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { organization, isError, isSuccess, message } = useSelector(
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    (state): asyncOrganization => state.authOrg
  );

  useEffect(() => {
    seedToTree();

    if (isSuccess || organization) {
      navigate('/');
    }

    return () => {
      dispatch(resetOrg());
    };
  }, [organization, isSuccess, navigate, dispatch]);

  const [flip, setFlip] = useState<boolean>(true);
  const [hidden, setHidden] = useState<boolean>(true);
  const [hidden2, setHidden2] = useState<boolean>(false);

  const DayNightState = {
    flip,
    hidden,
    hidden2
  };

  const seedToTree = (): void => {
    setFlip((prevState) => !prevState);
    setHidden((prevState) => !prevState);
    setTimeout(() => {
      setHidden2((prevState) => !prevState);
    }, 1000);
  };

  const handleAuthChange = (e: any): void => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleAuthSubmit = (e: any): void => {
    e.preventDefault();
    const userData = {
      name,
      password
    };

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<any, void, {}>'... Remove this comment to see the full error message
    loggingIn ? dispatch(loginOrg(userData)) : dispatch(registerOrg(userData));
  };

  const handleAuthState = (): void => {
    seedToTree();
    console.log(loggingIn);
    setLoggingInState((prevState) => ({
      ...prevState,
      loggingIn: !prevState.loggingIn
    }));
  };

  const authProps = {
    handleAuthChange,
    handleAuthSubmit,
    handleAuthState,
    loggingIn,
    isError,
    message
  };

  return (
    <Div>
      <DayNightAnimation {...DayNightState} />
      <LandingFormContainer {...authProps} />
    </Div>
  );
};

export default LoginPage;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: #1e2124;
  height: 100vh;
  transition: 250ms;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
