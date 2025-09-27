import React, { createContext, useState, useContext, useEffect } from "react";
import type { Task, TaskStatus, TaskState } from "./types";

interface TaskContextType {
  tasks: TaskState;
  addTask: (title: string, description: string, status: TaskStatus) => void;
  updateTask: (id: number, title: string, description: string, status: TaskStatus) => void;
  deleteTask: (id: number) => void;
}

const defaultTasks: TaskState = {
  Pending: [],
  "In Progress": [],
  Completed: [],
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskState>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string, status: TaskStatus) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => ({ ...prev, [status]: [...prev[status], newTask] }));
  };

  const updateTask = (id: number, title: string, description: string, status: TaskStatus) => {
    setTasks(prev => {
      // Remove the task from its previous status
      const updated: TaskState = {
        Pending: prev.Pending.filter(t => t.id !== id),
        "In Progress": prev["In Progress"].filter(t => t.id !== id),
        Completed: prev.Completed.filter(t => t.id !== id),
      };

      // Add the updated task to the new status
      const updatedTask: Task = { id, title, description, status, createdAt: new Date().toISOString() };
      updated[status] = [...updated[status], updatedTask];

      return updated;
    });
  };

  const deleteTask = (id: number) => {
    setTasks(prev => ({
      Pending: prev.Pending.filter(t => t.id !== id),
      "In Progress": prev["In Progress"].filter(t => t.id !== id),
      Completed: prev.Completed.filter(t => t.id !== id),
    }));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used inside TaskProvider");
  return context;
};
