import { StytchUIClient } from "@stytch/vanilla-js";

export const stytchClient = new StytchUIClient(
    import.meta.env.STYTCH_PUBLIC_TOKEN,
);
