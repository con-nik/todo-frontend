import React from 'react';
import { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [description, setDescription] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!description) {
      alert('Please provide a task!');
      return;
    }
    onAdd({ description });

    setDescription('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='addEntBox'>
        <p className='createText'>Add task</p>
        <input
          type='text'
          placeholder='Add task'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input className='addEntBtn' type='submit' value='Add' />
      </div>
    </form>
  );
};

export default AddTask;
