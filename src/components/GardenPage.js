import { useState } from "react"
import Button from "@mui/material/Button"
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

    const handleCreateGarden = (formData) => {
        
        fetch('/gardens', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(data => {
            console.log("Created Garden:", data)
            setGardens([...gardens, data])
        })
    }

    const handleCreating = () => setCreating(!creating)

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
                        <Button onClick={handleCreating}>New Garden</Button>
                        {
                            creating ? 
                                <NewGardenForm 
                                    handleCreateGarden={handleCreateGarden} 
                                    gardens={gardens}
                                />
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