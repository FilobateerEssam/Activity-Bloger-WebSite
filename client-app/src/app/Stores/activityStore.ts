import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../Api/agent";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  // title = 'Hello from Mobx!';

  // Alternative Way of List which is Map Key is id , value is Activity
  activityRegistery = new Map<string, Activity>();

  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

get ActivityByDate() {
  return Array.from(this.activityRegistery.values()).sort((a, b) => 
  Date.parse(a.date) - Date.parse(b.date));
}


  // Observe

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();

      activities.forEach((activity) => {
        // Edit the Date before loading
        activity.date = activity.date.split("T")[0];
        
        // Show the activities inside the Map 
        this.activityRegistery.set(activity.id , activity);

      });

      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);

      this.setLoadingInitial(false);
    }
  };

  // update Action Ouside Not From inside

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {

    // to Get the Specific Id
    this.selectedActivity = this.activityRegistery.get(id);

  };

  cancelselectedActivity = () => {
    this.selectedActivity = undefined;
  };

  // Optional ? id for ? if Create will not Entered Id , if Edit will entered Id
  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelselectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);

      runInAction(() => {
        this.activityRegistery.set(activity.id,activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);

      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {

    this.loading = true;
    try {
      await agent.Activities.update(activity);

      runInAction(() => {
        this.activityRegistery.set(activity.id,activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);

      runInAction(() => {
        this.loading = false;
      });
    }
  };

deleteActivity = async (id : string) => {
  this.loading = true;
  try {
    await agent.Activities.delete(id);

    runInAction(() => {
      this.activityRegistery.delete(id);
      if(this.selectedActivity?.id === id) this.cancelselectedActivity();
      this.loading = false;
    });
  } catch (error) {
    console.log(error);

    runInAction(() => {
      this.loading = false;
    });
  }
}

  // observe like that action.bound
  // setTitle(){
  //     this.title = this.title + '!';
  // }

  // OR observe like that action ONLY

  // setTitle = () => {
  //     this.title = this.title + '!';
  // }
}
