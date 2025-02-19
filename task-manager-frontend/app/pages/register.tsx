import { NextPage } from "next";
import RegisterForm from "@/app/components/Auth/RegisterForm"; // Import the RegisterForm component

const RegisterPage: NextPage = () => {
  return (
    <div>
      <h1>Register</h1>
      <RegisterForm /> {/* Use the RegisterForm component here */}
    </div>
  );
};

export default RegisterPage;
