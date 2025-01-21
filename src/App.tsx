import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import { TaskProvider } from './TaskContext/TaskContext';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <Router>
        <nav>
          <Link to="/">Dashboard</Link>
          <br></br>
          <Link to="/add-task">Add Task</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;
