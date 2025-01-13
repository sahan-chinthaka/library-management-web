import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpFormSchema } from "@/lib/schema";
import { api } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

function SignUpPage() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    setDisabled(true);
    api
      .post("/api/Auth/signup", values)
      .then(() => {
        toast("User registered successfully", { type: "success" });
        navigate("/sign-in");
      })
      .catch((e) => {
        setDisabled(false);
        if (e.status == 409)
          toast("Username already exists", { type: "error" });
        else toast(e.message, { type: "error" });
      });
  }

  return (
    <div className="p-4">
      <div className="mx-auto mt-10 max-w-[400px] rounded-lg border bg-white p-4 shadow">
        <h1 className="mb-8 text-center">Sign up here</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Username"
                      {...field}
                    />
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirm</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={disabled}>
              Sign up
            </Button>
            <p>
              Already have an account?&nbsp;
              <Link className="text-primary" to="/sign-in">
                Sign in here
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignUpPage;
