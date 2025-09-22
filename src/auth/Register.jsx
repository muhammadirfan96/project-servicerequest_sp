import { useState } from "react";
import { axiosDefault } from "../config/axios.js";
import { useDispatch } from "react-redux";
import { setNotification } from "../redux/notificationSlice.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosDefault.post("/register", {
        email,
        password,
        confPassword,
      });
      dispatch(
        setNotification({
          message: response.data?.message,
          background: "bg-green-500",
        }),
      );

      closeModal();
      navigate(`/activation-user/${email}`);
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
    setPassword("");
    setConfPassword("");
    navigate("/");
  };

  return (
    <>
      {showModal && (
        <div className="absolute inset-0 mt-0 flex items-center justify-center bg-gradient-to-br from-blue-300 to-teal-200 px-4 py-12 backdrop-blur-sm md:mt-4">
          <div className="flex h-fit max-h-screen w-full flex-col items-center justify-center gap-6 rounded-3xl bg-white bg-opacity-80 p-8 shadow-2xl md:h-[60%] md:flex-row md:justify-around md:p-12 lg:h-[70%] lg:w-[80%]">
            {/* Section Gambar (Ilustrasi Register) */}
            <div className="hidden h-full w-full max-w-sm rounded-xl bg-gradient-to-br from-cyan-400 to-sky-300 shadow-xl md:flex md:w-[45%] lg:w-[50%]">
              <img
                src="/register.png" // Menggunakan ilustrasi yang sama dengan halaman about untuk konsistensi
                alt="Register illustration"
                className="h-full w-full rounded-xl object-cover p-8"
              />
            </div>

            {/* Form Register */}
            <div className="relative h-fit w-full max-w-sm rounded-xl bg-white p-6 shadow-xl md:w-[45%] md:p-8">
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 p-1 text-sm font-bold text-white transition-colors duration-200 hover:from-red-600 hover:to-pink-600"
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

              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                  Create Your Account
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Join us and get started!
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
                  placeholder="Email address"
                  className="w-full rounded-md border-b-2 border-blue-200 bg-blue-50 p-3 text-gray-800 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-cyan-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md border-b-2 border-blue-200 bg-blue-50 p-3 text-gray-800 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-cyan-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full rounded-md border-b-2 border-blue-200 bg-blue-50 p-3 text-gray-800 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-cyan-400"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
