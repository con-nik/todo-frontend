import Link from 'next/link';

const User = ({ user, onDelete }) => {
  return (
    <div className='entBox'>
      <p className='entNameText'>{user.username}</p>
      <div className='entBtns'>
        <Link href='task/[id]' as={'/task/' + user.id}>
          <button className='vTasksBtn'>View Tasks</button>
        </Link>
        <button className='xBtn' onClick={() => onDelete(user.id)}>
          X
        </button>
      </div>
    </div>
  );
};

export default User;
