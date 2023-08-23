import { axios, ErrorUtils } from "@/common/utils";
import { API_CONFIG, API_URL } from "@/config";

export class AuthServices {
  static async register(data: {
    email: String;
    password: String;
    passwordConfirmation: String;
    termsAndConditions: Boolean;
  }) {
    try {
      const response = await axios.post(
        `${API_URL}${API_CONFIG.endpoints.auth.register}`,
        data
      );

      return response.data;
    } catch (error: any) {
      return ErrorUtils.getErrorMessageFromErrorResponse(error);
    }
  }

  static async forgotPassword(data: {
    email: String;
    termsAndConditions: Boolean;
  }) {
    try {
      const response = await axios.post(
        `${API_URL}${API_CONFIG.endpoints.auth.forgetPassword}`,
        data
      );

      return response.data;
    } catch (error: any) {
      return ErrorUtils.getErrorMessageFromErrorResponse(error);
    }
  }

  static async resetPassword(data: {
    email: String;
    newPassword: String;
    passwordConfirmation: String;
    code: String;
  }) {
    try {
      const response = await axios.put(
        `${API_URL}${API_CONFIG.endpoints.auth.resetPassword}`,
        data
      );

      return response.data;
    } catch (error: any) {
      return ErrorUtils.getErrorMessageFromErrorResponse(error);
    }
  }

  static async login(data: { email: String; password: String }) {
    try {
      const response = await axios.post(
        `${API_URL}${API_CONFIG.endpoints.auth.login}`,
        data
      );

      return response.data;
    } catch (error: any) {
      return ErrorUtils.getErrorMessageFromErrorResponse(error);
    }
  }
}
