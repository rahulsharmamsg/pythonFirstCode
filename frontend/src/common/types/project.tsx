import * as z from "zod"
export const ProjectSchema = z.object({
  project_name: z.string().min(1, "Project name is required"),
  project_description: z.string().min(6, "Project Description at least 6 char.")
})
export type ProjectFormData = z.infer<typeof ProjectSchema>