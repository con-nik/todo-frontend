import React from 'react';
import Task from '../components/Task';

const Tasks = ({ tasks, onDelete, onSelect }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </>
  );
};

export default Tasks;
