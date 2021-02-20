import React from 'react';

const TasksContext = React.createContext({
  tasks: JSON.parse(localStorage.getItem('tasks')) ?? [
    { id: 1, text: "Eat Breakfast", complete: false },
    { id: 2, text: "Do Laundry", complete: false },
    { id: 3, text: "Finish Project", complete: true },
  ]
})

export default TasksContext;