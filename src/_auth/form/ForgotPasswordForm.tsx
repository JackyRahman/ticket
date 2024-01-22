import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { ForgotPasswordValidation } from '@/lib/validation';
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

const ForgotPasswordForm = () => {
  const isLoading = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof ForgotPasswordValidation>>({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: {
      email: "",
    },
  })
  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ForgotPasswordValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col bg-white p-8 rounded-2xl">
        <img className="max-w-32" src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pd-5 sm:pt-12 text-dark-2">Request reset password</h2>
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
          <Button type="submit" className="shad-button_primary">
            { isLoading ? (
              <div className="flex-center gap-2">
                Loading... <Loader />
              </div>
            ): "Forget Password"}
          </Button>
          <p className="text-small-regular text-gray-500 text-center mt-2">
            Back to login page?
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">login?</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default ForgotPasswordForm