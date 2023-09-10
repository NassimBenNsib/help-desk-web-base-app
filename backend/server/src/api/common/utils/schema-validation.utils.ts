import {
  COUNTRIES,
  LANGUAGES,
  THEMES,
  TIMEZONES,
} from "../../../../lib/internal.lib";
import { z, ZCoerce } from "../../../../lib/external.lib";
import { TicketCategory, TicketPriority, TicketStatus } from "@prisma/client";

class SchemaValidationUtils {
  public static email = z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .trim()
    .min(1, "Email should not be empty")
    .email({
      message: "Email is not valid",
    })
    .max(50, "Email too long - should be 50 chars maximum");
  public static password = z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .trim()
    .min(1, "Password should not be empty")
    .min(8, "Password too short - should be 8 chars minimum")
    .max(20, "Password too long - should be 20 chars maximum")
    .regex(/[a-z]/, {
      message: "Password must have at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must have at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must have at least one number",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must have at least one special character",
    });
  public static oldPassword = z
    .string({
      required_error: "Old Password is required",
      invalid_type_error: "Old Password must be a string",
    })
    .trim()
    .min(1, "Old Password should not be empty")
    .min(6, "Old Password too short - should be 6 chars minimum")
    .max(20, "Old Password too long - should be 20 chars maximum")
    .regex(/[a-z]/, {
      message: "Old Password must have at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Old Password must have at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Old Password must have at least one number",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Old Password must have at least one special character",
    });
  public static newPassword = z
    .string({
      required_error: "New Password is required",
      invalid_type_error: "New Password must be a string",
    })
    .trim()
    .min(1, "New Password should not be empty")
    .min(6, "New Password too short - should be 6 chars minimum")
    .max(20, "New Password too long - should be 20 chars maximum")
    .regex(/[a-z]/, {
      message: "New Password must have at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "New Password must have at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "New Password must have at least one number",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "New Password must have at least one special character",
    });
  public static passwordConfirmation = z
    .string({
      required_error: "Password confirmation is required",
      invalid_type_error: "Password confirmation must be a string",
    })
    .trim()
    .min(1, "Password confirmation should not be empty");
  public static termsAndConditions = z
    .boolean({
      required_error: "You must accept the terms and conditions",
      invalid_type_error: "You must accept the terms and conditions",
    })
    .refine((data) => data === true, {
      message: "You must accept the terms and conditions",
    });

  public static userId = z
    .string({
      required_error: "User ID is required",
      invalid_type_error: "User ID must be a string",
    })
    .trim()
    .min(1, "User ID should not be empty")
    .uuid({
      message: "User ID is not valid",
    })
    .max(50, "User ID too long - should be 50 chars maximum");

  public static ticketId = z
    .string({
      required_error: "Ticket ID is required",
      invalid_type_error: "Ticket ID must be a string",
    })
    .trim()
    .min(1, "Ticket ID should not be empty")
    .uuid({
      message: "Ticket ID is not valid",
    })
    .max(50, "Ticket ID too long - should be 50 chars maximum");

  public static sessionId = z
    .string({
      required_error: "Session ID is required",
      invalid_type_error: "Session ID must be a string",
    })
    .trim()
    .min(1, "Session ID should not be empty")
    .uuid({
      message: "Session ID is not valid",
    });

