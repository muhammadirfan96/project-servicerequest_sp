import { useState } from "react";
import { axiosDefault } from "../config/axios.js";
import { useDispatch } from "react-redux";
import { setNotification } from "../redux/notificationSlice.js";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();

  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosDefault.patch(`/reset-password/${email}`, {
        resetPasswordToken,
        password,
        confPassword,
      });

      dispatch(
        setNotification({
          message: response.data.message,
          background: "bg-green-500",
        }),
      );

      closeModal();
    } catch (e) {
      const arrError = e.response.data.error.split(",");
      setErrForm(arrError);
    }
  };

  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    setErrForm(null);
    setResetPasswordToken("");
    setPassword("");
    setConfPassword("");
    navigate("/");
  };

  return (
    <>
      {showModal && (
        <div className="absolute inset-0 mt-4 flex items-center justify-center bg-gradient-to-br from-blue-300 to-teal-200 px-4 py-12 backdrop-blur-sm">
          <div className="relative h-fit w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl md:w-[60%] lg:w-[35%]">
            <div className="mb-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                Reset Your Password
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Enter the token and your new password
              </p>
            </div>

            {errForm && (
              <div className="mb-4 rounded-md border border-red-400 bg-red-50 p-2 text-xs italic text-red-700">
                {errForm.map((err, index) => (
                  <p key={index}>{err}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Token"
                className="w-full rounded-md border-b-2 border-blue-200 bg-blue-50 p-3 text-gray-800 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-cyan-400"
                value={resetPasswordToken}
                onChange={(e) => setResetPasswordToken(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full rounded-md border-b-2 border-blue-200 bg-blue-50 p-3 text-gray-800 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-cyan-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full rounded-md border-b-2 border-blue-200 bg-blue-50 p-3 text-gray-800 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-cyan-400"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
              />
              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
