const LoginTopNav = ({ organization }) => {
  const currentDate = new Date();
  let cDay = currentDate.getDate();
  let cMonth = currentDate.getMonth() + 1;
  let cYear = currentDate.getFullYear();

  return (
    <div id="top-nav">
      <p>{organization.name}</p>
      <p>
        Today: {cYear} / {cMonth} / {cDay}
      </p>
    </div>
  );
};

export default LoginTopNav;
