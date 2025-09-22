import { useState } from "react";
import { axiosDefault } from "../config/axios.js";
import { useDispatch } from "react-redux";
import { setNotification } from "../redux/notificationSlice.js";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosDefault.post("/forgot-password", { email });
      dispatch(
        setNotification({
          message: response.data?.message,
          background: "bg-green-500",
        }),
      );

      closeModal();
      navigate(`/reset-password/${email}`);
    } catch (e) {
      const arrError = e.response.data.error.split(",");
      setErrForm(arrError);
    }
  };

  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    setErrForm(null);
    setEmail("");
    navigate("/");
  };

  return (
    <>
      {showModal && (
        <div className="absolute inset-0 mt-0 flex items-center justify-center bg-gradient-to-br from-blue-300 to-teal-200 px-4 py-12 backdrop-blur-sm md:mt-4">
          <div className="relative h-fit w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl md:w-[60%] lg:w-[35%]">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full bg-red-500 p-1 text-sm font-bold text-white transition-colors duration-200 hover:bg-red-600"
              title="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="mb-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                Forgot Password?
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Enter your email to receive a reset token.
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
                type="email"
                placeholder="Your email address"
                className="w-full rounded-md border-b-2 border-blue-200 bg-blue-50 p-3 text-gray-800 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-cyan-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;
