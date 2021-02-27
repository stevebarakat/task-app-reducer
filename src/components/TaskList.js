import React, { useContext } from 'react';
import TasksContext from '../context';

const TaskList = () => {
  const { state, dispatch } = useContext(TasksContext);
  
  return (
    <ul>
      {state.tasks.map(task => (
        <li key={task.id}>
        <input 
          type="checkbox" 
          onChange={() => dispatch({ type: "TOGGLE_TASK", payload: task })}
          checked={task.complete ? true : false }
        />
          <span
            contentEditable
            suppressContentEditableWarning
            onFocus={() => dispatch({ type: "SET_CURRENT_TASK", payload: task })}
            onBlur={e => dispatch({ type: "UPDATE_TASK", payload: e.currentTarget.innerText })}
            style={{ textDecoration: task.complete && "line-through" }}
          >{task.text}</span> {" "}
          <button
            onClick={() => dispatch({ type: "REMOVE_TASK", payload: task })}
          >x</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
