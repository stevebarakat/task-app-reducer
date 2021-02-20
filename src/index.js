import React, { useContext, useReducer, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { FirebaseAppProvider } from 'reactfire';
import TasksContext from './context';
import ErrorBoundary from './components/ErrorBoundary';
import tasksReducer from './reducer';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { firestore } from './firebase';
const db = firestore;

const firebaseConfig = {
  apiKey: "AIzaSyAr5rw-M8IAdUPJ1XFROZL98yKJ7P2_iuI",
  authDomain: "task-app-reducer.firebaseapp.com",
  projectId: "task-app-reducer",
  storageBucket: "task-app-reducer.appspot.com",
  messagingSenderId: "128813465750",
  appId: "1:128813465750:web:c89f10de87e33307b5c2b7"
};

const App = () => {
  const initialState = useContext(TasksContext);
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  db.collection("taskList").doc("tasks").set(state)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      <TaskForm />
      <TaskList />
    </TasksContext.Provider>
  );
};

ReactDOM.unstable_createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback="loading...">
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <App />
        </FirebaseAppProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);