import React, { useState } from "react";

import { gql, useQuery, useMutation } from "@apollo/client";

import {
  CREATE_TABLE_MUTATION,
  CREATE_TABLE_UPDATE_MUTATION,
  CREATE_TABLE_DELETED_MUTATION,
} from "../GraphQL/Mutations";

const Demo = () => {
  const [value, setValue] = useState("");
  const [createTableInfoDtl] = useMutation(CREATE_TABLE_MUTATION);
  const [updateTableInfoDtl] = useMutation(CREATE_TABLE_UPDATE_MUTATION);
  const [deleteTableInfoDtl] = useMutation(CREATE_TABLE_DELETED_MUTATION);

  const onCreate = () => {
    createTableInfoDtl({
      variables: {
        tableDescription: value,
        tableName: value,
        tableType: "general",
      },
    });
  };

  const onUpdate = () => {
    updateTableInfoDtl({
      variables: {
        tableDescription: "UpdateNode",
        newTableName: "UpdateNode",
        oldTableName: value,
        tableType: "General",
      },
    });
  };

  const onDeleted = () => {
    deleteTableInfoDtl({
      variables: {
        tableName: value,
      },
    });
  };
  return (
    <div>
      Data Test
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={onCreate}>Add Data</button>
      <button onClick={onUpdate}>Update</button>
      <button onClick={onDeleted}>Delete</button>
    </div>
  );
};

export default Demo;
