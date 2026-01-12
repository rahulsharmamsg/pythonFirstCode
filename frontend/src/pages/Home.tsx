const Home = ()=>{
type Project = {
  id: number;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
};

type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  projectId: number;
};

const projects: Project[] = [
  { id: 1, name: "Website Redesign", description: "Update UI/UX", status: "active" },
  { id: 2, name: "Mobile App", description: "Build React Native App", status: "on-hold" },
  { id: 3, name: "Marketing Campaign", description: "Social Media Ads", status: "completed" },
];

const tasks: Task[] = [
  { id: 1, title: "Design Landing Page", description: "Create new landing page design", status: "in-progress", priority: "high", projectId: 1 },
  { id: 2, title: "Fix Login Bug", description: "Resolve login issue on mobile", status: "pending", priority: "medium", projectId: 1 },
  { id: 3, title: "Setup Push Notifications", description: "Implement push notifications", status: "pending", priority: "high", projectId: 2 },
  { id: 4, title: "Create Ad Creatives", description: "Design banners for campaign", status: "completed", priority: "medium", projectId: 3 },
  { id: 5, title: "Email Campaign", description: "Send newsletters", status: "completed", priority: "low", projectId: 3 },
];
    return (<>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Welcome, Rahul</h1>

      {/* Projects Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-gray-600">{project.description}</p>
              <span
                className={`inline-block mt-2 px-2 py-1 text-sm rounded ${
                  project.status === "active"
                    ? "bg-green-200 text-green-800"
                    : project.status === "on-hold"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {project.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Tasks Summary */}
      <section>
        <h2 className="text-xl font-semibold mb-4">My Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span
                  className={`px-2 py-1 rounded ${
                    task.status === "completed"
                      ? "bg-green-200 text-green-800"
                      : task.status === "in-progress"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {task.status.toUpperCase()}
                </span>
                <span
                  className={`px-2 py-1 rounded ${
                    task.priority === "high"
                      ? "bg-red-200 text-red-800"
                      : task.priority === "medium"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {task.priority.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>)
}
export default Home