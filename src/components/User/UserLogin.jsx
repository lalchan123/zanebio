import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


import { useDispatch, useSelector } from "react-redux";

import {
  userLogin,
  userLogout,
  initializeUser,
} from "../../features/User/loginLogout";

import useSignIn from "../../GraphQLApiCall/useSignIn";
import useOtpCheck from "../../GraphQLApiCall/useOtpCheck";
import sendMail from "../../GraphQLApiCall/sendMail";

const UserLogin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);

  const { signin_loading, signin_error, signin_success, setSignInValues } =
    useSignIn();
  const {
    otp_loading,
    otp_error,
    otp_success,
    setOtpCheckEmail,
    setOtpCheckValues,
  } = useOtpCheck();

  const [signInValue, setSignInValue] = useState({ email: "", password: "" });
  const [otpValue, setOtpValue] = useState({ email: "", otp: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [otpCheck, setOtpCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpError, setOtpError] = useState();


  // Handle SignIn Input Change
  const handleSignInputChange = (event) => {
    const { name, value } = event.target;
    setSignInValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setOtpValue((prevState) => ({
      ...prevState,
      email: name === "email" ? value : prevState.email,
    }));
  };

  // Handle OTP Input Change
  const handleOtpInputChange = (event) => {
    const { name, value } = event.target;
    setOtpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = signInValue;

    if (!email || !password) {
      toast.error("Email and password are required.");
      return setErrorMessage("Email and password are required.");
    }

    if (signin_loading) return;

    setErrorMessage("");

    await setSignInValues(signInValue);

    if (signin_error) {
      toast.error(`Sign-in failed: ${signin_error.message}`);
      return setErrorMessage(`Sign-in failed: ${signin_error.message}`);
    }
  };

  useEffect(() => {
    if (signin_success?.userSignIn?.result) {
      const { email, password } = signInValue;
      const d = new Date()
      const EmailMessage ={
        subject: "Your Login OTP",
        phone: "01306817790",
        email: email,
        message: `Your OTP: ${signin_success?.userSignIn?.otp}\nCurrent TimeStand: ${d.getTime()}`,
      }
      const { result, message  } = sendMail(EmailMessage);
      if (result == true) {
        toast.success("Please OTP check in your email");
        setOtpCheck(true);
      } else {
        toast.error(`Something Wrong or ${message}`);
      }
     
    }
  }, [signin_success?.userSignIn?.result]);

  // Handle OTP Submission
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!otpValue.email || !otpValue.otp) {
      toast.error(`OTP and email are required.`);
      setErrorMessage("OTP and email are required.");
      return;
    }

    setErrorMessage("");
    setOtpCheckEmail(otpValue.email);
    setOtpCheckValues(otpValue.otp);

    if (otp_loading) return;

    if (otp_error) {
      toast.error("OTP check failed: " + otp_error.message);
      return setErrorMessage("OTP check failed: " + otp_error.message);
    }
  };

  useEffect(() => {
    if (otp_success?.userOtpCheck?.result) {
      setOtpCheck(false);
      // console.log("109 otp_success", otp_success)
      localStorage.setItem("email", otpValue.email);
      localStorage.setItem("token", otp_success?.userOtpCheck?.token);
      localStorage.setItem("userId", otp_success?.userOtpCheck?.userId);
      localStorage.setItem("userName", otp_success?.userOtpCheck?.userName);

      navigate("/");
      const userInfo = {
        email: otpValue.email,
        jwtToken: otp_success?.userOtpCheck?.token,
        userId: otp_success?.userOtpCheck?.userId,
        userName: otp_success?.userOtpCheck?.userName,
        status: true,
      };
      dispatch(userLogin(userInfo));
      toast.success("Login Successfully.");
    }
  }, [otp_success?.userOtpCheck?.result]);

  return (
    <section className="bg-slate-50 p-10 ">
      <div className="w-[450px] mx-auto">
        {otpCheck ? (
          <form className="space-y-4 w-[400px]" onSubmit={handleOtpSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-green-300 text-gray-900 rounded-lg focus:ring-green-200 block w-full p-2.5"
                placeholder="name@company.com"
                required
                value={otpValue.email}
                onChange={handleOtpInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="otp"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                OTP
              </label>
              <input
                type="text"
                name="otp"
                id="otp"
                placeholder="••••••••"
                className="bg-gray-50 border border-green-300 text-gray-900 rounded-lg focus:ring-green-200 block w-full p-2.5"
                required
                value={otpValue.otp}
                onChange={handleOtpInputChange}
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
            >
              {otp_loading ? (
                <div className="flex items-center gap-x-2">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>
                  <p>Confirming...</p>
                </div>
              ) : (
                "Confirm OTP"
              )}
            </button>
            {otp_success?.userOtpCheck?.result === false ? (
              <p className="text-red-600 mt-2 text-center">Otp Invalid </p>
            ) : (
              ""
            )}
          </form>
        ) : (
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSignInSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-green-300 text-gray-900 rounded-lg focus:ring-green-200 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  value={signInValue.email}
                  onChange={handleSignInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-green-300 text-gray-900 rounded-lg focus:ring-green-200 block w-full p-2.5"
                  required
                  value={signInValue.password}
                  onChange={handleSignInputChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-green-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <button
                onClick={handleSignInSubmit}
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
              >
                {signin_loading ? (
                  <div className="flex items-center gap-x-2">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>

                    <p>Signing...</p>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
              {signin_error && (
                <p className="text-red-600 mt-2 text-center">
                  {signin_error.message}
                </p>
              )}
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        )}
        {/* {errorMessage && (
          <p className="text-red-600 mt-4 text-center">{errorMessage}</p>
        )} */}
      </div>
    </section>
  );
};

export default UserLogin;
