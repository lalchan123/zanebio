import { gql } from "@apollo/client";

// export const GET_COURSE_INFO = gql`
//   {
//     courseInfo {
//       courseId
//       courseDesc
//       courseShortDesc
//       courseLength
//     }
//   }
// `;

// export const GET_CONTENT_DESCRIPTION_MASTER = gql`
//   {
//     contentDescriptionMaster {
//       cdmId
//       cconDescTitle
//       cconDescSubTitle
//     }
//   }
// `;

// export const GET_CONTENT_DESCRIPTION_DETAIL = gql`
//   {
//     contentDescriptionDetail {
//       id
//       contentsBody
//     }
//   }
// `;

// export const GET_CONTENT_MCQ_MASTER = gql`
//   {
//     contentMcqMaster {
//       id
//       cdmId {
//         cdmId
//         cconDescTitle
//         cconDescSubTitle
//       }
//       mcqQuestion
//       mcqQMulti
//     }
//   }
// `;

// export const GET_CONTENT_MCQ_DETAIL = gql`
//   {
//     contentMcqDetail {
//       id
//       mcqId {
//         cdmId {
//           courseId
//           cconDescTitle
//           cconDescSubTitle
//           courseSlno
//           contentType
//         }
//         mcqQuestion
//         mcqQMulti
//       }
//       mcqChoice
//       mcqChoiceSlno
//       mcqChoiceType
//       mcqQImageUrl
//     }
//   }
// `;

// export const GET_TABLE_COL_INFO = gql`
//   {
//     tableColInfo {
//       tableColId
//       columnName
//       colDataType
//       colDesc
//       colClassi
//     }
//   }
// `;

export const GET_TABLE_DATA_INFO = gql`
  {
    userTableDataInfo(tableId: 6, tableColId: 2) {
      tableId
      tableColId
      tableRefId
      tabRelId
      columnData
      columnName
    }
  }
`;

export const GET_TABLE_DATA = gql`
  query getTableDataInfo($tableId: Int, $tableColId: Int, $columnData: String) {
    getTableDataInfo(
      tableId: $tableId
      colId: $tableColId
      columnData: $columnData
    ) {
      tableDataId
      tableId
      tableColId
      columnData
      tabRelId
    }
  }
`;

export const GET_TABLE_MASTER_DETIAL_DATA = gql`
  {
    tableDataMd(tableId: tableId, colId: colId, columnData: columnData) {
      columnData
      tableColId
      tableId
      tabRelId
      tableRefId
    }
  }
`;

export const TABLE_DATA_DETAIL = gql`
  query getTableDataRelIdInfo(
    $tableId: Int
    $tableColId: Int
    $tabRelId: String
    $userId: String!
  ) {
    getTableDataRelIdInfo(
      tableId: $tableId
      tableColId: $tableColId
      tabRelId: $tabRelId
      userId: $userId
    ) {
      tableDataId
      columnData
      tableColId
      tableId
      tabRelId
      tableRefId
      colDataType
      userId
    }
  }
`;

export const TABLE_DATA_DETAIL2 = gql`
  query getTableDataRelIdInfo2(
    $tableId: Int
    $tableColId: Int
    $tabRelId: String
    $userId: String!
  ) {
    getTableDataRelIdInfo2(
      tableId: $tableId
      tableColId: $tableColId
      tabRelId: $tabRelId
      userId: $userId
    ) {
      tableDataId
      columnData
      tableColId
      tableId
      tabRelId
      tableRefId
      colDataType
      userId
    }
  }
`;

export const TABLE_DATA_BOX_DETAIL = gql`
  query getTableDataRefIdInfo(
    $tableId: Int
    $tableColId: Int
    $tableRefId: String
  ) {
    getTableDataRefIdInfo(
      tableId: $tableId
      tableColId: $tableColId
      tableRefId: $tableRefId
    ) {
      columnData
      tableColId
      tableId
      tabRelId
      tableRefId
      userId
    }
  }
`;

export const TABLE_DATA_BOX_DETAIL_REF = gql`
  query getTableDataRefIdInfo(
    $tableId: Int
    $tableColId: Int
    $tableRefId: String
  ) {
    getTableDataRefIdInfo(
      tableId: $tableId
      tableColId: $tableColId
      tableRefId: $tableRefId
    ) {
      tableColId
      columnData
      tableDataId
      tabRelId
      tableRefId
      userId
    }
  }
`;

export const TABLE_ADMIN_DATA = gql`
  query qGetTableDataInfo($Qselect: String!, $Qfrom: String!, $Qwhere: String) {
    qGetTableDataInfo(Qselect: $Qselect, Qfrom: $Qfrom, Qwhere: $Qwhere) {
      itemData
    }
  }
`;

