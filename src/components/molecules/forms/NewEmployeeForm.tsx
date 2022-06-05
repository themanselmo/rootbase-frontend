// component imports
import { Stack, Input } from '@mui/material';
import Button from '@mui/material/Button';

import { useState } from 'react';

const NewEmployeeForm = ({ handleCreating, handleCreateEmployee }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    pin: '',
    avatar: {}
  });

  const handleChange = (e: any) => {
    if (e.target.name === 'avatar') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      console.log(e.target.value);
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleCreate = () => {
    console.log('creating employee', formData);
    handleCreateEmployee(formData);
    handleCreating();
  };

  return (
    <div id="new-employee-form">
      <Stack>
        <Input className="input" name="name" placeholder="name" onChange={handleChange} />
        <Input className="input" name="pin" placeholder="pin" onChange={handleChange} />
        <Input type="file" name="avatar" onChange={handleChange} />
        <Button color="secondary" onClick={handleCreate}>
          Submit
        </Button>
      </Stack>
    </div>
  );
};

export default NewEmployeeForm;
