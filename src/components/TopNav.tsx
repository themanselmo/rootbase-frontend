import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutEmp, resetEmp } from '../features/authEmp/authEmpSlice';

const TopNav = () => {
  const currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const { organization } = useSelector((state) => state.authOrg);
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  const { employee } = useSelector((state) => state.authEmp);

  const onLogout = () => {
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'AsyncThunkAction<void, void, {}>... Remove this comment to see the full error message
    dispatch(logoutEmp());
    dispatch(resetEmp());
    navigate('/');
  };

  return (
    <div id="top-nav">
      <div id="nav-name">
        <p>{organization.name}</p>
      </div>
      <div id="nav-stuff">
        <p>
          Today: {cYear} / {cMonth} / {cDay}
        </p>
        {employee ? (
          <>
            {employee.avatar ? (
              <img id="avatar" src={`http://localhost:3000/${employee.avatar}`} alt="User Avatar" />
            ) : (
              <div id="div-avatar">{employee.name.charAt(0)}</div>
            )}
            <p>{employee.name}</p>
            <Button onClick={onLogout}>Log Out</Button>
          </>
        ) : (
          <Button onClick={() => navigate('/EmployeeLogin')}>Log In</Button>
        )}
      </div>
    </div>
  );
};

export default TopNav;
