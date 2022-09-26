import { useState } from 'react';

const AddUser = ({ onAdd }) => {
  const [username, setUsername] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      alert('Please provide a username!');
      return;
    }
    onAdd({ username });

    setUsername('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='addEntBox'>
        <p className='createText'>Create user</p>
        <input
          type='text'
          placeholder='Add username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input className='addEntBtn' type='submit' value='Add' />
      </div>
    </form>
  );
};

export default AddUser;
