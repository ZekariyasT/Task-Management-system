import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthStore } from "@/app/store/authStore"; // For checking authentication status
import TaskList from "@/app/components/Tasks/TaskList"; // Import TaskList to show tasks

const DashboardPage: NextPage = () => {
  const { isAuthenticated, user } = useAuthStore(); // Check if user is authenticated
  const router = useRouter();

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    router.push("/login");
    return null; // Prevent rendering if user is not authenticated
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <header className="py-6">
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome, {user?.name || "User"}!
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            This is your task management dashboard. Manage your tasks here.
          </p>
        </header>

        {/* Task List Section */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <TaskList /> {/* Show the list of tasks here */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
