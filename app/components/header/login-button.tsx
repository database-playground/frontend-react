import { Loader, LogIn } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import buildUri from "~/lib/build-uri";

export default function LoginButton() {
    return (
        <a href={buildUri(`/api/auth/google/login`)}>
            <Button size="sm">
                <LogIn className="size-4" />
                登入
            </Button>
        </a>
    )
}
