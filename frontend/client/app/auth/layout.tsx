"use client";

import { useAccountStore } from "@/common/stores";
import { useEffect, useRouter, useState } from "@/common/hooks";
import { CustomRootLoading } from "@/common/components";
import { LocalStorageUtils } from "@/common/utils";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, login } = useAccountStore();
  const router = useRouter();
  const [isReady, setIsReady] = useState<boolean | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (!token) {
        const currentToken = LocalStorageUtils.get("token");
        if (currentToken) {
          login(currentToken, true);
          setIsReady(true);
        } else {
          setIsReady(false);
        }
      } else {
        setIsReady(true);
      }
    }, 1000);
  }, [token]);

  if (isReady === null) return <CustomRootLoading />;
  if (isReady === true) {
    router.replace("/dashboard/settings");
    return <CustomRootLoading />;
  } else {
    return <>{children}</>;
  }
}
