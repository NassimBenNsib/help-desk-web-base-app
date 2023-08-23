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
} from "@/common/components";
import { EraserIcon } from "lucide-react";

function GeneralInformationComponent() {
  const { generalInformation, token, updateGeneralInformation } =
    useAccountStore();
  const form = useForm<
    z.infer<typeof SettingsSchemasValidators.changeGeneralInformation>
  >({
    resolver: zodResolver(SettingsSchemasValidators.changeGeneralInformation),
    defaultValues: {
      firstName: generalInformation.firstName.toString(),
      lastName: generalInformation.lastName.toString(),
      email: generalInformation.email.toString(),
      phoneNumber: generalInformation.phoneNumber.toString(),
      country: generalInformation.country.toString(),
      city: generalInformation.city.toString(),
      address: generalInformation.address.toString(),
      zipPostalCode: generalInformation.zipPostalCode.toString(),
      department: generalInformation.department.toString(),
      position: generalInformation.position.toString(),
      organization: generalInformation.organization.toString(),
      birthday: generalInformation.birthday.toString(),
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any | null>();

  async function onSubmit(
    values: z.infer<typeof SettingsSchemasValidators.changeGeneralInformation>
  ) {
    setIsLoading(true);
    UserSettingsServices.changeGeneralInformation(token, values)
      .then((data) => {
        setResponse(data);
        if (data.type === "success") updateGeneralInformation(values);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRestForm() {
    form.reset();
    form.setValue("firstName", generalInformation.firstName.toString());
    form.setValue("lastName", generalInformation.lastName.toString());
    form.setValue("country", generalInformation.country.toString());
    form.setValue("city", generalInformation.city.toString());
    form.setValue("address", generalInformation.address.toString());
    form.setValue("zipPostalCode", generalInformation.zipPostalCode.toString());
    form.setValue("organization", generalInformation.organization.toString());
    form.setValue("department", generalInformation.department.toString());
    form.setValue("position", generalInformation.position.toString());
    form.setValue("birthday", generalInformation.birthday.toString());
    form.setValue("email", generalInformation.email.toString());
    form.setValue("phoneNumber", generalInformation.phoneNumber.toString());
  }

  return (
    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-6">
      <h3 className="mb-4 text-xl font-bold flex gap-2">
        <span>General information</span>
        {!isLoading && (
          <EraserIcon className="cursor-pointer" onClick={handleRestForm} />
        )}
      </h3>
      <Form {...form}>
        <form
          autoComplete="off"
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-6 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. Nassim"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. Ben Nsib"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. Tunisia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. Ariana"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. Residence El Badr, Hédi Nouira Avenue, Ariana 2037, Tunisia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipPostalCode"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    Zip/Postal Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. 2037"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. nassim.bennsib@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. +21600000000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    Organization
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. Shifti"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    Department
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. Development"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    Position
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g. Full Stack Developer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="col-span-6 sm:col-span-3">
                  <FormLabel className="block mb-2 text-sm font-medium text-gray-900">
                    Birthday
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="text"
                      className="shadow-lg-sm border border-gray-300 text-gray-900 sm:text-sm rounded-lg  focus:text-primary focus:border-primary block w-full p-2.5"
                      placeholder="e.g YYYY-MM-DD"
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
          </div>
        </form>
      </Form>
    </div>
  );
}

export { GeneralInformationComponent };
