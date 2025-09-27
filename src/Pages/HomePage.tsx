import { useState } from "react";
import "./Home.css";
import addImg from "../assets/images/addtodoButton.svg";
import { useNavigate } from "react-router-dom";
import type { TaskStatus } from "../hooks/types";
import { useTasks } from "../hooks/TaskContext";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TaskList from "../Components/TaskList/TaskList";

const statuses: TaskStatus[] = ["Pending", "In Progress", "Completed"];

export default function HomePage() {
  const { tasks } = useTasks();
  const [activeTab, setActiveTab] = useState<TaskStatus | null>("Pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"All" | "Completed" | "Incomplete">("All");
  const navigate = useNavigate();

  const openTab = (status: TaskStatus) => setActiveTab(prev => (prev === status ? null : status));

  const getFilteredTasks = (status: TaskStatus) => {
    return tasks[status]?.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Completed" && task.status === "Completed") ||
        (filter === "Incomplete" && task.status !== "Completed");

      return matchesSearch && matchesFilter;
    }) || [];
  };

  return (
    <div className="homePageContainer">
      <TextField
        variant="outlined"
        placeholder="Search To-Do"
        fullWidth
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <div style={{ margin: "10px 0" }}>
        <select value={filter} onChange={e => setFilter(e.target.value as any)}>
          <option value="All">All</option>
          <option value="Incomplete">Incomplete</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="taskListsContainer">
        {statuses.map(status => (
          <TaskList
            key={status}
            status={status}
            count={getFilteredTasks(status).length}
            todos={getFilteredTasks(status)}
            openTab={openTab}
            isOpen={activeTab === status}
          />
        ))}
      </div>

      <div className="add-todo" onClick={() => navigate("/add")}>
        <img src={addImg} alt="Add" />
      </div>
    </div>
  );
}
