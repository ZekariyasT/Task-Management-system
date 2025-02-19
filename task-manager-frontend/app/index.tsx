import { NextPage } from "next";
import { useAuthStore } from "@/app/store/authStore"; // To check if user is authenticated
import { useRouter } from "next/router"; // To navigate to login or dashboard

const HomePage: NextPage = () => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  // Redirect user to dashboard if authenticated
  if (isAuthenticated) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to Task Manager
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Manage your tasks efficiently with our platform.
        </p>
        <div className="mt-4">
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
