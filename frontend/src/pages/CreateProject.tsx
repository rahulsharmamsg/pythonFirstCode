// src/components/AddProject.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormData, ProjectSchema } from "../common/types/project";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import api from "../common/axiosInstance";
const AddProject = () => {
  const { register , handleSubmit,reset,formState:{errors}} = useForm<ProjectFormData>({
    resolver:zodResolver(ProjectSchema)
  })
const navigate = useNavigate()
  const onSubmit = async(data:ProjectFormData) => {

     try {
            const res = await api.post('/admin/add_project', data)
            if (res.status === 200 || res.status === 201) {
                toast.success("Project added successful");
                reset(); // ✅ form clear here
                navigate('/addproject')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.detail || "Registration failed")
            } else {
                toast.error("Unexpected error occurred");
            }
        }
  };

  return (
   <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
  <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
    Add New Project
  </h2>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
    {/* Project Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Project Name
      </label>
      <input
        {...register("project_name")}
        placeholder="Enter project name"
        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 
        ${
          errors.project_name
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {errors.project_name && (
        <p className="mt-1 text-sm text-red-500">
          {errors.project_name.message}
        </p>
      )}
    </div>

    {/* Project Description */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Project Description
      </label>
      <textarea
        {...register("project_description")}
        placeholder="Enter project description"
        rows={4}
        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 
        ${
          errors.project_description
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {errors.project_description && (
        <p className="mt-1 text-sm text-red-500">
          {errors.project_description.message}
        </p>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium
      hover:bg-blue-700 transition duration-200"
    >
      Create Project
    </button>
  </form>
</div>

  );
};

export default AddProject;
