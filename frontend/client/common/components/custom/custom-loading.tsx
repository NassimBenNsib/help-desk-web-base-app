import { Lottie } from "../core";
import { RootLoading } from "@/assets/animation";

function CustomRootLoading() {
  return (
    <div className="h-screen w-screen">
      <Lottie className="h-full w-full" animationData={RootLoading} />
    </div>
  );
}

export { CustomRootLoading };
