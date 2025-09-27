import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../hooks/TaskContext";
import type { TaskStatus } from "../../hooks/types";
import { TextField} from "@mui/material";
import "./Add.css"
import { Select, MenuItem, ListItemText } from "@mui/material";

const statusLabels: Record<string, string> = {
  Pending: "Pending",
  "In Progress": "In Progress",
  Completed: "Completed",
};

export default function AddPage() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("Pending");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!title) return;
    addTask(title, description, status);
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <TextField fullWidth placeholder="Enter the title" value={title} onChange={e => setTitle(e.target.value)} margin="normal" />
      <TextField
        fullWidth
        placeholder="Enter the description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        multiline
        rows={4}
        margin="normal"
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
      <div  className="button-container">
        <button className='cancel-button' onClick={() => navigate("/")}>
          Cancel
        </button>
         <button className="add-button"  onClick={handleAdd} >
          Add
        </button>
      </div>
    </div>
  );
}
