import { useNavigate } from 'react-router'
import logo from '../assets/rootbase-logo.png'
const SideNav = () => {

    const navigate = useNavigate();

    return (
        <div id="side-nav">
            <img id="side-nav-logo" src={logo} />
            <div className="side-nav-card" onClick={() => navigate('/')}>
                <p>Tasks</p>
            </div>
            <div className="side-nav-card" onClick={() => navigate('/GardenPage')}>
                <p>Gardens</p>
            </div>
        </div>
    )
}

export default SideNav