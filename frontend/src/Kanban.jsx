import { useState } from "react";

export default function Kanban() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Build Backend",
      tag: "API",
      member: "Anurag",
      dueDate: "2026-06-25",
      status: "todo",
    },
    {
      id: 2,
      title: "Create React UI",
      tag: "Frontend",
      member: "Anurag",
      dueDate: "2026-06-26",
      status: "progress",
    },
    {
      id: 3,
      title: "Testing",
      tag: "QA",
      member: "Anurag",
      dueDate: "2026-06-27",
      status: "done",
    },
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask,
        tag: "General",
        member: "Anurag",
        dueDate: "2026-06-30",
        status: "todo",
      },
    ]);

    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  const renderTasks = (status) =>
    tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div key={task.id} className="task-card">
          <h4>{task.title}</h4>

          <p>
            <strong>Tag:</strong> {task.tag}
          </p>

          <p>
            <strong>Member:</strong> {task.member}
          </p>

          <p>
            <strong>Due:</strong> {task.dueDate}
          </p>

          <div style={{ marginTop: "10px" }}>
            {status !== "todo" && (
              <button
                onClick={() =>
                  moveTask(task.id, "todo")
                }
              >
                ←
              </button>
            )}

            {status === "todo" && (
              <button
                onClick={() =>
                  moveTask(task.id, "progress")
                }
              >
                →
              </button>
            )}

            {status === "progress" && (
              <button
                onClick={() =>
                  moveTask(task.id, "done")
                }
              >
                ✓
              </button>
            )}

            <button
              onClick={() =>
                deleteTask(task.id)
              }
              style={{ marginLeft: "5px" }}
            >
              🗑
            </button>
          </div>
        </div>
      ));

  return (
    <div>
      <h2>📋 Kanban Board</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) =>
            setNewTask(e.target.value)
          }
        />

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="kanban-board">
        <div className="column">
          <h3>📌 To Do</h3>
          {renderTasks("todo")}
        </div>

        <div className="column">
          <h3>⚡ In Progress</h3>
          {renderTasks("progress")}
        </div>

        <div className="column">
          <h3>✅ Done</h3>
          {renderTasks("done")}
        </div>
      </div>
    </div>
  );
}