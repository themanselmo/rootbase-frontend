import { useState } from "react";
import Button from "@mui/material/Button";
import SideNav from "./SideNav";
import GardenDetail from "./GardenDetail";
import NewGardenForm from "./NewGardenForm";
import { useSelector } from "react-redux";

const GardenPage = () => {
  const { organization } = useSelector((state) => state.authOrg);
  const [gardens, setGardens] = useState(organization.gardens);
  const [creating, setCreating] = useState(false);
  const [focusedGarden, setFocusedGarden] = useState(null);

  const listGardens = (gardens) => {
    console.log(gardens);
    return gardens.map((garden) => (
      <div onClick={() => setFocusedGarden(garden)} className="garden-card">
        <p>{garden.name}</p>
      </div>
    ));
  };

  const handleCreateGarden = (formData) => {
    fetch("/gardens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Created Garden:", data);
        setGardens([...gardens, data]);
      });
  };

  const handleCreating = () => setCreating(!creating);

  return (
    <div id="garden-page">
      <SideNav />
      <div id="garden-page-content">
        {focusedGarden ? (
          <div id="garden-list-content">
            <GardenDetail
              garden={focusedGarden}
              setFocusedGarden={setFocusedGarden}
            />
          </div>
        ) : (
          <div id="garden-list-content">
            <Button onClick={handleCreating}>New Garden</Button>
            {creating ? (
              <NewGardenForm
                handleCreateGarden={handleCreateGarden}
                gardens={gardens}
              />
            ) : (
              <div id="gardens">
                <h1 className="page-header">Gardens</h1>
                {listGardens(gardens)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GardenPage;
