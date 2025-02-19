"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "@/app/services/auth";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/navigation"; // Correct import

// Define the types for the form data and user response
interface LoginFormData {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginResponse {
  data: {
    user: User;
  };
}

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const { login } = useAuthStore();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const response: LoginResponse = await loginUser(data);
    login(response.data.user);
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/register")} // Link to RegisterForm page
              className="text-blue-500 hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
