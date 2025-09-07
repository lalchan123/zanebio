import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

// import { APP_LOG_MUTATION } from "../GraphQL/Mutations";

const useAdminAppLog = () => {
  const [logData, setLogData] = useState();

  // const [logMutationApp] = useMutation(APP_LOG_MUTATION);

  useEffect(() => {
    // logMutationApp({
    //   variables: {
    //     logEvent: logData,
    //   },
    // });
  }, [logData]);

  return { setLogData };
};

export default useAdminAppLog;
