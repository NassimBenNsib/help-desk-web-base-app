import { emailForgetPassword } from "./auth.templates.forget-password";
import { emailLogin } from "./auth.templates.login";
import { emailRegister } from "./auth.templates.register";
import { emailResetPassword } from "./auth.templates.reset-password";

class AuthEmailTemplates {
  public static register(email: string): string {
    return emailRegister(email);
  }
  public static login(mailInfo: {
    data: {
      user: any;
    };
    requestInfo: any;
    company: any;
  }): string {
    return "Login";
  }
  public static forgetPassword(mailInfo: {
    data: {
      user: any;
    };
    requestInfo: any;
    company: any;
  }): string {
    return "Forget password";
  }
  public static resetPassword(mailInfo: {
    data: {
      user: any;
    };
    requestInfo: any;
    company: any;
  }): string {
    return "Reset password";
  }
}

export { AuthEmailTemplates };
