import { AppProps } from "next/app";
import "../styles/globals.css"; // Import Tailwind CSS and other global styles
import { useAuthStore } from "@/app/store/authStore"; // For checking authentication status
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { isAuthenticated } = useAuthStore(); // Get the authentication status
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page if not authenticated
    if (
      !isAuthenticated &&
      router.pathname !== "/login" &&
      router.pathname !== "/register"
    ) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
