import { SettingsSchemasValidators, z, zodResolver } from "@/common/validators";
import { useForm, useState, useEffect } from "@/common/hooks";
import { UserSettingsServices } from "@/common/services";
import { useAccountStore } from "@/common/stores";
import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  CustomErrorAlert,
  CustomSuccessAlert,
} from "@/common/components";
import { EraserIcon } from "lucide-react";

function PasswordInformationComponent() {
  const { token } = useAccountStore();
  const form = useForm<
    z.infer<typeof SettingsSchemasValidators.changePassword>
  >({
    resolver: zodResolver(SettingsSchemasValidators.changePassword),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any | null>();

  async function onSubmit(
    values: z.infer<typeof SettingsSchemasValidators.changePassword>
  ) {
    setIsLoading(true);
    UserSettingsServices.changePassword(token, values)
      .then((data) => {
        setResponse(data);
        console.log(data);
        if (data.type === "success") {
          setTimeout(() => {
            setResponse(null);
          }, 2000);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRestForm() {
    form.reset();
  }

  return (
    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
      <h3 className="mb-4 text-xl font-bold flex gap-2">
        <span>General information</span>
        {!isLoading && (
          <EraserIcon className="cursor-pointer" onClick={handleRestForm} />
        )}
      </h3>
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
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                  Current password
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    type="password"
                    className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
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
            name="newPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                  New password
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    type="password"
                    className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
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
              <FormItem className="">
                <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    type="password"
                    className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-6 sm:col-full ">
            <Button
              disabled={isLoading}
              className="py-3 px-5 w-full text-base font-medium text-center text-white bg-gradient-to-br from-primary to-primary hover:scale-[1.04] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto"
              type="submit"
            >
              {isLoading ? (
                <>
                  Save all &nbsp;
                  <span className="loading loading-spin loading-md"></span>
                </>
              ) : (
                "Save all"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function ddddddd() {
  return (
    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
      <h3 className="mb-4 text-xl font-bold">Password information</h3>
      <form action="#">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="current-password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Current password
            </label>
            <input
              type="text"
              name="current-password"
              id="current-password"
              className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="new-password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              New password
            </label>
            <input
              type="text"
              name="new-password"
              id="new-password"
              className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm password
            </label>
            <input
              type="text"
              name="confirm-password"
              id="confirm-password"
              className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-fuchsia-50 focus:border-fuchsia-300 block w-full p-2.5"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="col-span-full">
            <div className="text-sm font-medium">Password requirements:</div>
            <div className="mb-1 text-sm font-normal text-gray-500">
              Ensure that these requirements are met:
            </div>
            <ul className="pl-4 space-y-1 text-gray-500">
              <li className="text-xs font-normal">
                At least 10 characters (and up to 100 characters)
              </li>
              <li className="text-xs font-normal">
                At least one lowercase character
              </li>
              <li className="text-xs font-normal">
                Inclusion of at least one special character, e.g., ! @ # ?
              </li>
              <li className="text-xs font-normal">Some text here zoltan</li>
            </ul>
          </div>
          <div className="col-span-6 sm:col-full">
            <Button
              type="submit"
              className="py-3 px-5 w-full text-base font-medium text-center text-white bg-gradient-to-br from-primary to-primary hover:scale-[1.04] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto"
            >
              ss Save all
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export { PasswordInformationComponent };
