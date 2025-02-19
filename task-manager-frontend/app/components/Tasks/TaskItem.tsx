import { useRouter } from "next/router";
import { deleteTask } from "@/app/services/task";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    description?: string;
    status: "pending" | "in_progress" | "completed";
    due_date?: string;
    priority: number;
  };
}

const TaskItem = ({ task }: TaskItemProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/tasks/edit/${task.id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      router.push("/tasks");
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.due_date}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
