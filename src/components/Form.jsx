"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Import Link for navigation

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Define the schema for validation using Zod
const formSchema = z.object({
  username: z.string().email().regex(/.*northeastern\.edu$/, {
    message: "Email must be a Northeastern email.",
  }),
  first_name: z.string().min(1, {
    message: "First name is required.",
  }),
  last_name: z.string().min(1, {
    message: "Last name is required.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const About = () => {
  // Initialize the form with the schema
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_DOMAIN_LOCAL}`,
        {
          first_name: data.first_name,
          last_name: data.last_name,
          password: data.password,
          username: data.username,
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Success!",
          description: "Your account is created. Please check your email for verification.",
        });
      }
    } catch (error) {
      console.error("Error saving user details:", error);
      toast({
        title: "Error",
        description: "There was an error saving your details. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen from-purple-200 via-pink-200 to-blue-200">
      <section className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sign up!</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Northeastern Email Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Kashyab" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Murali" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating Account..." : "Submit"}
            </Button>

            {/* Added the link for existing account holders */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Login
                </Link>
              </p>
            </div>

          </form>
        </Form>
      </section>
    </div>
  );
};

export default About;
