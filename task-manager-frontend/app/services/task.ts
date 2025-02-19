import api from "./api";

export const fetchTasks = async () => {
  return api.get("/tasks");
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
