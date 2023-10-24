import { gql, useQuery } from "@apollo/client";
import { MeQuery } from "../__api__/types";

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      username
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<MeQuery>(ME_QUERY);
};
