import { gql } from "@apollo/client";

export const STORE_FRAGMENT = gql`
  fragment StoreParts on Store {
    id
    name
    coverImg
    category {
      name
    }
  }
`;
