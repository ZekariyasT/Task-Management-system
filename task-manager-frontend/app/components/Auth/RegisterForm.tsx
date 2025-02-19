import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "@/app/services/auth"; // Ensure you have a register function in your services
import { useRouter } from "next/router";

// Define the types for the form data
interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const router = useRouter();

  // Handle form submission
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      // Call the register API function (make sure this is set up in services/auth)
      await registerUser(data);
      router.push("/login"); // Redirect to login after successful registration
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  // Watch password to match the confirmation field
  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
        required
      />
      {errors.name && <span>{errors.name.message}</span>}

      <input
        type="email"
        {...register("email", { required: "Email is required" })}
        placeholder="Email"
        required
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
        required
      />
      {errors.password && <span>{errors.password.message}</span>}

      <input
        type="password"
        {...register("password_confirmation", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
        placeholder="Confirm Password"
        required
      />
      {errors.password_confirmation && (
        <span>{errors.password_confirmation.message}</span>
      )}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
