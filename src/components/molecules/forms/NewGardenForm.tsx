// component imports
import { Stack, Input, Snackbar, Grow } from '@mui/material';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';

import { useState } from 'react';

const NewGardenForm = ({ handleCreateGarden }: any) => {
  const [formData, setFormData] = useState({
    name: ''
  });
  const [open, setOpen] = useState(false);
  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(props: GrowProps) => Element' i... Remove this comment to see the full error message
  const [transition, setTransition] = useState(Grow);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreate = () => {
    console.log('creating garden', formData);

    handleCreateGarden(formData);
    setAlertMessage('Garden Added!');
    handleClick(Grow);
    // handleCreating()
  };

  const handleClick = (transition: any) => {
    setOpen(true);
    setTransition(transition);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div id="new-employee-form">
      <Snackbar
        open={open}
        onClose={handleClose}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'JSXEleme... Remove this comment to see the full error message
        TransitionComponent={transition}
        autoHideDuration={2000}
        // message="Item Deleted!"
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'Element'.
        key={transition.name}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%' }}>
          {alertMessage}
        </MuiAlert>
      </Snackbar>
      <Stack>
        <Input className="input" name="name" placeholder="name" onChange={handleChange} />
        <Button color="secondary" onClick={handleCreate}>
          Submit
        </Button>
      </Stack>
    </div>
  );
};

export default NewGardenForm;
