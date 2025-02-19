import { useEffect, useState } from "react";
import { fetchTasks } from "@/app/services/task"; // Import the fetchTasks function from the task service
import TaskItem from "./TaskItem"; // Import TaskItem to display each task

// Define the Task type directly in the component
interface Task {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  due_date?: string;
  priority: number;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Define tasks with the Task type
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchAllTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await fetchTasks(); // Get the tasks from the API
        setTasks(fetchedTasks); // Set the tasks into state
      } catch (error) {
        setError("Failed to fetch tasks. Please try again later.");
        console.error("Error fetching tasks:", error); // Log the error for debugging
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchAllTasks();
  }, []); // Run only once on component mount

  if (loading) {
    return <div>Loading tasks...</div>; // Show loading indicator
  }

  if (error) {
    return <div>{error}</div>; // Show error message if tasks fetch fails
  }

  return (
    <div>
      <h2>Task List</h2>
      <div>
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task.id} task={task} />) // Display each task using TaskItem component
        ) : (
          <p>No tasks available.</p> // Show message when there are no tasks
        )}
      </div>
    </div>
  );
};

export default TaskList;
