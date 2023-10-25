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
    description
    category {
      name
    }
  }
`;

export const COMMISSION_FRAGMENT = gql`
  fragment CommissionParts on Commission {
    id
    name
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
  }
`;
