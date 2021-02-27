import React, { useContext, useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TasksContext from './context';
import tasksReducer from './reducer';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { firestore } from './firebase';
const db = firestore;

const App = () => {
  const initialState = useContext(TasksContext);
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  
  useEffect(() => {
    db.collection("taskList").doc("tasks").set(state)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }, [state])

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      <TaskForm />
      <TaskList />
    </TasksContext.Provider>
  );
};

ReactDOM.render( <App />, document.getElementById('root'));