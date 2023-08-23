"use client";

import { LocalStorageUtils, create, formatDateFNS } from "@/common/utils";
import type {
  AccountInterface,
  UserSettingsGeneralInformationInterface,
  UserSettingsInterface,
  UserSettingsNotificationPreferenceInterface,
} from "@/common/types";

const defaultGeneralInformation: UserSettingsGeneralInformationInterface = {
  address: "",
  birthday: "",
  city: "",
  country: "",
  createdAt: "",
  department: "",
  email: "",
  firstName: "",
  lastName: "",
  organization: "",
  phoneNumber: "",
  position: "",
  profilePicture: "",
  role: "",
  status: "",
  updatedAt: "",
  zipPostalCode: "",
};
const defaultNotificationSetting: UserSettingsNotificationPreferenceInterface =
  {
    accountActivity: true,
    createdAt: "",
    messages: true,
    userId: "",
    newsletter: true,
    tickets: true,
    updatedAt: "",
    usersActivity: true,
    virtualAssistant: true,
    id: "",
  };
const useAccountStore = create<AccountInterface>((set) => ({
  // initial state
  token: "",
  isSettingsLoaded: false,
  generalInformation: defaultGeneralInformation,
  notificationPreference: defaultNotificationSetting,
  emailPreference: defaultNotificationSetting,
  sessions: [],
  // methods for manipulating state
  login: (token: String, rememberMe: Boolean) => {
    if (rememberMe) LocalStorageUtils.set("token", token);
    set((state) => ({
      ...state,
      token: token,
    }));
  },
  logout: () => {
    LocalStorageUtils.remove("token");
    LocalStorageUtils.remove("generalInformation");
    LocalStorageUtils.remove("emailPreference");
    set((state) => ({
      ...state,
      token: "",
      generalInformation: defaultGeneralInformation,
      notificationPreference: defaultNotificationSetting,
      emailPreference: defaultNotificationSetting,
    }));
  },
  updateGeneralInformation: (
    generalInformation: UserSettingsGeneralInformationInterface
  ) => {
    LocalStorageUtils.set(
      "generalInformation",
      JSON.stringify(generalInformation)
    );

    set((state) => ({
      ...state,
      generalInformation: {
        ...state.generalInformation,
        ...generalInformation,
      },
    }));
  },
  updateEmailPreference: (emailPreference: any) => {
    LocalStorageUtils.set("emailPreference", JSON.stringify(emailPreference));
    set((state) => ({
      ...state,
      emailPreference: {
        ...state.emailPreference,
        ...emailPreference,
      },
    }));
  },
  updateNotificationPreference: (notificationPreference: any) => {
    LocalStorageUtils.set(
      "notificationPreference",
      JSON.stringify(notificationPreference)
    );
    set((state) => ({
      ...state,
      notificationPreference: {
        ...state.notificationPreference,
        ...notificationPreference,
      },
    }));
  },
  revokeSessions: (sessionsIds: String[]) => {
    set((state) => ({
      ...state,
      sessions: state.sessions.filter(
        (session) => !sessionsIds.includes(session.id)
      ),
    }));
  },
  loadSettings: (userSettings: UserSettingsInterface) => {
    const generalInformation = {
      firstName: userSettings.firstName,
      lastName: userSettings.lastName,
      birthday: userSettings.birthday.slice(0, 10),
      profilePicture: userSettings.profilePicture,
      role: userSettings.role,
      status: userSettings.status,
      email: userSettings.email,
      phoneNumber: userSettings.phoneNumber,
      country: userSettings.country,
      city: userSettings.city,
      address: userSettings.address,
      zipPostalCode: userSettings.zipPostalCode,
      organization: userSettings.organization,
      department: userSettings.department,
      position: userSettings.position,
      createdAt: userSettings.createdAt,
      updatedAt: userSettings.updatedAt,
    };
    // if (userSettings.birthday) {
    //   const date = new Date(Date.parse(userSettings.birthday.toString()));
    //   generalInformation.birthday = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;
    // }
    LocalStorageUtils.set(
      "notificationPreference",
      JSON.stringify(userSettings.notificationPreference)
    );
    LocalStorageUtils.set(
      "emailPreference",
      JSON.stringify(userSettings.emailPreference)
    );
    LocalStorageUtils.set(
      "generalInformation",
      JSON.stringify({
        generalInformation,
      })
    );
    LocalStorageUtils.set("sessions", JSON.stringify(userSettings.sessions));
    set((state) => ({
      ...state,
      generalInformation,
      notificationPreference: userSettings.notificationPreference,
      emailPreference: userSettings.emailPreference,
      sessions: userSettings.sessions,
      isSettingsLoaded: true,
    }));
  },
}));

export { useAccountStore };
