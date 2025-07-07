import { NavLink } from "react-router";

export default function Brand() {
  return (
    <NavLink to="/">
      <button
        className={`
          flex cursor-pointer items-center gap-2 font-medium text-foreground
        `}
      >
        <img
          src="https://assets.dbplay.app/logo.svg"
          alt="logo"
          className="h-4 w-4"
        />
        Database Playground
      </button>
    </NavLink>
  );
}
