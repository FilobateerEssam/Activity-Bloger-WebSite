import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/Stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityList() {
  
  const { activityStore } = useStore();
  const { deleteActivity , activityRegistery , ActivityByDate , loading } = activityStore;

  const [target, settarget] = useState("");

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    settarget(e.currentTarget.name);
    deleteActivity(id);
  }


  return (
    <Segment>
      <Item.Group divided>
        {ActivityByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => activityStore.selectActivity(activity.id)}
                  floated="right"
                  content="view"
                  color="blue"
                />

                <Button
                  // will use a name to different between actual activity
                  name={activity.id}
                  loading={loading && target === activity.id}
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />

                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
