import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../../hooks/TaskContext";
import "./Add.css";
import { TextareaAutosize, TextField } from "@mui/material";


export default function AddPage() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!title) return alert("Title is required");
    addTask(title, description);
    navigate("/");
  };

  return (
    <div className="addPageContainer">
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
      <div className="button-container"> 
        <button className='cancel-button' onClick={() => navigate("/")}>Cancel</button>
      <button  className='add-button' onClick={handleAdd}>ADD</button>
      </div>
      
    </div>
  );
}
