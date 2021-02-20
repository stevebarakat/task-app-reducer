import React, { useState, useContext } from 'react';
import TasksContext from '../context'

const TaskForm = () => {
  const [task, setTask] = useState("");
  const { dispatch } = useContext(TasksContext);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({type: "ADD_TASK", payload: task})
    setTask("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        required
      />
      <button type="submit">+</button>
    </form>
  )
}

export default TaskForm
