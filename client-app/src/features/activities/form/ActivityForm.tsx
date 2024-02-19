import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from './../../../app/Stores/store';
import { observer } from "mobx-react-lite";


export default observer( function ActivityForm()
 {

  const {activityStore} = useStore();
  const {selectedActivity , closeForm , createActivity , updateActivity , loading} = activityStore;

  const initialState = selectedActivity ?? {

    // Id is "" Will use Guid to Give the Activity ID :
    
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {

    activity.id ? updateActivity(activity) : createActivity(activity);

  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    // take a Key name which hold the Property that we want to change and we made inside the interface
    // , value hold the chnage

    const { name, value } = event.target;

    // ... called ellipses way to loop over Existing Elements & tell that we want to change in activity
    // [name] mean will change in activity.title or activity.date or activity.city ....etc
    // : value mean with that value

    setActivity({ ...activity, [name]: value });
  }

  return (
    // use Cleaning when Buttons is out of the Form
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea 
        placeholder="Description"
        value={activity.description}
        name="description"
        onChange={handleInputChange}
        />
        <Form.Input placeholder="Category" 
        value={activity.category}
        name="category"
        onChange={handleInputChange}
        />
        <Form.Input type="date" placeholder="Date" 
        value={activity.date}
        name="date"
        onChange={handleInputChange}
        />
        <Form.Input placeholder="City" 
        value={activity.city}
        name="city"
        onChange={handleInputChange}
        />
        <Form.Input placeholder="Venue" 
        value={activity.venue}
        name="venue"
        onChange={handleInputChange}
        />
        <Button loading={loading} floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
)