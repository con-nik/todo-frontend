import React from 'react';
import { useState, useEffect } from 'react';
import Tasks from '../../../components/Tasks';
import AddTask from '../../../components/AddTask';

const task = ({ user }) => {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const getUserWithTasks = async () => {
      const userWithTasksFromServer = await fetchUserWithTasks();
      userWithTasksFromServer &&
        userWithTasksFromServer.map((u) => {
          setTodo(u.tasks);
        });
    };

    getUserWithTasks();
  }, []);

  const fetchUserWithTasks = async () => {
    const res = await fetch(
      'http://localhost:8000/api/user/' + [user.id] + '/task'
    );
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch('http://localhost:8000/api/task/' + id);
    const data = await res.json();
    return data;
  };

  const addTask = async (task) => {
    const res = await fetch(
      'http://localhost:8000/api/user/' + [user.id] + '/task',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task),
      }
    );

    const data = await res.json();
    setTodo([...todo, data]);
  };

  const selectTask = async (id) => {
    const taskToSelect = await fetchTask(id);
    const updTask = { ...taskToSelect, is_complete: !taskToSelect.is_complete };

    const res = await fetch('http://localhost:8000/api/task/' + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await fetchTask(id);

    setTodo(
      todo.map((task) =>
        task.id === id ? { ...task, is_complete: data.is_complete } : task
      )
    );
  };

  const deleteTask = async (id) => {
    await fetch('http://localhost:8000/api/task/' + id, {
      method: 'DELETE',
    });
    setTodo(todo.filter((user) => user.id !== id));
  };

  return (
    <>
      <h1 className='entList'>Welcome</h1>
      <AddTask onAdd={addTask} />
      {todo.length > 0 ? (
        <Tasks tasks={todo} onDelete={deleteTask} onSelect={selectTask} />
      ) : (
        <p className='noAddedText'>No task added!</p>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(
    'http://localhost:8000/api/user/' + context.params.id
  );

  const user = await res.json();

  return {
    props: {
      user,
    },
  };
};

export default task;
