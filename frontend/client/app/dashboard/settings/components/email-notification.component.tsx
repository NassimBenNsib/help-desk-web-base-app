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

function EmailNotificationComponent() {
  const { emailPreference, token, updateEmailPreference } = useAccountStore();
  const [form, setForm] = useState({
    accountActivity: emailPreference.accountActivity,
    messages: emailPreference.messages,
    newsletter: emailPreference.newsletter,
    tickets: emailPreference.tickets,
    usersActivity: emailPreference.usersActivity,
    virtualAssistant: emailPreference.virtualAssistant,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any | null>();

  async function handleSubmit() {
    setIsLoading(true);
    UserSettingsServices.changeEmailPreference(token, form)
      .then((data) => {
        setResponse(data);
        if (data.type === "success") updateEmailPreference(form);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRestForm() {
    setForm({
      accountActivity: emailPreference.accountActivity,
      messages: emailPreference.messages,
      newsletter: emailPreference.newsletter,
      tickets: emailPreference.tickets,
      usersActivity: emailPreference.usersActivity,
      virtualAssistant: emailPreference.virtualAssistant,
    });
  }

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.checked });
  }

  return (
    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-4 ">
      <div className="flow-root">
        <h3 className="mb-4 text-xl font-bold flex gap-2">
          <span>Email Notifications</span>
          {!isLoading && (
            <EraserIcon className="cursor-pointer" onClick={handleRestForm} />
          )}
        </h3>
        <p className="text-sm font-normal text-gray-500 mt-[-15px]">
          You can set up your preferences to get email notifications
        </p>
        <div className="divide-y divide-gray-200">
          <div className="flex justify-between items-center py-4">
            <div className="flex flex-col flex-grow">
              <div className="text-lg font-semibold text-gray-900">
                Account activity
              </div>
              <div className="text-base font-normal text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                non harum
              </div>
            </div>
            <label
              htmlFor="account-activity"
              className="flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="accountActivity"
                id="account-activity"
                className="toggle"
                onChange={handleChange}
                checked={form.accountActivity}
              />
              {/* <span className="w-11 h-6 bg-gray-200 rounded-full border-2 border-gray-200 toggle-bg" /> */}
            </label>
          </div>
          <div className="flex justify-between items-center py-4">
            <div className="flex flex-col flex-grow">
              <div className="text-lg font-semibold text-gray-900">
                Virtual assistant
              </div>
              <div className="text-base font-normal text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                non harum
              </div>
            </div>
            <label
              htmlFor="virtual-assistant"
              className="flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="virtualAssistant"
                id="virtual-assistant"
                className="toggle"
                onChange={handleChange}
                checked={form.virtualAssistant}
              />
              {/* <span className="w-11 h-6 bg-gray-200 rounded-full border-2 border-gray-200 toggle-bg" /> */}
            </label>
          </div>
          <div className="flex justify-between items-center py-4">
            <div className="flex flex-col flex-grow">
              <div className="text-lg font-semibold text-gray-900">
                Tickets status
              </div>
              <div className="text-base font-normal text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                non harum
              </div>
            </div>
            <label
              htmlFor="tickets"
              className="flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="tickets"
                id="tickets"
                className="toggle"
                onChange={handleChange}
                checked={form.tickets}
              />
              {/* <span className="w-11 h-6 bg-gray-200 rounded-full border-2 border-gray-200 toggle-bg" /> */}
            </label>
          </div>
          <div className="flex justify-between items-center py-4">
            <div className="flex flex-col flex-grow">
              <div className="text-lg font-semibold text-gray-900">
                Newsletter
              </div>
              <div className="text-base font-normal text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                non harum
              </div>
            </div>
            <label
              htmlFor="newsletter"
              className="flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="newsletter"
                id="newsletter"
                className="toggle"
                onChange={handleChange}
                checked={form.newsletter}
              />
              {/* <span className="w-11 h-6 bg-gray-200 rounded-full border-2 border-gray-200 toggle-bg" /> */}
            </label>
          </div>
          <div className="flex justify-between items-center py-4">
            <div className="flex flex-col flex-grow">
              <div className="text-lg font-semibold text-gray-900">
                Messages
              </div>
              <div className="text-base font-normal text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                non harum
              </div>
            </div>
            <label
              htmlFor="messages"
              className="flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="messages"
                id="messages"
                className="toggle"
                onChange={handleChange}
                checked={form.messages}
              />
              {/* <span className="w-11 h-6 bg-gray-200 rounded-full border-2 border-gray-200 toggle-bg" /> */}
            </label>
          </div>
        </div>
        <div className="mt-6">
          <Button
            onClick={handleSubmit}
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
    </div>
  );
}

export { EmailNotificationComponent };
