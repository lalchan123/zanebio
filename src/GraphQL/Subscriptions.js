import { gql } from "@apollo/client";

export const TABLE_COL_INFO_SUBSCRIPTION = gql`
  subscription {
    tableColInfoSubscription {
      payload
      TableColInfo {
        tableColId
        columnName
        colDesc
        colDataType
        colClassi
      }
    }
  }
`;
