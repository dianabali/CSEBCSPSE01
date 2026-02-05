import "./Navbar.css";
import { LayoutGrid, List } from 'lucide-react';

function Navbar({ onAddTask, view, setView }) {
  return (
    <nav className="navbar">
      {/* Left side: Title + slogan */}
      <div className="navbar-left">
        <h1 className="navbar-title">Task Management System</h1>
        <p className="navbar-slogan">Manage your development workflow</p>
      </div>

      {/* Right side: View switch + Add button */}
      <div className="navbar-right">
        {/* View switch */}
        <div className="view-switch">
          <button
            className={`switch-btn ${view === "board" ? "active" : ""}`}
            onClick={() => setView("board")}
          >
            <LayoutGrid size={18} />
            <span>Board</span>
          </button>

          <button
            className={`switch-btn ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
          >
            <List size={18} />
            <span>List</span>
          </button>
        </div>

        {/* Add new task */}
        <button className="add-task-btn" onClick={onAddTask}>
          + New Task
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
