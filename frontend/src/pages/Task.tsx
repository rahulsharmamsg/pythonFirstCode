import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { TaskApiSchema, TaskFormData, TaskSchema } from "../common/types/task.schema";
import api from "../common/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Project } from "../common/types/task.schema";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { allProject } from "../store/ProjectList";
import { allUser } from "../store/UserList";
const CreateTask = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(TaskSchema)
  })
  const dispatch  = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [userList, setUserList] = useState<User[]>([])
  const [projectList, setProjectList] = useState<Project[]>([])
  const onSubmit = async (data: TaskFormData) => {
    try {
      const payload = TaskApiSchema.parse(data);
      const res = await api.post('/admin/add_task', payload)
      if (res.status === 200 || res.status === 201) {
        toast.success("Task assigned successful..");
        reset(); // ✅ form clear here
        navigate('/task')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.detail || "Registration failed")
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };
  const getUserToAssign = async () => {
    const user = await api.get('/admin/get_user')
    setUserList(user.data)
    dispatch(allUser(user.data))
  }
  const getProjectForUser = async () => {
    const user = await api.get('/admin/fetch_project')
    setProjectList(user.data)
    dispatch(allProject(user.data))

  }

  useEffect(() => {
    getUserToAssign()
    getProjectForUser()
  }, [])
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create & Assign Task
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Task Title */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            {...register("title")}
            placeholder="Enter task title"
            className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500
          ${errors.title ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.title && (
            <span className="mt-1 text-xs text-red-500">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Project */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Project
          </label>
          <select
            {...register("project")}
            className={`border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500
          ${errors.project ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select Project</option>
            {projectList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.project_name}
              </option>
            ))}
          </select>
          {errors.project && (
            <span className="mt-1 text-xs text-red-500">
              {errors.project.message}
            </span>
          )}
        </div>

        {/* Assignee */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Assign To
          </label>
          <select
            {...register("assignee")}
            className={`border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500
          ${errors.assignee ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select User</option>
            {userList.map((u) => (
              <option key={u.id} value={u.id}>
                {u.userName}
              </option>
            ))}
          </select>
          {errors.assignee && (
            <span className="mt-1 text-xs text-red-500">
              {errors.assignee.message}
            </span>
          )}
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            {...register("priority")}
            className={`border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500
          ${errors.priority ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <span className="mt-1 text-xs text-red-500">
              {errors.priority.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium
          hover:bg-green-700 transition duration-200"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>

  );
};

export default CreateTask;
