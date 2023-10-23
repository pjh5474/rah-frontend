import { gql } from "@apollo/client";

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryParts on Category {
    id
    name
    coverImg
    slug
    storeCount
  }
`;

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
