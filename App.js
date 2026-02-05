import './App.css';
import { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import AddTaskForm from './components/AddTaskForm';
import FilterBar from "./components/FilterBar";
import BoardView from "./components/BoardView";
import ListView from "./components/ListView";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState("board");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [assignees, setAssignees] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const unique = Array.from(
      new Set(tasks.map(t => t.assignee).filter(a => a && a !== ""))
    );
    setAssignees(unique);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [filterPriority, setFilterPriority] = useState("All Priorities");
  const [filterAssignee, setFilterAssignee] = useState("All Assignees");
  const [filterTag, setFilterTag] = useState("");

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // 1️⃣ Search text: starts-with for title or description
      const matchesSearch =
        searchText === "" ||
        task.title.toLowerCase().startsWith(searchText.toLowerCase()) ||
        task.description.toLowerCase().startsWith(searchText.toLowerCase());

      // 2️⃣ Status filter
      const matchesStatus =
        filterStatus === "All Statuses" || task.status === filterStatus;

      // 3️⃣ Priority filter
      const matchesPriority =
        filterPriority === "All Priorities" || task.priority === filterPriority;

      // 4️⃣ Assignee filter
      const matchesAssignee =
        filterAssignee === "All Assignees" || task.assignee === filterAssignee;

      // 5️⃣ Tag filter
      const matchesTag =
        filterTag === "" || task.tags.includes(filterTag);

      // ✅ STRICT AND: must match ALL filters
      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesAssignee &&
        matchesTag
      );
    });
  }, [tasks, searchText, filterStatus, filterPriority, filterAssignee, filterTag]);

  return (
    <div>
      <Navbar
        onAddTask={() => setShowForm(true)}
        view={view}
        setView={setView}
      />

      <div className="main-container">
        <FilterBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          filterAssignee={filterAssignee}
          setFilterAssignee={setFilterAssignee}
          filterTag={filterTag}
          setFilterTag={setFilterTag}
          tasks={tasks}
        />

        {view === "board" ? (
          <BoardView
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            setTasks={setTasks}
          />
        ) : (
          <ListView
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        )}
      </div>   

      {showForm && (
        <AddTaskForm
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          onAddTask={(task) => setTasks(prev => [...prev, task])}
          onEditTask={(updatedTask) => {
            setTasks(prev =>
              prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
            ); 
            setShowForm(false);
            setEditingTask(null);
          }}
          assignees={assignees}
          editingTask={editingTask}
        />
      )}
    </div>
  );
}

export default App;
