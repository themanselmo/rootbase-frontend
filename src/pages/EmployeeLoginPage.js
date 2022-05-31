import SideNav from "../components/SideNav";
import LoginTopNav from "../components/LoginTopNav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import NewEmployeeForm from "../components/NewEmployeeForm";
import { loginEmp, registerEmp } from "../features/authEmp/authEmpSlice";
import {
  getOrgEmployees,
  resetOrgEmployees,
} from "../features/orgEmployees/orgEmployeesSlice";
import {
  Button,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DirectUpload } from "activestorage";

const EmployeeLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { organization } = useSelector((state) => state.authOrg);
  const { isSuccess: isSuccessAuthEmp } = useSelector((state) => state.authEmp);
  const {
    orgEmployees,
    isLoading,
    isError,
    isSuccess: isSuccessGetOrgEmployees,
    message,
  } = useSelector((state) => state.orgEmployees);

  const [creating, setCreating] = useState(false);

  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [currentEID, setCurrentEID] = useState(null);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccessAuthEmp) {
      navigate("/");
    }

    dispatch(getOrgEmployees());

    return () => {
      dispatch(resetOrgEmployees());
      setCreating(false);
    };
  }, [isError, isSuccessAuthEmp, message, navigate, dispatch]);

  const handleClickOpen = (EID) => {
    setCurrentEID(EID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePinSubmit = () => {
    handleLoginEmp(currentEID);
    handleClose();
  };

  const handleChange = (e) => {
    setPin(e.target.value);
  };

  const handleLoginEmp = (employee_id) => {
    const empData = { id: employee_id, pin: pin };

    dispatch(loginEmp(empData));

    navigate("/");
  };

  const handleCreateEmp = (formData) => {
    const upload = new DirectUpload(
      formData.avatar,
      "/rails/active_storage/direct_uploads"
    );
    upload.create((error, blob) => {
      if (error) {
        console.log(error);
      } else {
        const empData = {
          name: formData.name,
          pin: formData.pin,
          avatar: blob.signed_id,
          organization_id: organization.id,
        };

        dispatch(registerEmp(empData));
      }
    });
  };

  const handleCreating = () => {
    setCreating(!creating);
  };

  return (
    <div id="employee-login-page">
      <SideNav />
      <div id="employee-login-content">
        <LoginTopNav organization={organization} />
        {creating ? (
          <NewEmployeeForm
            handleCreating={handleCreating}
            handleCreateEmployee={handleCreateEmp}
          />
        ) : (
          <div id="employee-list-content">
            <p>Select your name from the list below</p>
            <p>
              Don't see yourself?{" "}
              <Button onClick={handleCreating}>Create</Button> a new employee
            </p>
            {orgEmployees && (
              <div id="employees">
                {orgEmployees.map((employee) => (
                  <div
                    className="employee-card"
                    onClick={() => handleClickOpen(employee.id)}
                  >
                    <p>{employee.name}</p>
                    <p>{employee.name}@rootbase.com</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Break into separate component */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To log in, please enter your pin.
          </DialogContentText>
          <Input autoFocus onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePinSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeLoginPage;
