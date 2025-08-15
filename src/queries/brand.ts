import { gql } from "@apollo/client";

export const ALL_BRANDS = gql`
  query AllBrands {
    findAllBrands {
      id
      name
    }
  }
`;
