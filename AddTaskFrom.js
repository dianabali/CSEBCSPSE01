import { useState } from "react";
import "./AddTaskForm.css";

function AddTaskForm({ onClose, onAddTask, onEditTask, editingTask, assignees }) {
    const [title, setTitle] = useState(editingTask ? editingTask.title : "");
    const [description, setDescription] = useState(editingTask ? editingTask.description : "");
    const [status, setStatus] = useState(editingTask ? editingTask.status : "To Do");
    const [priority, setPriority] = useState(editingTask ? editingTask.priority : "Low");
    const [assignee, setAssignee] = useState(editingTask ? editingTask.assignee : "");
    const [showAssignees, setShowAssignees] = useState(false);
    const [dueDate, setDueDate] = useState(editingTask ? editingTask.dueDate : "");
    const [tags, setTags] = useState(editingTask ? editingTask.tags.join(", ") : "");


const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
        id: editingTask ? editingTask.id : Date.now(),
        title,
        description,
        status,
        priority,
        assignee,
        dueDate,
        tags: tags.split(",").map(t => t.trim()).filter(t => t !== ""),
    };

    if (editingTask) {
        onEditTask(newTask);
    } else {
        onAddTask(newTask);
        onClose();
    }
};


return (
    <div className="form-overlay">
    <div className="task-form">

        {/* Sticky header */}
        <div className="form-header">
        <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>
        </div>

        <form className="form-body" onSubmit={handleSubmit}>

        {/* Title */}
        <div className="form-group">
            <label>Title *</label>
            <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            />
        </div>

        {/* Description */}
        <div className="form-group">
            <label>Description *</label>
            <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="4"
            required
            />
        </div>

        {/* Status + Priority */}
        <div className="form-row">
            <div className="form-group">
            <label>Status *</label>
            <select value={status} onChange={e => setStatus(e.target.value)} required>
                <option value="">Select status</option>
                <option>Backlog</option>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Done</option>
            </select>
            </div>

            <div className="form-group">
            <label>Priority *</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} required>
                <option value="">Select priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            </div>
        </div>

        {/* Assignee + Date */}
        <div className="form-row">
            <div className="form-group assignee-field">
                <label>Assignee *</label>

                <input
                    type="text"
                    placeholder="Assign to..."
                    value={assignee}
                    onChange={e => setAssignee(e.target.value)}
                    onFocus={() => setShowAssignees(true)}
                    onBlur={() => setTimeout(() => setShowAssignees(false), 150)}
                    className="assignee-input"
                    required
                />

                {showAssignees && assignees.length > 0 && (
                    <div className="assignee-dropdown">
                    {assignees
                        .filter(name =>
                        name.toLowerCase().includes(assignee.toLowerCase())
                        )
                        .map(name => (
                        <div
                            key={name}
                            className="assignee-option"
                            onClick={() => {
                            setAssignee(name);
                            setShowAssignees(false);
                            }}
                        >
                            <i className="fas fa-user"></i> {name}
                        </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="form-group">
            <label>Due Date</label>
            <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
            />
            </div>
        </div>

        {/* Tags */}
        <div className="form-group">
            <label>Tags</label>
            <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="bug, frontend, urgent"
            />
        </div>

        <hr />

        {/* Buttons */}
        <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
            </button>
            <button type="submit" className="add-btn">
                {editingTask ? "Save Changes" : "Add Task"}
            </button>
        </div>
        </form>
    </div>
    </div>
);
}

export default AddTaskForm;
