interface UserSettingsGeneralInformationInterface {
  firstName: String;
  lastName: String;
  birthday: String;
  profilePicture: String;
  role: String;
  status: String;
  email: String;
  phoneNumber: String;
  country: String;
  city: String;
  address: String;
  zipPostalCode: String;
  organization: String;
  department: String;
  position: String;
  createdAt: String;
  updatedAt: String;
}

interface UserSettingsSessionInterface {
  id: String;
  ip: String;
  city: String;
  country: String;
  region: String;
  timezone: String;
  device: String;
  platform: String;
  os: String;
  browser: String;
  version: String;
  expiresDuration: String;
  revoked: boolean;
  userId: String;
  createdAt: String;
  updatedAt: String;
}

interface UserSettingsNotificationPreferenceInterface {
  id: String;
  newsletter: boolean;
  tickets: boolean;
  messages: boolean;
  virtualAssistant: boolean;
  accountActivity: boolean;
  usersActivity: boolean;
  userId: String;
  createdAt: String;
  updatedAt: String;
}

interface UserSettingsInterface {
  firstName: String;
  lastName: String;
  birthday: String;
  profilePicture: String;
  role: String;
  status: String;
  email: String;
  phoneNumber: String;
  country: String;
  city: String;
  address: String;
  zipPostalCode: String;
  organization: String;
  department: String;
  position: String;
  createdAt: String;
  updatedAt: String;
  emailPreference: UserSettingsNotificationPreferenceInterface;
  notificationPreference: UserSettingsNotificationPreferenceInterface;
  sessions: UserSettingsSessionInterface[];
}

interface AccountInterface {
  token: String;
  isSettingsLoaded: boolean;
  generalInformation: UserSettingsGeneralInformationInterface;
  notificationPreference: UserSettingsNotificationPreferenceInterface;
  emailPreference: UserSettingsNotificationPreferenceInterface;
  sessions: UserSettingsSessionInterface[];
  login: (token: String, rememberMe: boolean) => void;
  logout: () => void;
  loadSettings: (settings: UserSettingsInterface) => void;
  updateGeneralInformation: (generalInformation: any) => void;
  updateEmailPreference: (emailPreference: any) => void;
  updateNotificationPreference: (notificationPreference: any) => void;
  revokeSessions: (sessionsIds: String[]) => void;
}

export type {
  AccountInterface,
  UserSettingsGeneralInformationInterface,
  UserSettingsInterface,
  UserSettingsNotificationPreferenceInterface,
  UserSettingsSessionInterface,
};
