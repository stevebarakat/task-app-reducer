import { v4 as uuidv4 } from 'uuid';
import { findIndex } from 'lodash';

export default function tasksReducer(state, action) {
  switch(action.type) {
    case "ADD_TASK":
      const newTask = {
        id: uuidv4(),
        text: action.payload,
        complete: false
      }
      const addedTasks = [...state.tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(addedTasks))
      return {
        ...state,
        tasks: addedTasks
      }
    case "SET_CURRENT_TASK":
      return {
        ...state,
        currentTask: action.payload
      }
    case "TOGGLE_TASK":
      const toggledTasks = state.tasks.map(task => 
        task.id === action.payload.id ? 
        { ...action.payload, complete: !action.payload.complete } :
        task  
        )
        localStorage.setItem('tasks', JSON.stringify(toggledTasks))
        return {
          ...state,
          tasks: toggledTasks
        }
    case "UPDATE_TASK":
      const tempTasks = state.tasks;
      const id = state.currentTask.id;
      const taskIndex = findIndex(state.tasks, { id });
      tempTasks[taskIndex].text = action.payload;
      localStorage.setItem('tasks', JSON.stringify(tempTasks))
      return{
        ...state,
        currentTask: [],
        tasks: tempTasks
      }
    case "REMOVE_TASK":
      const filteredTasks = state.tasks.filter(task => task.id !== action.payload.id);
      localStorage.setItem('tasks', JSON.stringify(filteredTasks));
      return {
        ...state,
        tasks: filteredTasks
      }
    default:
      return state;
  }
}