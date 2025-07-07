import { createContext, useContext } from "react";
import {} from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { graphql } from "~/gql";
import type { BasicUserInfoQuery } from "~/gql/graphql";

export type BasicUserInfo = BasicUserInfoQuery["me"];

export interface UserContext {
  user?: BasicUserInfo;
  isInitialized: boolean;
}

const userContext = createContext<UserContext>({
  user: undefined,
  isInitialized: false,
});

const userQuery = graphql(`
    query BasicUserInfo {
        me {
            name
            email
        }
    }
`);

export function useUser() {
  const user = useContext(userContext);
  if (!user) {
    throw new Error("UserContext not found");
  }

  return user;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, loading } = useQuery(userQuery);

  return (
    <userContext.Provider
      value={{
        user: data?.me,
        isInitialized: !loading,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
