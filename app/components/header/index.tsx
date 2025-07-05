import { Button } from "../ui/button";
import { useStytchUser } from "@stytch/react";
import { NavLink } from "react-router";
import Brand from "./brand";

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
          <NavLink to="/login">
            <Button>登入</Button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
