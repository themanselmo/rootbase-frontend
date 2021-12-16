
const LoginTopNav = ({currentUser}) => {
    console.log(currentUser)
    return (
        <div id="top-nav">
            <p>{currentUser.name}</p>
            <p>Todays date</p>
            
        </div>
    )
}

export default LoginTopNav;