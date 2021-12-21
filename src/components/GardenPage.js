import { useState } from "react"
import TopNav from "./TopNav"
import SideNav from "./SideNav"
import GardenDetail from "./GardenDetail"
import NewGardenForm from "./NewGardenForm"

const GardenPage = ({ currentUser, currentWorker, setCurrentWorker, currentAvatar, setCurrentAvatar }) => {

    const [gardens, setGardens] = useState(currentUser.gardens)
    const [creating, setCreating] = useState(false)
    const [focusedGarden, setFocusedGarden] = useState(null)

    const listGardens = (gardens) => {
       return gardens.map(garden => <div className="garden-card">
           <p>{garden.name}</p>
       </div>)
    }

    return (
        <div id="garden-page">
            <SideNav />
            <div id="garden-page-content">
                <TopNav 
                    currentUser={currentUser}
                    currentWorker={currentWorker}
                    setCurrentWorker={setCurrentWorker}
                    currentAvatar={currentAvatar}
                    setCurrentAvatar={setCurrentAvatar}
                />
                { focusedGarden ?
                    <div id="garden-list-content">
                        <GardenDetail />
                    </div>
                    :
                    <div id="garden-list-content">
                        {
                            creating ? 
                                <NewGardenForm />
                                :
                                <div id="gardens">
                                    <h1>Gardens</h1>
                                    {listGardens(gardens)}
                                </div>
                        }
                    </div>
                }

            </div>

        </div>
    )
}

export default GardenPage 