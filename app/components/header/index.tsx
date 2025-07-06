import { useStytchUser } from "@stytch/react";
import Brand from "./brand";
import LoginButton from "./login-button";
import { useUser } from "~/context/user-context";
import { Loader } from "lucide-react";
import Spinner from "../ui/spinner";

export default function Header() {
  const { user, isInitialized } = useUser();

  return (
    <div className="flex justify-between items-center w-full h-12 py-2 px-6 backdrop-blur-[2px] bg-blue-50/30 border-b border-blue-200/20">
      {/* left */}
      <Brand />
      {/* right */}
      <div>
        {isInitialized ? (
          user ? (
            <p>Hello, {user.name}</p>
          ) : (
            <LoginButton />
          )
        ) : (
          <Spinner className="size-6" />
        )}
      </div>
    </div>
  );
}
