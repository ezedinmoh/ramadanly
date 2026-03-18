import React from 'react';

function TaskCategory({ title, icon, tasks, completedIds, onToggle }) {
  return (
    <div className="task-category">
      <h3 className="category-title">
        <i className={icon}></i> {title}
      </h3>
      {tasks.map(task => {
        const isCompleted = completedIds.includes(task.id);
        return (
          <div 
            key={task.id}
            className={`task-item ${isCompleted ? 'completed' : ''}`}
            onClick={() => onToggle(task.id)}
          >
            <div className="task-checkbox">
              {isCompleted && <i className="fa-solid fa-check"></i>}
            </div>
            <span className="task-text">{task.text}</span>
            <span className="task-badge">{task.type}</span>
          </div>
        );
      })}
    </div>
  );
}

export default TaskCategory;
