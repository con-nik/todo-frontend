import React from 'react';
import { useState, useEffect } from 'react';
import Users from '../components/Users';
import AddUser from '../components/AddUser';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers();
      setUsers(usersFromServer);
    };

    getUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:8000/api/user');
    const data = await res.json();
    return data;
  };

  const addUser = async (user) => {
    const res = await fetch('http://localhost:8000/api/user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    setUsers([...users, data]);
  };

  const deleteUser = async (id) => {
    await fetch('http://localhost:8000/api/user/' + id, {
      method: 'DELETE',
    });
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h1 className='entList'>User list</h1>
      <AddUser onAdd={addUser} />
      <p className='allEntText'>All users:</p>
      {users.length > 0 ? (
        <Users users={users} onDelete={deleteUser} />
      ) : (
        <p className='noAddedText'>No user added!</p>
      )}
    </div>
  );
}
