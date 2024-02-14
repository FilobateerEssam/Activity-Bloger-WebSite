import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  
  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedActivity,setselectedActivity] = useState<Activity | undefined>(undefined);
  
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
  return (

    // <> </> mean Fragment

    <>

      {/* Header  */}
      <NavBar />

      <Container style={{marginTop:'7em'}} >

        {/* using Props  */}

        < ActivityDashboard 
        activities = {activities}  
        selectedActivity = {selectedActivity}
        selectActivity = {handleSelectActivity}
        cancelselectedActivity = {handleCancelSelectActivity}
        />

      </Container>


    </>
  );
}

export default App;
