import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "@/app/services/auth";
import { useAuthStore } from "@/app/store/authStore";
import { useRouter } from "next/router";

// Define the types for the form data and user response
interface LoginFormData {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  // Add other user properties from the backend response
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

  // Use SubmitHandler with LoginFormData
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const response: LoginResponse = await loginUser(data);
    login(response.data.user);
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register("email")} placeholder="Email" required />
      <input
        type="password"
        {...register("password")}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
