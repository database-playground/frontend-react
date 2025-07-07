import { LogIn } from "lucide-react";
import buildUri from "~/lib/build-uri";
import { Button } from "../ui/button";

export default function LoginButton() {
  return (
    <a href={buildUri(`/api/auth/google/login`)}>
      <Button size="sm">
        <LogIn className="size-4" />
        登入
      </Button>
    </a>
  );
}
