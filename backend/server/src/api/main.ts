import {
  ApplicationCore,
  ConsoleUtils,
  DatabaseCore,
  FileUploaderCore,
  MailerCore,
} from "../lib/internal.lib";

ConsoleUtils.clear();

(async () => {
  console.group("File uploader configuration");
  FileUploaderCore.init();
  await FileUploaderCore.setup();
  console.groupEnd();

  console.group("Mailer configuration");
  MailerCore.init();
  await MailerCore.setup();
  console.groupEnd();

  console.group("Database configuration");
  DatabaseCore.init();
  await DatabaseCore.setup();
  console.groupEnd();

  console.group("Application configuration");
  ApplicationCore.init();
  ApplicationCore.setup();
  console.groupEnd();
  console.group("Application start");
  ApplicationCore.start();
  process.on("SIGINT", () => {
    ConsoleUtils.warn("SIGINT signal received.");
    DatabaseCore.disconnect();
  });
  process.on("SIGTERM", () => {
    ConsoleUtils.warn("SIGTERM signal received.");
    DatabaseCore.disconnect();
  });
})();
