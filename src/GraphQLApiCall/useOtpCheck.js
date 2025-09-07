import React, { useState, useEffect, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import { CREATE_USER_OTP_CHECK_MUTATION } from "../GraphQL/Mutations";

const useOtpCheck = () => {
  const [otpCheckValues, setOtpCheckValues] = useState(null);
  const [otpCheckEmail, setOtpCheckEmail] = useState(null);

  const [
    userOtpCheck,
    { loading: otp_loading, error: otp_error, data: otp_success },
  ] = useMutation(CREATE_USER_OTP_CHECK_MUTATION);

  useEffect(() => {
    if (otpCheckValues !== null) {
      userOtpCheck({
        variables: {
          email: otpCheckEmail,
          userOtp: otpCheckValues,
        },
      });
    }
  }, [otpCheckValues]);

  return {
    otp_loading,
    otp_error,
    otp_success,
    setOtpCheckEmail,
    setOtpCheckValues,
  };
};

export default useOtpCheck;
