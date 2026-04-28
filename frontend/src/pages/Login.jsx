import React, { useContext, useState, useEffect } from "react";
import { backendUrl } from "../App";
import axios from "axios";
import { AppContext } from "../context/appContext";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const { token, setToken, navigate } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);

  // 🔥 SUBMIT HANDLER
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // ✅ SIGNUP
      if (currentState === "Sign Up") {
        const res = await axios.post(
          backendUrl + "/api/user/register",
          { name, email, password, phone }
        );

        if (res.data.success) {
          toast.success("OTP sent to your email");

          setUserId(res.data.userId); // 🔥 important
          setCurrentState("Verify"); // 🔥 go to OTP screen
        } else {
          toast.error(res.data.message);
        }
      }

      // ✅ LOGIN
      else if (currentState === "Login") {
        const res = await axios.post(
          backendUrl + "/api/user/login",
          { email, password }
        );

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Login successful");
        } else {
          toast.error(res.data.message);
        }
      }

      // ✅ VERIFY OTP
      else if (currentState === "Verify") {
        const res = await axios.post(
          backendUrl + "/api/user/verify",
          { userId, emailOtp: otp }
        );

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success("Account verified ");
        } else {
          toast.error(res.data.message);
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 p-6 bg-white shadow-lg rounded-xl"
    >
      <h2 className="text-xl font-semibold text-[#005AAA]">
        {currentState}
      </h2>

      {/* SIGN UP */}
      {currentState === "Sign Up" && (
        <>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-3 py-2 border rounded"
            required
          />

          <input
            type="text"
            placeholder="Phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </>
      )}

      {/* EMAIL */}
      {currentState !== "Verify" && (
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="w-full px-3 py-2 border rounded"
          required
        />
      )}

      {/* PASSWORD */}
      {currentState !== "Verify" && (
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full px-3 py-2 border rounded"
          required
        />
      )}

      {/* OTP */}
      {currentState === "Verify" && (
        <input
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
          className="w-full px-3 py-2 border rounded text-center tracking-widest"
          required
        />
      )}

      {/* SWITCH */}
      {currentState !== "Verify" && (
        <div className="w-full flex justify-between text-sm">
          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer text-blue-600"
            >
              Create Account
            </p>
          ) : (
            <div>
               <p className="text-red-500 text-xs mt-1"> Note: Make sure you remember your password and store it securely</p>
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer text-blue-600"
            >
              Login Here
            </p>
          </div>
          )}
        </div>
      )}

      {/* BUTTON */}
      <button className="w-full bg-[#005AAA] text-white py-2 rounded-lg hover:bg-[#003f76] transition">
        {currentState === "Verify" ? "Verify OTP" : currentState}
      </button>
    </form>
  );
};

export default Login;