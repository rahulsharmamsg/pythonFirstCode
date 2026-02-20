// components/SessionExpiredModal.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditTaskSchema, Task, TaskEditApiSchema, TaskEditFormData } from "../common/types/task.schema";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import api from "../common/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";
type editDataProps = {
    editdata: Task | null
    onClose: () => void
    updateTaskInState: (task:Task) => void
}
const EditTask = ({ editdata, onClose, updateTaskInState }: editDataProps) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskEditFormData>({
        resolver: zodResolver(EditTaskSchema),
        defaultValues: {
            title: editdata?.title,
            project: String(editdata?.project.id),
            assignee: String(editdata?.user.id),
            status: editdata?.status,
            priority: editdata?.priority,
        },
    })
    const [taskId,setTaskId]  = useState(editdata ? editdata.id: null)
    const projectList = useSelector((state: RootState) => state.project.project)
    const userList = useSelector((state: RootState) => state.user.user)

    const editSubmit = async (data: TaskEditFormData) => {       
        try {
            const payload = TaskEditApiSchema.parse(data);
            const res = await api.put(`/admin/tasks/${taskId}`,payload);
            if (res.status == 200 || res.status == 201) {
                toast.success("Task Updated successfully");
                updateTaskInState(res.data)
                onClose()
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.detail || "Registration failed")
            } else {
                toast.error("Unexpected error occurred");
            }
        }
    }
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[420px] shadow-xl">
                <h2 className="text-lg font-semibold mb-5 text-gray-800">
                    Edit Task
                </h2>

                <form onSubmit={handleSubmit(editSubmit)} className="space-y-4">

                    {/* Title */}
                    <div>
                        <input
                            {...register("title")}
                            className="border w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Task title"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Project */}
                    <div>
                        <select
                            {...register("project")}
                            className="border w-full px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Project</option>
                            {projectList.map((val) => {
                                return <>
                                    <option key={val.id} value={val.id}>
                                        {val.project_name}
                                    </option>
                                </>
                            })}

                        </select>
                        {errors.project && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.project.message}
                            </p>
                        )}
                    </div>

                    {/* Assigned To */}
                    <div>
                        <select
                            {...register("assignee")}
                            className="border w-full px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select User</option>
                            {userList.map((value) => {
                                return <>
                                    <option key={value.id} value={value.id}>
                                        {value.userName}
                                    </option>
                                </>
                            })}

                        </select>
                        {errors.assignee && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.assignee.message}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <select
                            {...register("status")}
                            className="border w-full px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        {errors.status && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.status.message}
                            </p>
                        )}
                    </div>

                    {/* Priority */}
                    <div>
                        <select
                            {...register("priority")}
                            className="border w-full px-3 py-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Update
                        </button>
                    </div>

                </form>
            </div>
        </div>

    );
};

export default EditTask;