  public static resetPasswordCode = z
    .string({
      required_error: "Reset Password Code is required",
      invalid_type_error: "Reset Password Code must be a string",
    })
    .trim()
    .min(1, "Reset Password Code should not be empty")
    .uuid({
      message: "Reset Password Code is not valid",
    })
    .max(50, "Reset Password code too long - should be 50 chars maximum");
  public static firstName = z
    .string({
      required_error: "First Name is required",
      invalid_type_error: "First Name must be a string",
    })
    .trim()
    .min(1, "First Name should not be empty")
    .min(3, "First Name should be at least 3 characters long")
    .max(18, "First Name should be at most 18 characters long")
    .refine(
      (value) => {
        const words = value.split(" ");
        return words.every((word) => /^[A-Z][a-z]{2,}$/.test(word));
      },
      {
        message:
          "First Name must be composite with at least 3 characters per word, and each word must start with a capital letter.",
      }
    );
  public static lastName = z
    .string({
      required_error: "Last Name is required",
      invalid_type_error: "Last Name must be a string",
    })
    .trim()
    .min(1, "Last Name should not be empty")
    .min(3, "Last Name should be at least 3 characters long")
    .max(18, "Last Name should be at most 18 characters long")
    .refine(
      (value) => {
        const words = value.split(" ");
        return words.every((word) => /^[A-Z][a-z]{2,}$/.test(word));
      },
      {
        message:
          "Last Name must be composite with at least 3 characters per word, and each word must start with a capital letter.",
      }
    );
  public static zipPostalCode = z
    .string({
      required_error: "Zip/Postal Code is required",
      invalid_type_error: "Zip/Postal Code must be a string",
    })
    .trim()
    .min(1, "Zip/Postal Code should not be empty")
    .min(3, "Zip/Postal Code should be at least 3 characters long")
    .max(15, "Zip/Postal Code should be at most 15 characters long");
  public static city = z
    .string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    })
    .trim()
    .min(1, "City should not be empty")
    .min(3, "City should be at least 3 characters long")
    .max(15, "City should be at most 15 characters long");
  public static address = z
    .string({
      required_error: "Address is required",
      invalid_type_error: "Address must be a string",
    })
    .min(1, "Address should not be empty")
    .min(3, "Address should be at least 3 characters long")
    .max(30, "Address should be at most 30 characters long");
  public static state = z
    .string({
      required_error: "State is required",
      invalid_type_error: "State must be a string",
    })
    .trim()
    .min(1, "State should not be empty")
    .min(3, "State should be at least 3 characters long")
    .max(30, "State should be at most 30 characters long");
  public static phoneNumber = z
    .string({
      required_error: "Phone Number is required",
      invalid_type_error: "Phone Number must be a string",
    })
    .trim()
    .min(1, "Phone Number should not be empty")
    .min(8, "Phone Number should be at least 8 characters long")
    .max(15, "Phone Number should be at most 15 characters long")
    .regex(/^\+/, {
      message: "Phone Number must start with a +",
    })
    .regex(/^\+?[0-9]{6,}$/, {
      message: "Phone Number must be a number",
    });
  public static country = z
    .string({
      required_error: "Country is required",
      invalid_type_error: "Country must be a string",
    })
    .trim()
    .min(1, "Country should not be empty")
    .min(3, "Country should be at least 3 characters long")
    .max(30, "Country should be at most 30 characters long")
    .refine((value) => COUNTRIES.includes(value), {
      message: "Country is not valid",
    });
  public static organizationName = z
    .string({
      required_error: "Organization Name is required",
      invalid_type_error: "Organization Name must be a string",
    })
    .trim()
    .min(1, "Organization Name should not be empty")
    .min(3, "Organization Name should be at least 3 characters long")
    .max(30, "Organization Name should be at most 30 characters long");
  public static departmentName = z
    .string({
      required_error: "Department is required",
      invalid_type_error: "Department must be a string",
    })
    .trim()
    .min(1, "Department should not be empty")
    .min(3, "Department should be at least 3 characters long")
    .max(30, "Department should be at most 30 characters long");
  public static position = z
    .string({
      required_error: "Position is required",
      invalid_type_error: "Position must be a string",
    })
    .trim()
    .min(1, "Position should not be empty")
    .min(3, "Position should be at least 3 characters long")
    .max(30, "Position should be at most 30 characters long");

  public static birthday = z
    .string({
      required_error: "Birthday is required",
      invalid_type_error: "Birthday must be a string",
    })
    .refine((value) => {
      return !isNaN(Date.parse(value));
    }, "Birthday must be a valid date")
    .refine((value) => {
      return new Date(value) < new Date();
    }, "Birthday should be at most today")
    .refine((value) => {
      return new Date(value) > new Date(1900, 0, 1);
    }, "Birth Date should be at least 1900")
    .refine((value) => {
      return new Date().getFullYear() - new Date(value).getFullYear() >= 18;
    }, "You must be at least 18 years old");
  public static isNewsLetter = z.boolean({
    required_error: "Newsletter is required",
    invalid_type_error: "Newsletter must be a boolean",
  });
  public static isTickets = z.boolean({
    required_error: "Tickets is required",
    invalid_type_error: "Tickets must be a boolean",
  });
  public static isMessages = z.boolean({
    required_error: "Messages is required",
    invalid_type_error: "Messages must be a boolean",
  });
  public static isVirtualAssistant = z.boolean({
    required_error: "Virtual Assistant is required",
    invalid_type_error: "Virtual Assistant must be a boolean",
  });
  public static isAccountActivity = z.boolean({
    required_error: "Account Activity is required",
    invalid_type_error: "Account Activity must be a boolean",
  });
  public static isUsersActivity = z.boolean({
    required_error: "Users Activity is required",
    invalid_type_error: "Users Activity must be a boolean",
  });
  public static fontSize = z
    .number({
      required_error: "Font Size is required",
      invalid_type_error: "Font Size must be a number",
    })
    .int({
      message: "Font Size must be an integer",
    })
    .min(5, {
      message: "Font Size must be at least 5px",
    })
    .max(150, {
      message: "Font Size must be at most 50px",
    });
  public static theme = z
    .string({
      required_error: "Theme is required",
      invalid_type_error: "Theme must be a string",
    })
    .refine((value) => THEMES.includes(value), {
      message: "Theme is not valid",
    });
  public static language = z
    .string({
      required_error: "Language is required",
      invalid_type_error: "Language must be a string",
    })
    .refine((value) => LANGUAGES.includes(value), {
      message: "Language is not valid",
    });
  public static timeZone = z
    .string({
      required_error: "Time Zone is required",
      invalid_type_error: "Time Zone must be a string",
    })
    .refine((value) => TIMEZONES.includes(value), {
      message: "Time Zone is not valid",
    });
  public static ticketTitle = z
    .string({
      required_error: "Ticket Title is required",
      invalid_type_error: "Ticket Title must be a string",
    })
    .trim()
    .min(1, "Ticket Title should not be empty")
    .min(3, "Ticket Title should be at least 3 characters long")
    .max(30, "Ticket Title should be at most 30 characters long");
  public static ticketDescription = z
    .string({
      required_error: "Ticket Description is required",
      invalid_type_error: "Ticket Description must be a string",
    })
    .trim()
    .min(1, "Ticket Description should not be empty")
    .min(20, "Ticket Description should be at least 20 characters long")
    .max(1000, "Ticket Description should be at most 1000 characters long");
  public static ticketPriority = z
    .string({
      required_error: "Ticket Priority is required",
      invalid_type_error: "Ticket Priority must be a string",
    })
    .refine((value: any) => {
      return Object.values(TicketPriority).includes(value as TicketPriority);
    }, "Ticket Priority is not valid");
  public static ticketStatus = z
    .string({
      required_error: "Ticket Status is required",
      invalid_type_error: "Ticket Status must be a string",
    })
    .refine((value: any) => {
      return Object.values(TicketStatus).includes(value as TicketStatus);
    }, "Ticket Status is not valid");
  public static ticketCategory = z
    .string({
      required_error: "Ticket Category is required",
      invalid_type_error: "Ticket Category must be a string",
    })
    .refine((value: any) => {
      return Object.values(TicketCategory).includes(value as TicketCategory);
    }, "Ticket Category is not valid");
  public static ticketTag = z
    .string({
      required_error: "Ticket Tags is required",
      invalid_type_error: "Ticket Tag must be a string",
    })
    .min(1, "Ticket Tag should not be empty")
    .min(3, "Ticket Tag should be at least 3 characters long")
    .max(30, "Ticket Tag should be at most 30 characters long");
  public static ticketTags = z.array(this.ticketTag);
  public static image = z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image must be a string",
    })
    .min(1, "Image should not be empty")
    .max(50, "Image should be at most 50 characters long")
    .uuid({
      message: "Image must be a valid uuid",
    });
  public static images = z.array(this.image);
  public static video = z
    .string({
      required_error: "Video is required",
      invalid_type_error: "Video must be a string",
    })
    .min(1, "Video should not be empty")
    .max(50, "Video should be at most 50 characters long")
    .uuid({
      message: "Video must be a valid uuid",
    });
  public static videos = z.array(this.video);
  public static audio = z
    .string({
      required_error: "Audio is required",
      invalid_type_error: "Audio must be a string",
    })
    .min(1, "Audio should not be empty")
    .max(50, "Audio should be at most 50 characters long")
    .uuid({
      message: "Audio must be a valid uuid",
    });
  public static audios = z.array(this.audio);
  public static document = z
    .string({
      required_error: "Document is required",
      invalid_type_error: "Document must be a string",
    })
    .min(1, "Document should not be empty")
    .max(50, "Document should be at most 50 characters long")
    .uuid({
      message: "Document must be a valid uuid",
    });
  public static documents = z.array(this.document);
  public static limit = z
    .number({
      required_error: "Limit is required",
      invalid_type_error: "Limit must be a number",
    })
    .int({
      message: "Limit must be an integer",
    })
    .min(1, {
      message: "Limit must be at least 1",
    })
    .max(51, {
      message: "Limit of Rows must be at most 51",
    });
  public static start = z
    .number({
      required_error: "Start is required",
      invalid_type_error: "Start must be a number",
    })
    .int({
      message: "Start must be an integer",
    })
    .min(0, {
      message: "Start must be at least 0",
    })
    .max(10000, {
      message: "Start must be at most 10000",
    });
}

export { SchemaValidationUtils };
