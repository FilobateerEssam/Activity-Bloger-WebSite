import React, { useEffect} from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponents from "./LoadingComponents";
import { useStore } from "../Stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  // What will happen when the App is Loaded

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]); // that mean that we only do this once

  if (activityStore.loadingInitial)
    return <LoadingComponents content="loading app" />;

  return (
    // <> </> mean Fragment

    <>
      {/* Header  */}
      <NavBar />

      <Container style={{ marginTop: "7em" }}>
        {/* using Props  */}

        <ActivityDashboard />
      </Container>
    </>
  );
}

// We Must Make Observation to App to make it work with Mobx
export default observer(App);
