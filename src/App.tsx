import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage";
import { TaskProvider } from "./hooks/TaskContext";
import AddPage from "./Pages/AddTask/AddPage";
import EditPage from "./Pages/EditPage/EditPage";

function App() {
  return (
     <TaskProvider>
    <Router>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </Router>
    </TaskProvider>
  );
}

export default App;
