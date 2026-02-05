import "./ListView.css";
import { Calendar, User, Pencil, Trash2 } from 'lucide-react';

function ListView({ tasks, onEdit, onDelete }) {
  return (
    <div className="list-container">
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assignee</th>
            <th>Due Date</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              {/* Task */}
              <td>
                <strong>{task.title}</strong>
                <p className="small">{task.description}</p>
              </td>

              {/* Status */}
              <td>
                <span
                  className={`badge ${task.status.toLowerCase().replace(" ", "-")}`}
                >
                  {task.status}
                </span>

              </td>

              {/* Priority */}
              <td>
                <span
                  className={`badge priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>

              </td>

              {/* Assignee */}
              <td>
                <User size={15} /> {task.assignee}
              </td>

              {/* Date */}
              <td>
                <Calendar size={15} />
                {task.dueDate || "-"}
              </td>

              {/* Tags */}
              <td>
                {task.tags.length > 0
                  ? task.tags.map(tag => (
                      <span key={tag} className="tag-chip">
                        {tag}
                      </span>
                    ))
                  : "-"}
              </td>

                {/* Actions */}
                <td className="actions-cell">
                    <button
                        className="edit-btn"
                        onClick={() => onEdit(task)}
                    >
                        <Pencil size={17}className="edit-btn" />
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => onDelete(task.id)}
                    >
                        <Trash2 size={17} className="delete-btn" />
                    </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListView;
