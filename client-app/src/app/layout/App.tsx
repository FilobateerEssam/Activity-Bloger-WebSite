import React, { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../Api/agent";
import LoadingComponents from "./LoadingComponents";

function App() {
  // For Hold All Data From APi
  const [activities, setActivities] = useState<Activity[]>([]);

  // For Select Specific Activity
  const [selectedActivity, setselectedActivity] = useState<
    Activity | undefined
  >(undefined);

  // For Edit Specific Activity
  const [EditMode, setEditMode] = useState(false);

  // for Loading
  const [loading, setLoading] = useState(true);

  // For Submitting
  const [Submitting, setSubmitting] = useState(false);

  // What will happen when the App is Loaded

  useEffect(() => {
    // Will get Data From API

    agent.Activities.list().then((response) => {
      // Edit the Date before loading

      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });
      setActivities(response);
      setLoading(false);
    });
  }, []); // that mean that we only do this once

  function handleSelectActivity(id: string) {
    setselectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectActivity() {
    setselectedActivity(undefined);
  }

  // Form Will Used For Create & Edit Activity
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditingactivity(activity: Activity) {
    setSubmitting(true);

    // check if activity is already Exist by Id Will Edit it
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setselectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
    // if we don't already have will create a new activity with Auto Generate id
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setselectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  function handleDeleteActivity(id: string) {

    setSubmitting(true);

    agent.Activities.delete(id).then(() => {
      
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);

    });
  }

  if (loading) return <LoadingComponents content="loading app" />;

  return (
    // <> </> mean Fragment

    <>
      {/* Header  */}
      <NavBar OpenForm={handleFormOpen} />

      <Container style={{ marginTop: "7em" }}>
        {/* using Props  */}

        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelselectedActivity={handleCancelSelectActivity}
          editMode={EditMode}
          OpenForm={handleFormOpen}
          CloseForm={handleFormClose}
          CreateOrEditing={handleCreateOrEditingactivity}
          deleteActivity={handleDeleteActivity}
          submitting={Submitting}
        />
      </Container>
    </>
  );
}

export default App;
