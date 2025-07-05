import { useStytch } from "@stytch/react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function LoginButton() {
    const stytch = useStytch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleGoogleLogin = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        await stytch.oauth.google.start({
          login_redirect_url: `${window.location.origin}/authenticate`,
          signup_redirect_url: `${window.location.origin}/authenticate`,
        });
      } catch (err) {
        console.error('OAuth error:', err);
        setError('登入時發生錯誤，請稍後再試');
      } finally {
        setIsLoading(false);
      }
    };

    return (
        <Button onClick={handleGoogleLogin} disabled={isLoading}>
            {isLoading ? <Loader /> : '登入'}
        </Button>
    )
}
