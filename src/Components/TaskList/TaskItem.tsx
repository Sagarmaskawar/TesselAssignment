import React from "react";
import type { Task } from "../../hooks/types";
import "./Task.css";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const firstLetter = task.title.charAt(0).toUpperCase();

  return (
    <div className="task-item">
      <div className="task-avatar">{firstLetter}</div>
      <div className="task-content">
        <h4 className={task.status === "Completed" ? "task-title completed" : "task-title"}>
          {task.title}
        </h4>
        <p className="task-desc">{task.description}</p>
      </div>
    </div>
  );
};

export default TaskItem;
