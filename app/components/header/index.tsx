import { useStytchUser } from "@stytch/react";
import Brand from "./brand";
import LoginButton from "./login-button";

export default function Header() {
  const { user, isInitialized } = useStytchUser();
  
  return (
    <div className="flex justify-between items-center w-full py-1.5 px-6 backdrop-blur-[2px] bg-blue-50/30 border-b border-blue-200/20">
      {/* left */}
      <Brand />
      {/* right */}
      <div>
        {(isInitialized && user) ? (
          <p>Hello, {user.name.first_name}</p>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}
