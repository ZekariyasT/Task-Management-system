import api from "./api";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  due_date?: string;
  priority: number;
}

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (task: {
  title: string;
  description?: string;
  status: string;
  due_date?: string;
  priority: number;
}) => {
  return api.post("/tasks", task);
};

export const updateTask = async (
  id: number,
  task: Partial<{
    title: string;
    description?: string;
    status: string;
    due_date?: string;
    priority: number;
  }>
) => {
  return api.put(`/tasks/${id}`, task);
};

export const deleteTask = async (id: number) => {
  return api.delete(`/tasks/${id}`);
};
