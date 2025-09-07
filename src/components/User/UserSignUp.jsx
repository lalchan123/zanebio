import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userLogin } from "../../features/User/loginLogout";
import useSignUp from "../../GraphQLApiCall/useSignUp";
import toast, { Toaster } from 'react-hot-toast';
import { send } from "emailjs-com";
import Swal from "sweetalert2";
import sendMail from "../../GraphQLApiCall/sendMail";

const UserSignUp = () => {
  const { signup_loading, signup_error, signup_success, setSignUpValues } =
    useSignUp();

  const [signUpValue, setSignUpValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUpInputChange = (event) => {
    const { name, value } = event.target;
    setSignUpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const delay = 2000;

    try {
      if (!signUpValue.firstName || !signUpValue.lastName || !signUpValue.email || !signUpValue.password) {
        toast.error("All Fields are required.");
        setLoading(false);
        return setErrorMessage("All Fields are required.");
      }
      await setSignUpValues(signUpValue);

      setTimeout(() => {
        // toast.success("Sign up successful!");
        // setSuccessMessage("Sign up successful!");
        setLoading(false);
      }, delay);
    } catch (error) {
      setTimeout(() => {
        toast.success("Failed to sign up. Please try again.");
        setErrorMessage("Failed to sign up. Please try again.");
        setLoading(false);
      }, delay);
    }
  };

  React.useEffect(() => {
      if (signup_success) {
        const emailMessage = {
          subject: "You are account Activated Link",
          phone: "01306817790",
          email: signup_success?.userSignUp1?.email,
          message: `Hi ${signup_success?.userSignUp1?.firstName}, \nPlease click on the link confirm your registration and activation email:\n ${signup_success?.userSignUp1?.mainUrl}/course/driver-activate-mail/${signup_success?.userSignUp1?.email}/`,
        }
        const { result, message  } = sendMail(emailMessage);
        if (result == true) {
          toast.success("Signup Successfully. Please email check for activation.");
        } else {
          toast.error(`Something Wrong or ${message}`);
        }
      }
    }, [signup_success]);
  

  return (
    <section className="bg-slate-50 p-10 rounded-lg">
      <div className="">
        {/* mx-auto to center horizontally */}
        <div className="w-[450px]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 max-w-lg">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSignUpSubmit}
            >
              <div className="flex  items-center gap-x-2">
                <div className="">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 !border-2 !border-black text-gray-900 rounded-lg w-full p-2.5"
                    placeholder="Jon"
                    required
                    value={signUpValue.firstName}
                    onChange={handleSignUpInputChange}
                  />
                </div>
                <div className="">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="bg-gray-50 border border-green-300 text-gray-900 rounded-lg focus:ring-green-200 block w-full p-2.5"
                    placeholder="Doe"
                    required
                    value={signUpValue.lastName}
                    onChange={handleSignUpInputChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  value={signUpValue.email}
                  onChange={handleSignUpInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  value={signUpValue.password}
                  onChange={handleSignUpInputChange}
                />
              </div>

              <button
                onClick={handleSignUpSubmit}
                type="submit"
                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
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
                    <p>Creating...</p>
                  </div>
                ) : (
                  <p>Create your account</p>
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                If you already have an account{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
              <div className="mt-2 text-center">
                {signup_success && (
                  <p className="text-green-500">{successMessage}</p>
                )}
                {signup_error && <p className="text-red-500">{errorMessage}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSignUp;
