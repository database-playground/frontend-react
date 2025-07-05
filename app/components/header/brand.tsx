import { NavLink } from "react-router";

export default function Brand() {
  return (
    <NavLink to="/">
      <button className="flex gap-2 items-center font-medium text-foreground cursor-pointer">
        <img
          src="https://assets.dbplay.app/logo.svg"
          alt="logo"
          className="w-4 h-4"
        />
        Database Playground
      </button>
    </NavLink>
  );
}
