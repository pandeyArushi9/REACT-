import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import { Plus } from "lucide-react";

const HomePage = () => {
  const {
    getOngoingTasks,
    getScheduledTasks,
    getCompletedTasks,
    addTask,
    editTask,
    completeTask,
    uncompleteTask,
    deleteTask,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingTask) {
      editTask(editingTask.id, data);
    } else {
      addTask(data);
    }
  };

  const openNewTaskForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const renderTaskList = (tasks, emptyMessage) => {
    if (tasks.length === 0) {
      return <div className="empty-state">{emptyMessage}</div>;
    }
    return tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onEdit={handleEdit}
        onComplete={completeTask}
        onUncomplete={uncompleteTask}
        onDelete={deleteTask}
      />
    ));
  };

  return (
    <div className="page-container animate-slide-up">
      <header className="page-header">
        <div>
          <h1>Your Workspace</h1>
          <p className="subtitle">
            Manage your day with elegance and efficiency.
          </p>
        </div>
        <button className="btn btn-primary" onClick={openNewTaskForm}>
          <Plus size={20} /> Add New Task
        </button>
      </header>

      <div className="task-board">
        <section className="task-column">
          <h2>Ongoing</h2>
          <div className="task-list">
            {renderTaskList(getOngoingTasks(), "No ongoing tasks.")}
          </div>
        </section>

        <section className="task-column">
          <h2>Scheduled</h2>
          <div className="task-list">
            {renderTaskList(getScheduledTasks(), "No scheduled tasks.")}
          </div>
        </section>

        <section className="task-column">
          <h2>Completed</h2>
          <div className="task-list">
            {renderTaskList(getCompletedTasks(), "No completed tasks yet.")}
          </div>
        </section>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
      />
    </div>
  );
};

export default HomePage;