export const TABLE_DATA_DETAIL_TEST = gql`
  query getTableDataRelIdInfo(
    $tableId: Int
    $tableColId: Int
    $tabRelId: String
  ) {
    getTableDataRelIdInfo(
      tableId: $tableId
      tableColId: $tableColId
      tabRelId: $tabRelId
    ) {
      tableDataId
      columnData
      tableColId
      tableId
      tabRelId
      tableRefId
      colDataType
    }
  }
`;

export const TABLE_DATA_SEARCH_QUERY = gql`
  query getCourseRelatedSearch($search: String) {
    getCourseRelatedSearch(search: $search) {
      mcqData
    }
  }
`;

export const GET_NODE_DESIGN_DATA_QUERY = gql`
  query getNodeDesignData($name: String) {
    getNodeDesignData(name: $name) {
      mcqData
    }
  }
`;

export const GET_TABLE_DATA_QUERY = gql`
  query getTableInfoDtl($tableName: String!) {
    getTableInfoDtl(tableName: $tableName) {
      tableId
      tableName
      tableDescription
      tableType
    }
  }
`;

export const GET_TABLE_COL_DATA_QUERY = gql`
  query getTableInfoDtl($tableId: Int!) {
    getTableInfoDtl(tableId: $tableId) {
      tableId
      tableName
      tableDescription
      tableType
    }
  }
`;

export const NEW_TABLE_DATA_REF_QUERY = gql`
  query getTableDataRefIdInfoUpdate(
    $tableId: Int
    $tableColId: Int
    $tableRefId: Int
    $userId: String!
  ) {
    getTableDataRefIdInfoUpdate(
      tableId: $tableId
      tableColId: $tableColId
      tableRefId: $tableRefId
      userId: $userId
    ) {
      tableDataId
      tableId
      tableColId
      columnData
      columnName
      tableDataId
      tabRelId
      tableRefId
      userId
    }
  }
`;

export const NEW_TABLE_DATA_REF_QUERY2 = gql`
  query getTableDataRefIdInfoUpdate2(
    $tableId: Int
    $tableColId: Int
    $tableRefId: Int
    $userId: String!
  ) {
    getTableDataRefIdInfoUpdate2(
      tableId: $tableId
      tableColId: $tableColId
      tableRefId: $tableRefId
      userId: $userId
    ) {
      tableDataId
      tableId
      tableColId
      columnData
      columnName
      tableDataId
      tabRelId
      tableRefId
      userId
    }
  }
`;

export const FILE_NAME_LIST_QUERY = gql`
  query getYahooHistFileName {
    getYahooHistFileName {
      jsonData
    }
  }
`;

export const JSON_TABLE_NAME_LIST_QUERY = gql`
  query getAllJsonTableName($db: Int!, $userId: String!) {
    getAllJsonTableName (db: $db, userId: $userId){
      jsonData
    }
  }
`;

export const GET_ALL_TABLE_DATA_QUERY = gql`
  query getDynamicTableField($tableId: Int, $userId: String!) {
    getDynamicTableField(tableId: $tableId, userId: $userId) {
      jsonData
    }
  }
`;

export const GET_JSON_TABLE_COL_DATA_QUERY = gql`
  query getJsonTableColData(
  	$db: Int!
  	$userId: String!
    $tableId: String!
  ) {
    getJsonTableColData(
      db: $db
      userId: $userId
      tableId: $tableId
    ) {
      jsonData
    }
  }
`;

export const GET_Table_Data_Query = gql`
  query getTableData(
  	$db: Int!
  	$userId: String!
    $tableId: String!
  ) {
    getTableData(
      db: $db
      userId: $userId
      tableId: $tableId
    ) {
      jsonData
    }
  }
`;


export const GET_ALL_TABLE_DATA_QUERY2 = gql`
  query getDynamicTableField2($tableId: Int, $userId: String!) {
    getDynamicTableField2(tableId: $tableId, userId: $userId) {
      jsonData
    }
  }
`;


export const GET_Dynamic_Table_Field_Only_Column_Query1 = gql`
  query getDynamicTableFieldOnlyColumn1($tableId: Int) {
    getDynamicTableFieldOnlyColumn1(tableId: $tableId) {
      jsonData
    }
  }
`;


export const GET_Dynamic_Table_Field_Only_Column_Query2 = gql`
  query getDynamicTableFieldOnlyColumn2($tableId: Int) {
    getDynamicTableFieldOnlyColumn2(tableId: $tableId) {
      jsonData
    }
  }
`;

export const GET_ALL_TABLE_COLUMN = gql`
  query getAllTableColumn {
    getAllTableColumn {
      jsonData
    }
  }
`;

export const GET_ALL_TABLE_COLUMN2 = gql`
  query getAllTableColumn2 {
    getAllTableColumn2 {
      jsonData
    }
  }
`;

export const GET_DYNAMIC_TABLE_JSON_FIELD = gql`
  query getDynamicTableJsonField($tableId: Int) {
    getDynamicTableJsonField(tableId: $tableId) {
      tableDataId
      tableId
      tableColId
      tableRefId
      tabRelId
      userId
      colDataType
      jsonfield
    }
  }
`;
