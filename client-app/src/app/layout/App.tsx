import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Header, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  // What will happen when the App is Loaded

  useEffect(() => {
    // Will get Data From API

    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []); // that mean that we only do this once

  return (

    // <> </> mean Fragment
    
    <>

      {/* Header  */}
      <NavBar />

      <Container style={{marginTop:'7em'}} >

        <List>
          {activities.map((activity) => (
            <List.Item key={activity.id}>{activity.title}</List.Item>
          ))}
        </List>

      </Container>


    </>
  );
}

export default App;
