// component imports
import { Stack, Input, Select, MenuItem, FormControl, Snackbar, Grow } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import Button from '@mui/material/Button';

import { useState } from 'react';

const NewTaskForm = ({ handleCreateTask, gardens }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    due_date: ''
  });
  const [selectedGarden, setSelectedGarden] = useState({});
  const [gardenName, setGardenName] = useState({});

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
    console.log('creating task', formData);

    handleCreateTask(formData, selectedGarden);
    setAlertMessage('Task Added!');
    handleClick(Grow);
    // handleCreating()
  };

  const handleSelectedGarden = (gardenID: any) => {
    console.log(gardenID.name);
    setSelectedGarden(gardenID);
  };

  const handleClick = (transition: any) => {
    setOpen(true);
    setTransition(transition);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGardenChange = (event: any) => {
    setGardenName(event.target.value);
  };
  console.log(selectedGarden);
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
        <Input
          className="input"
          type="date"
          name="due_date"
          placeholder="due date YYYY/MM/DD"
          onChange={handleChange}
        />
        <FormControl>
          {/* <InputLabel id="garden-select-label">Garden</InputLabel> */}

          <Select
            // labelId="garden-select-label"
            value={gardenName}
            onChange={handleGardenChange}>
            {/* value={selectedGarden== "" ? selectedGarden.name : ""} */}
            {gardens.map((garden: any) => {
              // return <MenuItem onClick={() => handleSelectedGarden(garden)}>{garden.name}</MenuItem>
              return (
                <MenuItem
                  key={garden.id}
                  onClick={() => handleSelectedGarden(garden)}
                  value={garden.name}>
                  {garden.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button color="secondary" onClick={handleCreate}>
          Submit
        </Button>
      </Stack>
    </div>
  );
};

export default NewTaskForm;
