import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import * as z from "zod"
import { useState } from 'react';
import axios from 'axios';

import { Button } from "@/components/ui/button"
import { SigninValidation } from '@/lib/validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/ui/shared/Loader";



const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  
  const onSubmit = async (values: z.infer<typeof SigninValidation>) => {
    setIsLoading(true);
    setMessage("");
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", values);
      console.log("----->", response.data);
  
      localStorage.setItem("access_token", response.data.access_token);
      navigate("/");
    } catch (error) {
      if (error.response.data.statusCode == 401) {
        setMessage("Sorry, your password is incorrect. Please double-check your password.");
      } else {
        setMessage('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col bg-white p-8 rounded-2xl">
        <img className="max-w-32" src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pd-5 sm:pt-12 bg text-dark-2">Login to your account</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message"/>
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            { isLoading ? (
              <div className="flex-center gap-2">
                Loading... <Loader />
              </div>
            ): "Sign in"}
          </Button>
          <FormMessage className="shad-form_message text-center">{message}</FormMessage>
          <p className="text-small-regular text-light-2 text-center mt-2">
            
            <Link to="/forgot" className="text-primary-500 text-small-semibold ml-1">Forgot password?</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignInForm