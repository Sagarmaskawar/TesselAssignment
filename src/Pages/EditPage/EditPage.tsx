import { useState,  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../../hooks/TaskContext";
import type { TaskStatus } from "../../hooks/types";
import { TextareaAutosize, TextField } from "@mui/material";
import { Select, MenuItem, ListItemText } from "@mui/material";
import "./edit.css";
const statusLabels: Record<string, string> = {
  Pending: "Pending",
  "In Progress": "In Progress",
  Completed: "Completed",
};

export default function EditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tasks, updateTask } = useTasks();

  const allTasks = Object.values(tasks).flat();
  const taskToEdit = allTasks.find((t) => t.id === Number(id));

  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [status, setStatus] = useState<TaskStatus>(
    taskToEdit?.status || "Pending"
  );

  //   useEffect(() => {
  //     if (!taskToEdit) navigate("/");
  //   }, [taskToEdit]);

  const handleUpdate = () => {
    if (!taskToEdit) return;
    updateTask({ ...taskToEdit, title, description, status });
    navigate("/");
  };

  return (
    <div className="editPageContainer">
      <TextField
        variant="outlined"
        placeholder="Enter the title "
        fullWidth
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <TextareaAutosize
        minRows={4}
        style={{ width: "96%", marginTop: 20, padding: 10 }}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        aria-label="empty textarea"
        placeholder="Enter the description"
      />
      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        fullWidth
        renderValue={(value) => (
          <div className="select-value">
            <span
              className={
                value === "In Progress"
                  ? "inprogesss-circle"
                  : value === "Completed"
                  ? "Completed-circle"
                  : "pending-circle"
              }
            ></span>
            <span className="select-text">
              {statusLabels[value as TaskStatus]}
            </span>
          </div>
        )}
      >
        <MenuItem value="Pending">
          <span className="Pending-circle" />
          <ListItemText>Pending</ListItemText>
        </MenuItem>
        <MenuItem value="In Progress">
          <span className="inprogess-circle" />
          <ListItemText>In Progress</ListItemText>
        </MenuItem>
        <MenuItem value="Completed">
          <span className="Completed-circle" />
          <ListItemText>Completed</ListItemText>
        </MenuItem>
      </Select>
      <div className="button-container">
        <button className="cancel-button" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button className="add-button" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}
