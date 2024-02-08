import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Button, Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  // What will happen when the App is Loaded

  useEffect(() => {
    // Will get Data From API

    axios.get("http://localhost:5000/api/activities").then((response) => {
      console.log(response);
      setActivities(response.data);
    });
  }, []); // that mean that we only do this once

  return (
    <div>
      <Header as="h2" icon="users" content="ReactActivities" />

      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
