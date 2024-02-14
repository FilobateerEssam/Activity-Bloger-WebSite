import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { Activity } from "../models/activity";

interface Props{

  OpenForm : () => void;
}

export default function NavBar({OpenForm}:Props) {
  return (
    // inverted for time line Color 
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo"  style={{marginRight: '10px'}} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button onClick={OpenForm} positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
