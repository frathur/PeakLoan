import React from "react";
import Layout from "../components/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { LockIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Define schema with password confirmation
const formSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Hardcoded signup: store the user locally (never store plain text passwords in production)
    const user = {
      email: values.email,
      password: values.password,
    };
    localStorage.setItem("user", JSON.stringify(user));
    toast({
      title: "Signup Successful",
      description: "Your account has been created.",
    });
    navigate("/login");
  };

  return (
    <Layout>
      <div className="py-8 md:py-16">
        <div className="container-custom max-w-md mx-auto">
          <div className="bg-white shadow-md rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center bg-teal-100 w-12 h-12 rounded-full mb-4">
                <LockIcon className="h-6 w-6 text-teal-600" />
              </div>
              <h1 className="text-2xl font-bold">Create an Account</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="block font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </div>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="block font-medium">Password</label>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </div>
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="block font-medium">Confirm Password</label>
                    <Input type="password" placeholder="Re-enter password" {...field} />
                  </div>
                )}
              />
              <Button type="submit" className="w-full bg-teal-500 hover:bg-blue-600">
                Sign Up
              </Button>
            </form>
            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
