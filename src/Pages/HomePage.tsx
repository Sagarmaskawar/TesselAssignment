import { useState } from "react";
import "./Home.css";
import addImg from "../assets/images/addtodoButton.svg";
import { useNavigate } from "react-router-dom";
import type { TaskStatus } from "../hooks/types";
import { useTasks } from "../hooks/TaskContext";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskList from "../Components/TaskList/TaskList";

const statuses: TaskStatus[] = ["In Progress", "Pending", "Completed"];

export default function HomePage() {
  const { tasks } = useTasks();
  const [activeTab, setActiveTab] = useState<TaskStatus>("Pending");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const openTab = (status: TaskStatus) => {
    if (activeTab === status) {
      setActiveTab("none" as TaskStatus);
    } else {
      setActiveTab(status);
    }
  };

  return (
    <div className="homePageContainer">
      {/* Search Input */}
      <TextField
        variant="outlined"
        placeholder="Search To-Do"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Task Lists */}
      <div className="taskListsContainer">
        {statuses.map((status, index) => {
          // Filter tasks based on search term
          const filteredTasks = tasks[status]?.filter(
            (task) =>
              task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              task.description.toLowerCase().includes(searchTerm.toLowerCase())
          );

          return (
            <TaskList
              key={index}
              status={status}
              count={filteredTasks?.length || 0}
              todos={filteredTasks}
              openTab={openTab}
              isOpen={activeTab === status}
            />
          );
        })}
      </div>

      {/* Add Task Button */}
      <div className="add-todo" onClick={() => navigate("/add")}>
        <img src={addImg} alt="Add" />
      </div>
    </div>
  );
}
