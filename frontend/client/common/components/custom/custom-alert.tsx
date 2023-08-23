import { Alert, AlertDescription, AlertTitle } from "@/common/components";

function CustomSuccessAlert(props: {
  message: string;
  title: string;
  hint: string;
  className?: string;
}) {
  return (
    <Alert
      className={`animate-fade-up animate-infinity text-white bg-primary ${
        props.className || ""
      }`}
    >
      <AlertTitle>{props?.title}</AlertTitle>
      <AlertDescription>
        {props?.message} {props?.hint}
      </AlertDescription>
    </Alert>
  );
}
function CustomErrorAlert(props: {
  message: string;
  title: string;
  hint: string;
  className?: string;
}) {
  return (
    <Alert
      className={`animate-fade-up animate-infinity text-white bg-red-500 ${
        props.className || ""
      }`}
    >
      <AlertTitle>{props?.title}</AlertTitle>
      <AlertDescription>
        {props?.message} {props?.hint}
      </AlertDescription>
    </Alert>
  );
}

export { CustomSuccessAlert, CustomErrorAlert };
