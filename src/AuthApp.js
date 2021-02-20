import React, { useState, useEffect, useCallback } from 'react';
import { useFirestore, useUser } from 'reactfire';
import Layout from './components/Layout';
import { findIndex } from 'lodash';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskList/TaskForm';
import FilterTasks from './components/TaskList/FilterTasks';
import useUpdateLocalState from './hooks/useUpdateLocalState';
import initialTasks from './initialTasks';

function AuthApp({ logOutUser }) {
  const user = useUser();
  const db = useFirestore();
  const localStorageRef = JSON.parse(localStorage.getItem(user.uid));
  const docRef = db.collection('tasklist').doc(user.uid);

  const initialTaskList = () => {
    try {
      return localStorageRef?.taskList ?? initialTasks;
    } catch {
      console.error('The tasks are having issues parsing into JSON.');
      return initialTasks;
    }
  };

  const [taskList, setTaskList] = useState(initialTaskList);
  const [searchTerm, setSearchTerm] = useState("");
  const initialFilterType = () => localStorageRef?.filterType ?? 'all';
  const [filterType, setFilterType] = useState(initialFilterType);

  const handleSetFilterType = (type) => {
    setFilterType(type);
  };

  const handleSetTaskList = useCallback((tasks) => {
    setTaskList(tasks);
  }, []);

  const handleSetSearchTerm = (term) => {
    setSearchTerm(term);
  };

  useUpdateLocalState(db, user, handleSetTaskList);

  useEffect(() => {
    setTaskList(taskList);
    localStorage.setItem(user.uid,
      JSON.stringify({
        filterType,
        taskList
      }));
  }, [taskList, filterType, user.uid]);

  function updateTask(newValue, id, valueToUpdate) {
    for (let i = 0; i < valueToUpdate.length; i++) {
      const tempTasks = taskList;
      const taskIndex = findIndex(taskList, { id });
      tempTasks[taskIndex][valueToUpdate] = newValue[i];
      setTaskList(tempTasks);
      docRef.update({ tasks: taskList });
    }
  };

  function updateTaskList(filteredTasks) {
    (async () => {
      await docRef.update({ tasks: filteredTasks });
    })();
    setTaskList([...filteredTasks]);
  };

  async function deleteTask(index) {
    setTaskList(await taskList.filter((_, i) => i !== index));
    await docRef.update({ tasks: taskList.filter((_, i) => i !== index) });
  };

  return (
    <Layout logOutUser={logOutUser} user={user}>
      <TaskForm taskList={taskList} searchTerm={searchTerm} handleSetSearchTerm={handleSetSearchTerm} />
      <FilterTasks
        filterType={filterType}
        handleSetFilterType={handleSetFilterType}
      />
      <TaskList
        searchTerm={searchTerm}
        taskList={taskList}
        deleteTask={deleteTask}
        updateTaskList={updateTaskList}
        handleSetTaskList={handleSetTaskList}
        handleSetFilterType={handleSetFilterType}
        filterType={filterType}
        updateTask={updateTask}
      />
    </Layout>
  );
}

export default AuthApp;
