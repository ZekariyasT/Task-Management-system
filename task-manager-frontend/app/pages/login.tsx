import { NextPage } from "next";
import LoginForm from "@/app/components/Auth/LoginForm"; // Import the LoginForm component

const LoginPage: NextPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm /> {/* Use the LoginForm component here */}
    </div>
  );
};

export default LoginPage;
