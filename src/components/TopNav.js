import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/authOrg/authOrgSlice";

const TopNav = () => {
  // console.log(currentUser)
  const currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { organization } = useSelector((state) => state.authOrg);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  //   useEffect(() => {
  //     fetch("/me2").then((res) => {
  //       if (res.ok) {
  //         res.json().then((data) => {
  //           setCurrentAvatar(data.avatar);
  //           console.log("Reloading from app.js");
  //         });
  //       } else {
  //         // setCurrentWorker(null)
  //       }
  //     });
  //   }, []);

  return (
    <div id="top-nav">
      <div id="nav-name">
        <p>{organization.name}</p>
      </div>
      <div id="nav-stuff">
        <p>
          Today: {cYear} / {cMonth} / {cDay}
        </p>
        <Button onClick={onLogout}>Log Out</Button>
        {/* {currentWorker ? (
          <>
            {currentAvatar ? (
              <img id="avatar" src={`http://localhost:3000/${currentAvatar}`} />
            ) : (
              <div id="div-avatar">{currentWorker.name.charAt(0)}</div>
            )}
            <p>{currentWorker.name}</p>
            <Button onClick={handleLogout}>Log Out</Button>
          </>
        ) : (
          <Button onClick={() => navigate("/EmployeeLogin")}>Log In</Button>
        )} */}
      </div>
    </div>
  );
};

export default TopNav;
