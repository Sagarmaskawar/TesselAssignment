import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../hooks/TaskContext";
import type { TaskStatus } from "../../hooks/types";
import { TextField} from "@mui/material";
import { Select, MenuItem, ListItemText } from "@mui/material";

const statusLabels: Record<string, string> = {
  Pending: "Pending",
  "In Progress": "In Progress",
  Completed: "Completed",
};

export default function EditPage() {
  const { tasks, updateTask } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("Pending");

  useEffect(() => {
    if (!id) return;
    const taskId = parseInt(id);
    let found: any;
    for (const key of Object.keys(tasks) as TaskStatus[]) {
      found = tasks[key].find(t => t.id === taskId);
      if (found) break;
    }
    if (found) {
      setTitle(found.title);
      setDescription(found.description);
      setStatus(found.status);
    }
  }, [id, tasks]);

  const handleUpdate = () => {
    if (!id) return;
    updateTask(parseInt(id), title, description, status);
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <TextField fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} margin="normal" />
      <TextField
        fullWidth
        label="Description"
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
         <button className="add-button"  onClick={handleUpdate} >
          Update
        </button>
        </div>
    </div>
  );
}
