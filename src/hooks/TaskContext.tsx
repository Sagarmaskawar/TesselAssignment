import React, { createContext, useState, useContext } from "react";
import type { Task, TaskState, TaskStatus } from "./types";

interface TaskContextType {
  tasks: TaskState;
  addTask: (title: string, description: string) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number, status: TaskStatus) => void;
  moveTask: (id: number, from: TaskStatus, to: TaskStatus) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<TaskState>({
    Pending: [
      
    ],
    "In Progress": [
      
    ],
    Completed: [
      
    ],
  });

  const addTask = (title: string, description: string) => {
     const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "short", // Wed
    day: "2-digit",  // 31
    month: "short",  // Jun
    year: "numeric", // 2024
  });
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: "Pending",
      createdAt: formattedDate,
    };
    setTasks((prev) => ({ ...prev, Pending: [...prev.Pending, newTask] }));
  };
  
  const updateTask = (updatedTask: Task) => {
    setTasks((prev) => {
      // Remove task from old status
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key as TaskStatus] = newState[key as TaskStatus].filter(
          (t) => t.id !== updatedTask.id
        );
      });
      // Add task to updated status
      newState[updatedTask.status].push(updatedTask);
      return newState;
    });
  };

  const deleteTask = (id: number, status: TaskStatus) => {
    setTasks((prev) => ({
      ...prev,
      [status]: prev[status].filter((t) => t.id !== id),
    }));
  };

  const moveTask = (id: number, from: TaskStatus, to: TaskStatus) => {
    setTasks((prev) => {
      const task = prev[from].find((t) => t.id === id);
      if (!task) return prev;
      return {
        ...prev,
        [from]: prev[from].filter((t) => t.id !== id),
        [to]: [...prev[to], { ...task, status: to }],
      };
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, deleteTask, moveTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside TaskProvider");
  return context;
};
