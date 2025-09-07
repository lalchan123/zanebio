import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_DETAIL,
  GET_ALL_TABLE_DATA_QUERY,
} from "../GraphQL/Queries";
import { CREATE_USER_SIGN_IN_MUTATION } from "../GraphQL/Mutations";

const useSignIn = () => {
  const [singInValues, setSignInValues] = useState(null);
  const [tableRel, setTableRel] = useState(null);

  const [
    userSignIn,
    { loading: signin_loading, error: signin_error, data: signin_success },
  ] = useMutation(CREATE_USER_SIGN_IN_MUTATION);

  useEffect(() => {
    if (singInValues !== null) {
      userSignIn({
        variables: {
          email: singInValues.email,
          password: singInValues.password,
        },
      });
    }
  }, [singInValues]);

  console.log(
    "chekccc29 ",
    signin_loading,
    signin_error,
    signin_success,
    singInValues
  );

  return {
    signin_loading,
    signin_error,
    signin_success,
    setSignInValues,
  };
};

export default useSignIn;
