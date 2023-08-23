"use client";

import {
  Button,
  Input,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  Image,
  FormItem,
  Link,
  CustomErrorAlert,
  CustomSuccessAlert,
} from "@/common/components";
import { useForm, useState } from "@/common/hooks";
import { AuthSchemasValidators, zodResolver, z } from "@/common/validators";
import { AuthServices } from "@/common/services";

function Register() {
  const form = useForm<z.infer<typeof AuthSchemasValidators.register>>({
    resolver: zodResolver(AuthSchemasValidators.register),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      termsAndConditions: false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any | null>();

  async function onSubmit(
    values: z.infer<typeof AuthSchemasValidators.register>
  ) {
    setIsLoading(true);
    setTimeout(() => {
      AuthServices.register(values)
        .then((data) => {
          setResponse(data);
          if (data.type === "success") form.reset();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  }

  return (
    <main className="bg-gray-50 scroll-smooth hover:scroll-auto">
      <div className="flex flex-col justify-center items-center  mx-auto md:h-screen pt:mt-0 min-h-screen p-5">
        <Link
          href="#"
          className="flex justify-center items-center mb-8 text-2xl font-semibold lg:mb-10"
        >
          <Image
            src="/assets/icons/full-logo.png"
            className="mr-4 h-10"
            alt="Company Logo"
            width={75}
            height={40}
          />
          {/* <span className="self-center text-2xl font-bold whitespace-nowrap">
            Shifti Help Desk
          </span> */}
        </Link>
        <div className="p-10 w-full max-w-lg bg-white rounded-2xl shadow-xl shadow-gray-300">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center">
              Create Your Account
            </h2>
            {response?.type === "error" && (
              <CustomErrorAlert
                message={response.message}
                title={response.title}
                hint={response.hint}
              />
            )}
            {response?.type === "success" && (
              <CustomSuccessAlert
                message={response.message}
                title={response.title}
                hint={response.hint}
              />
            )}

            {/* <div className="grid grid-cols-3 gap-3 mt-6">
              <Link
                href="#Facebook"
                className="inline-flex justify-center w-full px-5 py-2.5 text-sm font-medium text-[#4267B2] border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="facebook"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.69 226.4 209.3 245V327.7h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.3 482.4 504 379.8 504 256z"
                  />
                </svg>
              </Link>
              <Link
                href="#Gmail"
                className="inline-flex justify-center w-full px-5 py-2.5 text-sm font-medium text-[#DB4437] border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
              </Link>
              <a
                href="#Twitter"
                className="inline-flex justify-center w-full px-5 py-2.5 text-sm font-medium text-[#00acee] border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="twitter"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                  />
                </svg>
              </a>
            </div> */}
            <Form {...form}>
              <form
                autoComplete="off"
                method="POST"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 text-sm font-medium text-primary">
                        Your email
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          className="border border-gray-300  sm:text-sm rounded-lg   focus:border-primary block w-full p-2.5"
                          placeholder="someone@example.com"
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
                    <FormItem className="mt-0">
                      <FormLabel className="block mb-2 text-sm font-medium text-primary">
                        Your password
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          className="border border-gray-300  sm:text-sm rounded-lg   focus:border-primary block w-full p-2.5"
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 text-sm font-medium text-primary">
                        Confirm password
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          className="border border-gray-300  sm:text-sm rounded-lg   focus:border-primary block w-full p-2.5"
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="termsAndConditions"
                  render={({ field }) => (
                    <FormItem className="flex flex-wrap items-center gap-3 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className=" w-5 h-5 rounded  focus:ring-3 focus:ring-0 "
                          {...field}
                        />
                      </FormControl>
                      <FormLabel className="block text-sm font-medium ">
                        I accept the &nbsp;
                        <Link
                          href="#"
                          className="text-primary font-bold hover:underline"
                        >
                          Terms and Conditions
                        </Link>
                      </FormLabel>
                      <FormMessage className="w-full text-[#c11010]" />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={isLoading}
                  type="submit"
                  className="py-3 px-5 w-full text-base font-medium text-center text-white bg-primary  hover:scale-[1.04] shadow-md shadow-gray-300 transition-transform rounded-lg"
                >
                  {isLoading ? (
                    <>
                      Create account &nbsp;
                      <span className="loading loading-spin loading-md"></span>
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
                <div className="text-sm font-medium text-gray-500">
                  You remember your password? &nbsp;
                  <Link
                    href="/auth/login"
                    className="text-primary font-bold hover:underline"
                  >
                    Login here
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
