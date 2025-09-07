import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { UserContext } from "./UserContext";

import {
  TABLE_DATA_BOX_DETAIL_REF,
} from "../GraphQL/Queries";

import { CREATE_CRUD_INFO_MUTATION } from "../GraphQL/Mutations";

const useALert = () => {
  const { userId } = useContext(UserContext);
  const [notification, setNotification] = useState();
  const [uniqueId, setUniqueId] = useState(Math.floor(Date.now() / 1000));
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  const currentDateValue = `${year}/${month}/${day} ${formattedHours}:${minutes} ${amOrPm}`;

  const [createCrudInfo, { data }] = useMutation(CREATE_CRUD_INFO_MUTATION, {
    refetchQueries: [
      {
        query: TABLE_DATA_BOX_DETAIL_REF,
        variables: { tableId: 35, tableColId: 0, tableRefId: "" },
      },
    ],
  });

  useEffect(() => {
    createCrudInfo({
      variables: {
        tableId: 35,
        tableColId: 1,
        tabRelId: "41",
        tableRefId: uniqueId,
        columnData: notification,
        columnName: "notification",
        userId: userId,
      },
    });
    createCrudInfo({
      variables: {
        tableId: 35,
        tableColId: 2,
        tabRelId: "41",
        tableRefId: uniqueId,
        columnData: currentDateValue,
        columnName: "notification_date",
        userId: userId,
      },
    });
    createCrudInfo({
      variables: {
        tableId: 35,
        tableColId: 3,
        tabRelId: "41",
        tableRefId: uniqueId,
        columnData: userId,
        columnName: "notification_userid",
        userId: userId,
      },
    });
    createCrudInfo({
      variables: {
        tableId: 35,
        tableColId: 4,
        tabRelId: "41",
        tableRefId: uniqueId,
        columnData: false,
        columnName: "notification_flag",
        userId: userId,
      },
    });
  }, [notification]);

  return { setNotification };
};

export default useALert;
