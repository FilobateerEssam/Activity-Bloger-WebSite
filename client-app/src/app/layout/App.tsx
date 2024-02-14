import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  
  // For Hold All Data From APi
  const [activities, setActivities] = useState<Activity[]>([]);

  // For Select Specific Activity
  const [selectedActivity,setselectedActivity] = useState<Activity | undefined>(undefined);
  
  // For Edit Specific Activity
  const [EditMode , setEditMode] = useState(false);

  // What will happen when the App is Loaded

  useEffect(() => {
    // Will get Data From API

    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []); // that mean that we only do this once


function handleSelectActivity(id: string){

  setselectedActivity(activities.find(x => x.id === id));
}

function handleCancelSelectActivity(){
  setselectedActivity(undefined)
}

function handleFormOpen(id ? : string){

  id ? handleSelectActivity(id) : handleCancelSelectActivity();
  setEditMode(true);
}

function handleFormClose(){
  setEditMode(false);
}


  return (

    // <> </> mean Fragment

    <>

      {/* Header  */}
      <NavBar OpenForm = {handleFormOpen} />

      <Container style={{marginTop:'7em'}} >

        {/* using Props  */}

        < ActivityDashboard 
        activities = {activities}  
        selectedActivity = {selectedActivity}
        selectActivity = {handleSelectActivity}
        cancelselectedActivity = {handleCancelSelectActivity}
    
        editMode = {EditMode}
        OpenForm = {handleFormOpen}
        CloseForm = {handleFormClose}
        />

      </Container>


    </>
  );
}

export default App;
