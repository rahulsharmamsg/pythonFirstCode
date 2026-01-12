// src/components/CreateTask.tsx
import { useState } from "react";

const users = ["Rahul", "Amit", "Neha"];
const projects = ["Website Redesign", "Mobile App"];

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, project, assignee, priority });
    alert("Task Created & Assigned (Dummy)");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Create & Assign Task</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Task Title"
          className="border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          className="border rounded px-3 py-2"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          required
        >
          <option value="">Select Project</option>
          {projects.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          required
        >
          <option value="">Assign To</option>
          {users.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button className="md:col-span-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
