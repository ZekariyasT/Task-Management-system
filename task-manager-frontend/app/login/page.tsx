"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/app/components/Auth/LoginForm";

const Login = () => {
  const router = useRouter();
  return (
    <div>
      <LoginForm />
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
  );
};

export default Login;
