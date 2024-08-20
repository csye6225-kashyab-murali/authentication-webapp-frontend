import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Adjust this import based on your project structure
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Encode credentials to Base64
    const credentials = btoa(`${username}:${password}`);

    try {
      // Make a GET request with basic authorization headers
      const response = await axios.get(`${import.meta.env.VITE_API_DOMAIN_LOCAL}/self`, {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (response.status === 200) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in.",
        });

        // Navigate to a different page after successful login
        navigate("/dashboard"); // Adjust this path based on your app
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200">
      <section className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
