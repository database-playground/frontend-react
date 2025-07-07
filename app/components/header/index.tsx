import { useUser } from "~/context/user-context";
import Spinner from "../ui/spinner";
import Brand from "./brand";
import LoginButton from "./login-button";
import { UserInfo } from "./user-info";

export default function Header({ onLogout }: { onLogout?: () => void }) {
  const { user, isInitialized } = useUser();
  const handleLogout = onLogout ?? (() => location.reload());

  return (
    <div
      className={`
        flex h-12 w-full items-center justify-between border-b
        border-blue-200/20 bg-blue-50/30 px-6 py-2 backdrop-blur-[2px]
      `}
    >
      {/* left */}
      <Brand />
      {/* right */}
      <div>
        {isInitialized
          ? (
            user ? <UserInfo user={user} onLogout={handleLogout} /> : <LoginButton />
          )
          : <Spinner className="size-6" />}
      </div>
    </div>
  );
}
