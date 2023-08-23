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
  Link,
  CustomErrorAlert,
  FormItem,
  CustomSuccessAlert,
  CustomRootLoading,
} from "@/common/components";
import {
  useForm,
  useSearchParams,
  useState,
  useRouter,
  useEffect,
} from "@/common/hooks";
import {
  AuthSchemasValidators,
  zodResolver,
  z,
  uuidValidate,
} from "@/common/validators";
import { AuthServices } from "@/common/services";
import { useAccountStore } from "@/common/stores";
import { redirect } from "@/common/utils";
import { set } from "react-hook-form";

function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof AuthSchemasValidators.resetPassword>>({
    resolver: zodResolver(AuthSchemasValidators.resetPassword),
    defaultValues: {
      email: searchParams.get("email") || "",
      newPassword: "",
      passwordConfirmation: "",
      code: searchParams.get("code") || "",
      termsAndConditions: false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [response, setResponse] = useState<any | null>();
  const [isReady, setIsReady] = useState<boolean | null>(null);

  async function onSubmit(
    values: z.infer<typeof AuthSchemasValidators.resetPassword>
  ) {
    setIsLoading(true);
    AuthServices.resetPassword(values)
      .then((data) => {
        setResponse(data);
        if (data.type === "success") {
          setIsPasswordReset(true);
          form.reset();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      if (
        !searchParams.get("email") ||
        !searchParams.get("code") ||
        !uuidValidate(searchParams.get("code")?.toString() ?? "")
      )
        setIsReady(false);
      else setIsReady(true);
    }, 500);
  }, []);

  const handleReturnToLogin = () => {
    router.replace("/auth/login");
  };

  if (isReady === null) return <CustomRootLoading />;
  if (isReady === false) return redirect("/auth/forgot-password");

  return (
    <main className="bg-gray-50 scroll-smooth hover:scroll-auto">
      <div className="flex flex-col justify-center items-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 min-h-screen p-5">
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
            Shifti
          </span> */}
        </Link>
        <div className="p-10 w-full max-w-lg bg-white rounded-2xl shadow-xl shadow-gray-300">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl text-center">
              Reset your password
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
                          disabled={true}
                          className="border border-gray-300  sm:text-sm rounded-lg   focus:border-primary block w-full p-2.5"
                          placeholder="someone@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!isPasswordReset && (
                  <>
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block mb-2 text-sm font-medium text-primary">
                            Reset code
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              disabled={true}
                              className="border border-gray-300  sm:text-sm rounded-lg   focus:border-primary block w-full p-2.5"
                              placeholder="**********************"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block mb-2 text-sm font-medium text-primary">
                            New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              type="password"
                              className="border border-gray-300  sm:text-sm rounded-lg   focus:border-primary block w-full p-2.5"
                              placeholder="••••••••"
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
                            Confirm New Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              autoComplete="off"
                              type="password"
                              className="border border-gray-300  sm:text-sm rounded-lg   focus:border-primary block w-full p-2.5"
                              placeholder="••••••••"
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
                      className="py-3 px-5 w-full text-base font-medium text-center text-white bg-primary  hover:scale-[1.04] shadow-md shadow-gray-300 transition-transform rounded-lg "
                    >
                      {isLoading ? (
                        <>
                          Reset password &nbsp;
                          <span className="loading loading-spin loading-md"></span>
                        </>
                      ) : (
                        "Reset password"
                      )}
                    </Button>
                  </>
                )}

                {isPasswordReset && (
                  <Button
                    onClick={handleReturnToLogin}
                    className="py-3 px-5 w-full text-base font-medium text-center text-primary bg-white  hover:scale-[1.04]  shadow-gray-300 transition-transform rounded-lg border border-primary flex"
                  >
                    <svg
                      data-v-f24af897=""
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide-icon customizable"
                    >
                      <path d="M18 15h-6v4l-7-7 7-7v4h6v6z"></path>
                    </svg>
                    <span className="ml-3">Return to login</span>
                  </Button>
                )}
                {!isPasswordReset && (
                  <div className="text-sm font-medium text-gray-500 mt-3">
                    You remember your password? &nbsp;
                    <Link
                      href="/auth/login"
                      className="text-primary font-bold hover:underline"
                    >
                      Login here
                    </Link>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
