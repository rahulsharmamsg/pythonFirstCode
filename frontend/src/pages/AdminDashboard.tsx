import { useEffect, useState } from "react";
import AddProject from "./CreateProject"
import CreateTask from "./Task"
import axios from "axios";
import api from "../common/axiosInstance";
import { toast } from "react-toastify";
import DeletePopup from "../popup/DeletePopup";
import EditTask from "../popup/EditTask";
import { Task } from "../common/types/task.schema";

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([])
  const [filteredTasks,setFilteredTasks] = useState<Task[]>([])
  const [deletePopup,setDeletePopup] = useState(false)
  const [editPopup,setEditPopup] = useState(false)
  const [editData,setEditData] = useState<Task | null>(null)
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
const searchTask = ()=>{
  const filteredTasksNew = taskList.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.project.project_name.toLowerCase().includes(search.toLowerCase()) ||
      task.user.userName.toLowerCase().includes(search.toLowerCase())
  );
  setFilteredTasks(filteredTasksNew)
}
  const getDashbordData = async () => {
    try {
      const res = await api.get('/admin/fetch_task');
      if (res.status == 200 || res.status == 201) {
        setTaskList(res.data)
        setFilteredTasks(res.data)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail || "Registration failed")
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  }
  const handleDelete = async()=>{
 try {
  if (!selectedTaskId) return 
      const res = await api.delete(`/admin/delete_task/${selectedTaskId}`);
      if (res.status == 200 || res.status == 201) {
      toast.success("Task deleted successfully");
       setTaskList(prev => prev.filter(t => t.id !== selectedTaskId));
       setFilteredTasks(prev => prev.filter(t => t.id !== selectedTaskId));
       setDeletePopup(false)
       setSelectedTaskId(null);
      }
     
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail || "Registration failed")
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  }
  const checkDelete = (task_id:number)=>{
    setSelectedTaskId(task_id);
    setDeletePopup(true)
  }
  const cancelDelete = ()=>{
      setDeletePopup(false)
      setSelectedTaskId(null);
  }

  const updateTaskInState = (updateTask:Task)=>{
console.log(updateTask,'Update Task>> parent')
       setTaskList(prev => prev.map(task => task.id == updateTask.id ? updateTask :task));
       setFilteredTasks(prev => prev.map(task => task.id == updateTask.id ? updateTask :task));
  }
  const onClose = ()=>{
    setEditPopup(false)
  }
  const handleEdit = (task:Task)=>{
setEditPopup(true)
setEditData(task)
  }
  useEffect(()=>{
searchTask()
  },[search])
  useEffect(() => {
    getDashbordData()
  }, [])
  return (<>
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
                  <td className="border px-4 py-2">{task.project.project_name}</td>
                  <td className="border px-4 py-2">{task.user.userName}</td>

                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${task.status === "completed"
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
                      className={`px-2 py-1 rounded text-sm ${task.priority === "high"
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
                    <button className="text-blue-600 hover:underline" onClick={()=>handleEdit(task)}>
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline" onClick={()=>checkDelete(task.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
{deletePopup && (
  <DeletePopup
    cancelDelete={cancelDelete}
    handleDelete={handleDelete}
  />
)}
{editPopup && editData && (
  <EditTask editdata={editData} onClose={onClose} updateTaskInState={updateTaskInState} />
)}
     
    </div>
  </>)
}

export default AdminDashboard