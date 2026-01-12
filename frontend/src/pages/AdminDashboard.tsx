import { useEffect, useState } from "react";
import AddProject from "./CreateProject"
import CreateTask from "./Task"
import axios from "axios";
import api from "../common/axiosInstance";
type Task = {
  id: number;
  title: string;
  project: string;
  assignedTo: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
};

const dummyTasks: Task[] = [
  {
    id: 1,
    title: "Design Landing Page",
    project: "Website Redesign",
    assignedTo: "Rahul",
    status: "in-progress",
    priority: "high",
  },
  {
    id: 2,
    title: "Fix Login Bug",
    project: "Website Redesign",
    assignedTo: "Amit",
    status: "pending",
    priority: "medium",
  },
  {
    id: 3,
    title: "Push Notifications",
    project: "Mobile App",
    assignedTo: "Neha",
    status: "completed",
    priority: "high",
  },
];
const AdminDashboard = ()=>{
     const [search, setSearch] = useState("");

  const filteredTasks = dummyTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.project.toLowerCase().includes(search.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(search.toLowerCase())
  );
const getDashbordData = async()=>{
const res = await api.get('/');
console.log(res)
}
  useEffect(()=>{
getDashbordData()
  },[])
    return(<>
   <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Task Assignment</h2>

        <input
          type="text"
          placeholder="Search task / project / user"
          className="border px-3 py-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Task</th>
              <th className="border px-4 py-2 text-left">Project</th>
              <th className="border px-4 py-2 text-left">Assigned To</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Priority</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No tasks found
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{task.title}</td>
                  <td className="border px-4 py-2">{task.project}</td>
                  <td className="border px-4 py-2">{task.assignedTo}</td>

                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        task.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : task.status === "in-progress"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        task.priority === "high"
                          ? "bg-red-200 text-red-800"
                          : task.priority === "medium"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="border px-4 py-2 text-center space-x-2">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>)
}

export default AdminDashboard