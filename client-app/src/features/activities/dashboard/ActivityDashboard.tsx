import React from "react";
import { Activity } from "../../../app/models/activity";
import { Grid, List } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;

  // Function should Specify Parametes and Return type

  selectActivity: (id: string) => void;
  cancelselectedActivity: () => void;

  editMode: boolean;

  OpenForm: (id: string) => void;
  CloseForm: () => void;
  CreateOrEditing: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default function ActivityDashboard({
  activities,
  selectedActivity,
  selectActivity,
  cancelselectedActivity,
  editMode,
  OpenForm,
  CloseForm,
  CreateOrEditing,
  deleteActivity,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        {/* List of All Activities in DB  */}

        <ActivityList
          activities={activities}
          selectActivity={selectActivity}
          deleteActivity={deleteActivity}
          submitting={submitting}
        />
      </Grid.Column>

      <Grid.Column width="6">
        {/* Activity Data which in Card Will show when Selected */}
        {/* Activity which Selected Will be shown */}

        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelselectedActivity={cancelselectedActivity}
            OpenForm={OpenForm}
          />
        )}

        {/* Add New Activity */}

        {editMode && (
          <ActivityForm
            CloseForm={CloseForm}
            activity={selectedActivity}
            CreateOrEditing={CreateOrEditing}
            submitting = {submitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
