"use client";

import RegisterForm from "@/app/components/Auth/RegisterForm";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  return (
    <div>
      <RegisterForm />
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="text-blue-500 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
