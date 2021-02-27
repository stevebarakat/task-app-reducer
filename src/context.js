import React from 'react';
import { firestore } from './firebase';
const db = firestore;
const docRef = db.collection("taskList").doc("tasks");

const taskList = docRef.get().then((doc) => {
  if (doc.exists) {
      console.log("Document data:", doc.data());
      return doc.data();
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});

console.log(taskList);

const TasksContext = React.createContext({
  // tasks: JSON.parse(localStorage.getItem('tasks')) ?? [
  tasks: taskList ?? [
    { id: 1, text: "Eat Breakfast", complete: false },
    { id: 2, text: "Do Laundry", complete: false },
    { id: 3, text: "Finish Project", complete: true },
  ]
})

export default TasksContext;