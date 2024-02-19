import React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/Stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityDashboard() {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <Grid.Column width="10">
        {/* List of All Activities in DB  */}

        <ActivityList />
      </Grid.Column>

      <Grid.Column width="6">
        {/* Activity Data which in Card Will show when Selected */}
        {/* Activity which Selected Will be shown */}

        {selectedActivity && !editMode && <ActivityDetails />}

        {/* Add New Activity */}

        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
});
