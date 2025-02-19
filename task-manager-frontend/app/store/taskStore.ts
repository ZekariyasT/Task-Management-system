import { create } from "zustand";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  due_date?: string;
  priority: number;
}

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));
