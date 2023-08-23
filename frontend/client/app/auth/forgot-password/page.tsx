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
  FormItem,
  Image,
  Link,
  CustomErrorAlert,
  CustomSuccessAlert,
  CustomRootLoading,
} from "@/common/components";
import {
  useCountdown,
  useForm,
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

function ForgotPassword() {
  const form = useForm<z.infer<typeof AuthSchemasValidators.forgotPassword>>({
    resolver: zodResolver(AuthSchemasValidators.forgotPassword),
    defaultValues: {
      email: "",
      termsAndConditions: false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoToResetPassword, setIsGoToResetPassword] = useState(false);
  const [isCodeSended, setIsCodeSended] = useState(false);
  const [response, setResponse] = useState<any | null>();
  const [resetPasswordCode, setResetPasswordCode] = useState<string>("");
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    });
  const router = useRouter();

  function handleChangePassword() {
    if (!uuidValidate(resetPasswordCode)) {
      setResponse({
        type: "error",
        title: "Invalid Code",
        message: "You have entered an invalid code.",
        hint: "Please check your email and try again.",
      });
    } else {
      setIsGoToResetPassword(true);
      setTimeout(() => {
        setResponse(null);
        router.push(
          `/auth/reset-password?code=${resetPasswordCode}&email=${
            form.getValues().email
          }`
        );
      }, 1000);
    }
  }

  async function onSubmit(
    values: z.infer<typeof AuthSchemasValidators.register>
  ) {
    setIsLoading(true);
    setTimeout(() => {
      AuthServices.forgotPassword(values)
        .then((data) => {
          setResponse(data);
          if (data.type === "success") {
            resetCountdown();
            startCountdown();
            setIsCodeSended(true);
            // form.reset();
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);
  }

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
        <div className="w-full bg-white rounded-2xl shadow-xl shadow-gray-300 md:mt-0 sm:max-w-screen-sm xl:p-0">
          <div className="p-10 w-full">
            <h2 className="text-2xl font-bold lg:text-3xl text-center">
              Forgot your password?
            </h2>
            {response?.type === "error" && (
              <CustomErrorAlert
                className="mt-[32px]"
                message={response.message}
                title={response.title}
                hint={response.hint}
              />
            )}
            {response?.type === "success" && (
              <CustomSuccessAlert
                className="mt-[32px]"
                message={response.message}
                title={response.title}
                hint={response.hint}
              />
            )}
            <p className="text-md font-normal text-gray-500 my-3">
              Don't fret! Just type in your email and we will send you a code to
              reset your password!
            </p>
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
                {isCodeSended && (
                  <FormItem>
                    <FormLabel className="block mb-2 text-sm font-medium text-primary">
                      Your reset code
                    </FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        value={resetPasswordCode}
                        className="border border-gray-300  sm:text-sm rounded-lg   focus:border-primary block w-full p-2.5"
                        placeholder="******************************"
                        onChange={(e) => {
                          setResetPasswordCode(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                <FormField
                  control={form.control}
                  name="termsAndConditions"
                  render={({ field }) => (
                    <FormItem className="flex flex-wrap items-center gap-3 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isCodeSended}
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

                {!isGoToResetPassword && (
                  <Button
                    disabled={isLoading || (isCodeSended && count > 0)}
                    type="submit"
                    className="py-3 px-5 w-full text-base font-medium text-center text-white bg-primary  hover:scale-[1.04] shadow-md shadow-gray-300 transition-transform rounded-lg "
                  >
                    {isLoading ? (
                      <>
                        Send code &nbsp;
                        <span className="loading loading-spin loading-md"></span>
                      </>
                    ) : isCodeSended ? (
                      `Resend code ${count > 0 ? `(${count})` : ""}`
                    ) : (
                      "Send code"
                    )}
                  </Button>
                )}
              </form>
            </Form>
            {isCodeSended && !isLoading && !isGoToResetPassword && (
              <>
                <div className="text-center my-3">- OR -</div>
                <Button
                  disabled={isGoToResetPassword}
                  onClick={handleChangePassword}
                  className="py-3 px-5 w-full text-base font-medium text-center text-primary bg-white  hover:scale-[1.04]  shadow-gray-300 transition-transform rounded-lg border border-primary"
                >
                  {isLoading ? (
                    <>
                      Continue to change password &nbsp;
                      <span className="loading loading-spin loading-md"></span>
                    </>
                  ) : (
                    " Continue to change password"
                  )}
                </Button>
              </>
            )}
            {isGoToResetPassword && (
              <span className="loading loading-spin loading-lg mx-auto block scale-150 mt-5"></span>
            )}
            {!isGoToResetPassword && !isLoading && (
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
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
