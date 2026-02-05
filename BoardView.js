import "./BoardView.css";
import { Calendar, User, Pencil, Trash2 } from 'lucide-react';

const columns = ["Backlog", "To Do", "In Progress", "Review", "Done"];

function BoardView({ tasks, setTasks, onEdit, onDelete }) {
  const handleDrop = (e, status) => {
    const taskId = e.dataTransfer.getData("taskId");
    const updated = tasks.map(task =>
      task.id === Number(taskId) ? { ...task, status } : task
    );
    setTasks(updated);
  };

  return (
    <div className="board-container">
      {columns.map(col => {
        const columnTasks = tasks.filter(t => t.status === col);

        return (
          <div
            key={col}
            className={`board-column board-column-${col.toLowerCase().replace(" ", "-")}`}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop(e, col)}
          >

            {/* Column header */}
            <div className="column-header">
              <span>{col}</span>
              <span className="count">{columnTasks.length}</span>
            </div>

            {/* Tasks */}
            {columnTasks.map(task => (
            <div
                key={task.id}
                className="task-card"
                draggable
                onDragStart={e => e.dataTransfer.setData("taskId", task.id)}
            >
                {/* Title row with hover actions */}
                <div className="task-title-row">
                    <div className="task-title-bullet">
                        <span className={`bullet ${col.toLowerCase().replace(" ", "-")}`} />
                        <strong className="task-title">{task.title}</strong>
                    </div>

                    {/* Hover actions */}
                    <div className="task-actions">
                        <button
                            className="edit-btn"
                            onClick={() => onEdit(task)}
                        >
                            <Pencil size={15} className="edit-btn" />
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => onDelete(task.id)}
                        >
                            <Trash2 size={15} className="delete-btn" />
                        </button>
                    </div>
                </div>

                {/* Description */}
                <p className="task-desc">{task.description}</p>

                {/* Meta */}
                <div className="task-meta">
                <span>
                    <User size={15} /> {task.assignee}
                </span>
                <span>
                    <Calendar size={15} /> {task.dueDate || "-"}
                </span>
                </div>

                {/* Tags */}
                <div className="task-tags">
                {task.tags.map(tag => (
                    <span key={tag} className="tag-chip">
                    {tag}
                    </span>
                ))}
                </div>
            </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default BoardView;
