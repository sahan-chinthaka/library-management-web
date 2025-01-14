import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/auth-context";
import { signInFormSchema } from "@/lib/schema";
import { api } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

function SignInPage() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const [_, authAction] = useAuth();

  function onSubmit(values: z.infer<typeof signInFormSchema>) {
    setDisabled(true);
    api
      .post("/api/Auth/signin", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast("Sign in successful", {
          type: "success",
        });
        authAction.refresh();
        navigate("/");
      })
      .catch((e) => {
        setDisabled(false);
        if (e.status == 401)
          toast("Invalid credentials", {
            type: "error",
          });
        else toast(e.message, { type: "error" });
      });
  }

  return (
    <div className="p-4">
      <div className="mx-auto mt-10 max-w-[400px] rounded-lg border bg-white p-4 shadow">
        <h1 className="mb-8 text-center">Sign in here</h1>
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
            <Button type="submit" className="w-full" disabled={disabled}>
              Sign in
            </Button>
            <p>
              Do not have an account?&nbsp;
              <Link className="text-primary" to="/sign-up">
                Create here
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignInPage;
