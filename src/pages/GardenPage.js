import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createGarden,
  getOrgGardens,
  resetGardens,
} from "../features/garden/gardenSlice";
import Button from "@mui/material/Button";
import SideNav from "../components/SideNav";
import GardenDetail from "../components/GardenDetail";
import NewGardenForm from "../components/NewGardenForm";
import { updateOrgGardens } from "../features/authOrg/authOrgSlice";

const GardenPage = () => {
  const dispatch = useDispatch();

  const { organization } = useSelector((state) => state.authOrg);
  const { gardens, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.gardens
  );
  const orgGardens = organization.gardens;

  const [creating, setCreating] = useState(false);
  const [focusedGarden, setFocusedGarden] = useState(null);

  useEffect(() => {
    dispatch(getOrgGardens(orgGardens));

    if (isSuccess) {
      dispatch(updateOrgGardens(gardens));
      setCreating(false);
    }

    return () => {
      dispatch(resetGardens());
    };
  }, [gardens, orgGardens, isError, isSuccess, isLoading, message, dispatch]);

  const handleCreateGarden = async (gardenData) => {
    dispatch(createGarden(gardenData));
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
                {gardens.map((garden) => (
                  <div
                    onClick={() => setFocusedGarden(garden)}
                    className="garden-card"
                  >
                    <p>{garden.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GardenPage;
