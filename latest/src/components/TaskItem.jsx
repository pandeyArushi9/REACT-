import {
  Pencil,
  Trash2,
  CheckCircle2,
  Circle,
  RefreshCcw,
  XCircle,
} from "lucide-react";

const TaskItem = ({
  task,
  onEdit,
  onComplete,
  onUncomplete,
  onDelete,
  onRestore,
  onPermanentDelete,
}) => {
  const isDeleted = task.status === "deleted";
  const isCompleted = task.status === "completed";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`task-item glass-panel ${isCompleted ? "completed" : ""}`}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          {task.dueDate && (
            <span className="task-date">Due: {formatDate(task.dueDate)}</span>
          )}
        </div>
        {task.description && <p className="task-desc">{task.description}</p>}
      </div>

      <div className="task-actions">
        {!isDeleted && !isCompleted && (
          <>
            <button
              className="icon-btn btn-ghost"
              onClick={() => onComplete(task.id)}
              title="Complete"
            >
              <Circle size={20} className="icon-circle" />
            </button>
            <button
              className="icon-btn btn-ghost"
              onClick={() => onEdit(task)}
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              className="icon-btn btn-danger"
              onClick={() => onDelete(task.id)}
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}

        {isCompleted && !isDeleted && (
          <>
            <button
              className="icon-btn btn-success"
              onClick={() => onUncomplete(task.id)}
              title="Mark as Ongoing"
            >
              <CheckCircle2 size={20} />
            </button>
            <button
              className="icon-btn btn-danger"
              onClick={() => onDelete(task.id)}
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}

        {isDeleted && (
          <>
            <button
              className="icon-btn btn-primary"
              onClick={() => onRestore(task.id)}
              title="Restore"
            >
              <RefreshCcw size={18} />
            </button>
            <button
              className="icon-btn btn-danger"
              onClick={() => onPermanentDelete(task.id)}
              title="Permanently Delete"
            >
              <XCircle size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
