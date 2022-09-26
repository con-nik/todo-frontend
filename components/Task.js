const Task = ({ task, onDelete, onSelect }) => {
  return (
    <div
      className={`entBox${task.is_complete ? 'complete' : ''}`}
      onDoubleClick={() => onSelect(task.id)}
    >
      <p className='entNameText'>{task.description}</p>
      <div className='entBtns'>
        <button className='xBtn' onClick={() => onDelete(task.id)}>
          X
        </button>
      </div>
    </div>
  );
};

export default Task;
