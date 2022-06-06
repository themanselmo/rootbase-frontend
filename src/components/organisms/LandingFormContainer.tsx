import styled from 'styled-components';
import LoginForm from '../molecules/forms/LoginForm';
import SignUpForm from '../molecules/forms/SignUpForm';
import theme from '../../theme';
import { useEffect } from 'react';
import { resetOrg } from '../../features/authOrg/authOrgSlice';
import { useDispatch } from 'react-redux';

const LandingFormContainer = ({
  handleAuthChange,
  handleAuthSubmit,
  handleAuthState,
  loggingIn,
  isError,
  message
}: {
  // eslint-disable-next-line no-unused-vars
  handleAuthChange: (e: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleAuthSubmit: (e: any) => void;
  handleAuthState: () => void;
  loggingIn: boolean;
  isError: boolean;
  message: string;
}) => {
  const dispatch = useDispatch();
  const authFormProps = { handleAuthChange, handleAuthSubmit };

  useEffect(() => {
    dispatch(resetOrg());
  }, [loggingIn]);

  return (
    <Div theme={theme}>
      <h1>Rootbase</h1>
      {loggingIn ? <LoginForm {...authFormProps} /> : <SignUpForm {...authFormProps} />}
      <p className="error">{isError && message}</p>
      <div className="container-footer">
        <p>{loggingIn ? "Don't" : 'Already'} have an account?</p>
        <button onClick={handleAuthState}>{loggingIn ? 'Sign up' : 'Log in'}</button>
      </div>
    </Div>
  );
};

export default LandingFormContainer;

const Div = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
  color: gray;
  width: 300px;
  height: 310px;
  h1 {
    color: white;
  }
  .error {
    color: red;
    margin: 0;
    height: 17px;
    font-size: 0.9em;
  }
  .container-footer {
    display: flex;
    flex-direction: row;
    button {
      background: none;
      border: 0;
      color: ${({ theme }) => theme.palette.secondary.main};
      cursor: pointer;
      font-weight: 700;
    }
  }
`;
