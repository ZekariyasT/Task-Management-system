import { useForm, SubmitHandler } from "react-hook-form";
import { createTask, updateTask } from "@/app/services/task"; // Ensure you have service methods for creating and updating tasks
import { useRouter } from "next/router";

interface TaskFormData {
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  due_date?: string;
  priority: number;
}

interface TaskFormProps {
  taskId?: number;
  existingTask?: {
    title: string;
    description?: string;
    status: "pending" | "in_progress" | "completed";
    due_date?: string;
    priority: number;
  };
}

const TaskForm = ({ taskId, existingTask }: TaskFormProps) => {
  const { register, handleSubmit, setValue } = useForm<TaskFormData>();
  const router = useRouter();

  // If existing task, pre-populate form
  if (existingTask) {
    Object.keys(existingTask).forEach((key) => {
      if (existingTask[key as keyof typeof existingTask]) {
        setValue(
          key as keyof TaskFormData,
          existingTask[key as keyof typeof existingTask]
        );
      }
    });
  }

  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    try {
      if (taskId) {
        // Update existing task
        await updateTask(taskId, data);
      } else {
        // Create new task
        await createTask(data);
      }
      router.push("/tasks");
    } catch (error) {
      console.error("Task submission failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("title", { required: "Title is required" })}
        placeholder="Task Title"
        required
      />
      <textarea {...register("description")} placeholder="Task Description" />
      <select {...register("status", { required: "Status is required" })}>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <input type="date" {...register("due_date")} />
      <input
        type="number"
        {...register("priority", { required: "Priority is required" })}
        placeholder="Priority (1-5)"
        min={1}
        max={5}
      />
      <button type="submit">{taskId ? "Update Task" : "Create Task"}</button>
    </form>
  );
};

export default TaskForm;
