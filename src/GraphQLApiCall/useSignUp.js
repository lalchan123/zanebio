import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  TABLE_DATA_DETAIL,
  GET_ALL_TABLE_DATA_QUERY,
} from "../GraphQL/Queries";
import { CREATE_USER_SIGN_UP1_MUTATION } from "../GraphQL/Mutations";

const useSignUp = () => {
  const [signUpValues, setSignUpValues] = useState(null);
  const [otpCheckEmail, setOtpCheckEmail] = useState(null);

  const [
    userSignUp1,
    { loading: signup_loading, error: signup_error, data: signup_success },
  ] = useMutation(CREATE_USER_SIGN_UP1_MUTATION, {
    refetchQueries: [
      {
        query: TABLE_DATA_DETAIL,
        variables: { tableId: 1, tableColId: 0, tabRelId: "" },
      },
    ],
  });

  useEffect(() => {
    if (signUpValues !== null) {
      userSignUp1({
        variables: {
          firstName: signUpValues.firstName,
          lastName: signUpValues.lastName,
          email: signUpValues.email,
          password: signUpValues.password,
        },
      });
    }
  }, [signUpValues]);

  console.log("check39", signUpValues, signup_loading, signup_error);

  return {
    signup_loading,
    signup_error,
    signup_success,
    setSignUpValues,
  };
};

export default useSignUp;
