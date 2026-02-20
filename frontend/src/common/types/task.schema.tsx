import { z } from "zod";

export const TaskSchema = z
.object({
  title: z
    .string()
    .min(3, "Task title must be at least 3 characters"),

  project: z
    .string()
    .min(1, "Please select a project"),

  assignee: z
    .string()
    .min(1, "Please select an assignee"),

  priority: z.enum(["low", "medium", "high"],"Please select priority"),
});
export const EditTaskSchema = TaskSchema.extend({
  status: z.enum(["pending", "in-progress", "completed"],"Please select status" )
});
export type TaskFormData = z.infer<typeof TaskSchema>;
export type TaskEditFormData = z.infer<typeof EditTaskSchema>;
export const TaskApiSchema = TaskSchema.transform((data) => ({
  title: data.title,
  project_id: Number(data.project),
  user_id: Number(data.assignee),
  priority: data.priority,
}));

export const TaskEditApiSchema = EditTaskSchema.transform((data) => ({
  title: data.title,
  project_id: Number(data.project),
  user_id: Number(data.assignee),
  priority: data.priority,
  status: data.status
}));

export type User = {
  id: number;
  userName: string;
  emailId: string;
  phoneNumber: number;
  gender: string;
  role: string;
  status: number;
};
export type Project = {
  id: number;
  project_name: string;
  project_description: string;
  status: number;
};


export type Task = {
  id: number;
  title: string;
  project_id: number;
  user_id: number
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  project:{
    id:number
    project_description:string
    project_name: string
    status:number
  }
  user:{
    emailId:string
    gender: "male" | "female"
    id:number
    phoneNumber:number
    role:string
    status:number
    userName:string
  }
};