import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity : Activity
    cancelselectedActivity : () => void;
    OpenForm : (id : string) => void;

}

export default function ActivityDetails({activity , cancelselectedActivity,OpenForm}: Props) {
  return (
    
    // fluid is used to Stretch the Card
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`}  />

      <Card.Content>
        <Card.Header>{activity.title} </Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
         <Button.Group widths='2'>
                <Button onClick={()=> OpenForm(activity.id) } basic color='blue' content='Edit' />
                <Button onClick={cancelselectedActivity} basic color='grey' content='Cancel' />
         </Button.Group>

      </Card.Content>
    </Card>
  );
}