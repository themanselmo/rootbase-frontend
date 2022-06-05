import React from 'react';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';

const LoginForm = ({ handleAuthChange, handleAuthSubmit, handleAuthState }: any) => {
  // Reset errors on component unmount
  return (
    <Stack>
      <Input
        className="input"
        name="name"
        placeholder="Organization Name"
        onChange={handleAuthChange}
      />
      <Input
        className="input"
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleAuthChange}
      />
      <Button color="secondary" onClick={handleAuthSubmit}>
        Submit
      </Button>
      <Button color="secondary" onClick={handleAuthState}>
        Sign Up
      </Button>
    </Stack>
  );
};

export default LoginForm;
