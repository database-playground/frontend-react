import { LogOut } from "lucide-react";
import { toast } from "sonner";
import type { BasicUserInfo } from "~/context/user-context";
import buildUri from "~/lib/build-uri";
import { Button } from "../ui/button";

export function UserInfo({ user, onLogout }: { user: BasicUserInfo, onLogout?: () => void }) {
  const handleLogout = async () => {
    const res = await fetch(buildUri("/api/auth/logout"), {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      toast.warning("無法登出。", {
        description: await res.text(),
      });
      return;
    }

    onLogout?.();
  };

  return (
    <div className="flex items-center gap-4">
      <div>
        {user.name}
      </div>

      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
        >
          <LogOut className="size-4" />
          登出
        </Button>
      </div>
    </div>
  );
}
