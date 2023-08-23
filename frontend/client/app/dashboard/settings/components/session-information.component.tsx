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

function SessionInformationComponent() {
  const { generalInformation, token, sessions, revokeSessions } =
    useAccountStore();
  const [form, setForm] = useState(() => {
    return sessions.map((session) => {
      return { ...session };
    });
  });

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any | null>();

  async function handleSubmit() {
    setIsLoading(true);
    const values: Array<String> = [];
    form.forEach((session) => {
      if (session.revoked) values.push(session.id);
    });
    UserSettingsServices.revokeSessions(token, values)
      .then((data) => {
        setResponse(data);
        if (data.type === "success") revokeSessions(values);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleRevokeSession(index: number) {
    setForm((prev) => {
      const newForm = [...prev];
      newForm[index].revoked = !newForm[index].revoked;
      return newForm;
    });
  }

  function handleRestForm() {
    setForm(
      sessions.map((session) => {
        return { ...session };
      })
    );
  }
  return (
    <div className="bg-white shadow-lg shadow-gray-200 rounded-2xl p-4 mb-4 xl:mb-0">
      <div className="flow-root">
        <h3 className="mb-4 text-xl font-bold flex gap-2">
          <span>Sessions</span>
          {!isLoading && (
            <EraserIcon className="cursor-pointer" onClick={handleRestForm} />
          )}
        </h3>
        <ul className="divide-y divide-gray-200">
          {form.map((session, index) => {
            if (session.revoked) return "";
            return (
              <li className="py-4" key={session.id.toString()}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">
                      {session.city}/{session.country} {session.ip}
                    </p>
                    <p className="text-sm font-normal text-gray-500 truncate">
                      {session.browser} on {session.os}
                    </p>
                  </div>
                  <div className="inline-flex items-center">
                    <Button
                      onClick={() => {
                        handleRevokeSession(index);
                      }}
                      className="py-2 px-3 mr-3 mb-3 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-fuchsia-200"
                    >
                      Revoke
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="py-3 px-5 w-full text-base font-medium text-center text-white bg-gradient-to-br from-primary to-primary hover:scale-[1.04] shadow-md shadow-gray-300 transition-transform rounded-lg sm:w-auto mt-5"
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

export { SessionInformationComponent };
