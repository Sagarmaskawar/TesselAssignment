import React from "react";
import upArrow from "../../assets/images/up_arrow.svg";
import downArrow from "../../assets/images/down_arrow.svg";
import editIcon from "../../assets/images/Pencil.svg";
import deleteIcon from "../../assets/images/Trash.svg";
import "./Task.css";
import type { TaskStatus } from "../../hooks/types";
import { useTasks } from "../../hooks/TaskContext";
import { useNavigate } from "react-router-dom";

interface TaskListProps {
  status: TaskStatus;
  count: number;
  todos?: any[];
  openTab: (status: TaskStatus) => void;
  isOpen: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  status,
  count,
  todos,
  openTab,
  isOpen,
}) => {
  const navigate = useNavigate();
  const { deleteTask } = useTasks();
  const [selected, setSelected] = React.useState<number | null>(null);

  const onDelete = (id: number) => {
    deleteTask(id);
  };

  return (
    <div className="task-list">
      <div className="task-list-header" onClick={() => openTab(status)}>
        <h3 className="heading-status">
          {status} <span className="span-count">({count})</span>
        </h3>
        <img
          src={isOpen ? upArrow : downArrow}
          alt="arrow"
          style={{ width: 15, height: 15, marginRight: 10 }}
        />
      </div>

      {isOpen &&
        todos &&
        todos.map((todo) => (
          <div
            className="task-item"
            key={todo.id}
            onClick={() => setSelected(todo.id)}
            style={selected === todo.id ? { background: "#F7F7F7" } : {}}
          >
            {/* Circle Avatar */}
            <div className="task-circle">{todo.title.charAt(0).toUpperCase()}</div>

            <div className="task-content">
              {/* Title + Status */}
              <div className="task-details">
                <h4 className="task-title">{todo.title}</h4>
                <div>
                  <div
                    className={
                      status === "In Progress"
                        ? "inprogesss-circle"
                        : status === "Completed"
                        ? "Completed-circle"
                        : "pending-circle"
                    }
                  ></div>
                  <span className="status-span">{status}</span>
                </div>
              </div>

              {/* Description */}
              <p className="task-desc">{todo.description}</p>

              {/* Footer: Created Date + Edit/Delete */}
              <div className="task-footer">
                <span className="created-at">{todo.createdAt}</span>
                {selected === todo.id && (
                  <div className="task-actions">
                    <img
                      src={editIcon}
                      alt="edit"
                      onClick={() => navigate(`/edit/${todo.id}`)}
                    />
                    <img
                      src={deleteIcon}
                      alt="delete"
                      style={{ marginLeft: 10 }}
                      onClick={() => onDelete(todo.id)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TaskList;
