import { axios, ErrorUtils } from "@/common/utils";
import { API_CONFIG, API_URL } from "@/config";

export class UserSettingsServices {
  static async changeGeneralInformation(
    token: String,
    data: {
      address: String;
      city: String;
      country: String;
      email: String;
      firstName: String;
      lastName: String;
      birthday: String;
      department: String;
      organization: String;
      phoneNumber: String;
      position: String;
      zipPostalCode: String;
    }
  ) {
    try {
      const response = await axios.put(
        `${API_URL}${API_CONFIG.endpoints.settings.changeGeneralInformation}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return ErrorUtils.getErrorMessageFromErrorResponse(error);
    }
  }

  static async changeEmailPreference(
    token: String,
    data: {
      accountActivity: Boolean;
      messages: Boolean;
      newsletter: Boolean;
      tickets: Boolean;
      usersActivity: Boolean;
      virtualAssistant: Boolean;
    }
  ) {
    try {
      const response = await axios.put(
        `${API_URL}${API_CONFIG.endpoints.settings.changeEmailPreference}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return ErrorUtils.getErrorMessageFromErrorResponse(error);
    }
  }

  static async changeNotificationPreference(
    token: String,
    data: {
      accountActivity: Boolean;
      messages: Boolean;
      newsletter: Boolean;
      tickets: Boolean;
      usersActivity: Boolean;
      virtualAssistant: Boolean;
    }
  ) {
    try {
      const response = await axios.put(
        `${API_URL}${API_CONFIG.endpoints.settings.changeNotificationPreference}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return ErrorUtils.getErrorMessageFromErrorResponse(error);
    }
  }

  static async changePassword(
    token: String,
    data: {
      oldPassword: String;
      newPassword: String;
      passwordConfirmation: String;
    }
  ) {
    try {
      const response = await axios.put(
        `${API_URL}${API_CONFIG.endpoints.settings.changePassword}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return ErrorUtils.getErrorMessageFromErrorResponse(error);
    }
  }

  static async revokeSessions(token: String, data: String[]) {
    try {
      const response = await axios.put(
        `${API_URL}${API_CONFIG.endpoints.settings.revokeSessions}`,
        {
          sessionsIds: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return ErrorUtils.getErrorMessageFromErrorResponse(error);
    }
  }

  static async getProfile(token: String) {
    try {
      const response = await axios.post(
        `${API_URL}${API_CONFIG.endpoints.settings.getProfile}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return ErrorUtils.getErrorMessageFromErrorResponse(error);
    }
  }
}
