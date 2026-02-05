import { useMemo } from "react";
import "./FilterBar.css";
import { Filter, X } from 'lucide-react';

function FilterBar({
  tasks,
  searchText,
  setSearchText,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  filterAssignee,
  setFilterAssignee,
  filterTag,
  setFilterTag,
}) {
  const allTags = Array.from(new Set(tasks.flatMap(task => task.tags)));

  const assignees = useMemo(() => {
    const unique = Array.from(
      new Set(tasks.map(t => t.assignee).filter(a => a && a !== ""))
    );
    return unique;
  }, [tasks]);

  const handleClearFilters = () => {
    setSearchText("");
    setFilterStatus("All Statuses");
    setFilterPriority("All Priorities");
    setFilterAssignee("All Assignees");
    setFilterTag("");
  };

  return (
    <div className="filter-bar">
      {/* Header */}
      <div className="filter-header">
        <div className="filter-left">
          <Filter className="filter-icon" />
          <h3>Filters</h3>
        </div>
        <button
          className="clear-filters-btn"
          onClick={handleClearFilters}
        >
          × Clear All
        </button>
      </div>

      {/* Filters row */}
      <div className="filter-row">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="filter-search"
        />

        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option>All Statuses</option>
          <option>Backlog</option>
          <option>To Do</option> 
          <option>In Progress</option>
          <option>Review</option>
          <option>Done</option>
        </select>

        <select
          value={filterPriority}
          onChange={e => setFilterPriority(e.target.value)}
          className="filter-select"
        >
          <option>All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          value={filterAssignee}
          onChange={e => setFilterAssignee(e.target.value)}
          className="filter-select"
        >
          <option>All Assignees</option>
          {assignees.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <hr />

      {/* Tags filter */}
      <div className="filter-tags-row">
        <p className="tags-label">TAGS</p>
        <div className="filter-tags">
          {allTags.map(tag => (
            <span
              key={tag}
              className={`tag ${filterTag === tag ? "active" : ""}`}
              onClick={() =>
                setFilterTag(prev => (prev === tag ? "" : tag))
              }
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}

export default FilterBar;
