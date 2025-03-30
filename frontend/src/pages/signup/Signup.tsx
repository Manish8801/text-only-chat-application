import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import { ISignupData } from "../../types/types";
import type { ChangeEvent, FormEvent } from "react";
import useSignup from "../../hooks/useSignup";
const initialSignupData = {
  fullname: "",
  username: "",
  password: "",
  confirmPassword: "",
  gender: undefined,
};

const Signup = () => {
  const [signupData, setSignupData] = useState<ISignupData>(initialSignupData);
  const { isLoading, signup } = useSignup();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signup(signupData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="label p-1">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="John Doe"
              value={signupData.fullname}
              onChange={handleInputChange}
              className="w-full input input-bordered  h-10"
            />
          </div>
          <div>
            <label className="label p-1">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="johndoe"
              value={signupData.username}
              onChange={handleInputChange}
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              placeholder="Enter Password"
              onChange={handleInputChange}
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={signupData.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleInputChange}
              className="w-full input input-bordered h-10"
            />
          </div>
          <GenderCheckbox onChange={handleInputChange} />

          <Link
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-block btn-sm mt-2 border border-slate-700"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Sign up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
