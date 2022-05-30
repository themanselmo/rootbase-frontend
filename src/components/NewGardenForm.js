// component imports
import { Stack, Input, Snackbar, Grow } from "@mui/material";
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";

import { useState } from "react";

const NewGardenForm = ({ handleCreating, handleCreateGarden, gardens }) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState(Grow);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    console.log("creating garden", formData);

    handleCreateGarden(formData);
    setAlertMessage("Garden Added!");
    handleClick(Grow);
    // handleCreating()
  };

  const handleClick = (transition) => {
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
        TransitionComponent={transition}
        autoHideDuration={2000}
        // message="Item Deleted!"
        key={transition.name}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
      <Stack>
        <Input
          className="input"
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <Button color="secondary" onClick={handleCreate}>
          Submit
        </Button>
      </Stack>
    </div>
  );
};

export default NewGardenForm;
