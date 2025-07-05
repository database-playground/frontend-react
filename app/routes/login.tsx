import { StytchLogin } from "@stytch/react";
import { Products, OAuthProviders } from "@stytch/vanilla-js";
import BaseLayout from "~/components/layout/base";

export default function LoginOrSignupPage() {
  const config = {
    products: [Products.oauth],
    oauthOptions: {
      providers: [
        {
          type: OAuthProviders.Google,
        },
      ],
    },
  };

  return (
    <BaseLayout containerClassName="mx-auto">
      <StytchLogin
        config={config}
        styles={{
          container: {
            backgroundColor: 'transparent',
            width: '100%',
          },
          fontFamily: "IBM Plex Sans JP, sans-serif",
          colors: {
            primary: 'oklch(0.25 0.2 250)',
            secondary: 'oklch(0.95 0.02 250)',
          },
          logo: {
            logoImageUrl: 'https://assets.dbplay.app/logo.svg',
          }
        }}
        strings={{
          "login.title": "註冊或登入",
          "login.loading": "正在登入 ……",
          "login.success.content": "登入成功",
          "oauth.continueWithGoogle": "使用 Google 登入",
          "watermark.altText": "Stytch 技術支援",
        }}
      />
    </BaseLayout>
  );
}
