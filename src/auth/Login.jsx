import { useState } from "react";
import { axiosDefault } from "../config/axios.js";
import { useDispatch } from "react-redux";
import { setToken, setExpire, setUsername } from "../redux/tokenSlice.js";
import { setNotification } from "../redux/notificationSlice.js";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errForm, setErrForm] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosDefault.post("/login", { email, password });

      const decoded = jwtDecode(response.data);
      dispatch(setToken(response.data));
      dispatch(setExpire(decoded.exp));
      dispatch(setUsername(decoded.email));
      dispatch(
        setNotification({
          message: "logged in",
          background: "bg-green-500", // Mengganti ke teal untuk konsistensi tema
        }),
      );
      closeModal();
      navigate("/");
    } catch (e) {
      const arrError = e.response.data.error.split(",");
      setErrForm(arrError);
    }
  };

  const closeModal = () => {
    setErrForm(null);
    setEmail("");
    setPassword("");
  };

  const back = () => {
    closeModal();
    navigate("/");
  };

  return (
    // Latar belakang keseluruhan akan menggunakan gradasi biru-hijau yang cerah
    <div className="absolute inset-0 mt-0 flex items-center justify-center bg-gradient-to-br from-blue-300 to-teal-200 px-4 py-12 backdrop-blur-sm md:mt-4">
      <div className="flex h-fit w-full flex-col items-center justify-center gap-6 rounded-3xl bg-white bg-opacity-80 p-8 shadow-2xl md:h-[60%] md:flex-row-reverse md:justify-around md:p-12 lg:h-[70%] lg:w-[80%]">
        {/* Section Gambar (Visual) */}
        {/* Kontainer gambar latar akan menggunakan warna solid yang serasi */}
        <div className="hidden h-full w-full max-w-sm rounded-xl bg-gradient-to-br from-cyan-400 to-sky-300 shadow-xl md:flex md:w-[45%] lg:w-[50%]">
          <img
            src="/login.png" // Menggunakan gambar bawah laut yang baru
            alt="Creative login illustration"
            className="h-full w-full rounded-xl object-cover p-8"
          />
        </div>

        {/* Form Login */}
        <div className="relative h-fit w-full max-w-sm rounded-xl bg-white p-6 shadow-xl md:w-[45%] md:p-8">
          <div className="mb-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
              Welcome Back
            </h2>
            <p className="mt-1 text-sm text-gray-500">Login to your account</p>
          </div>
          <div className="mb-4 flex justify-center">
            {/* Icon akan menggunakan warna biru atau teal yang cerah */}
            <IoPersonCircle className="text-8xl text-cyan-500" />
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
              placeholder="Email address"
              // Input field akan menggunakan border dan background terang
              className="w-full rounded-md border-b-2 border-blue-200 bg-blue-50 p-2 text-gray-800 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              // Input field akan menggunakan border dan background terang
              className="w-full rounded-md border-b-2 border-blue-200 bg-blue-50 p-2 text-gray-800 placeholder-gray-500 outline-none transition-colors duration-200 focus:border-cyan-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              // Tombol akan menggunakan gradasi biru-hijau yang cerah
              className="w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>
          <div className="mt-4 flex justify-between text-xs">
            <button
              onClick={() => navigate("/forgot-password")}
              className="font-medium text-gray-500 hover:text-cyan-600"
            >
              Forgot password?
            </button>
            <button
              onClick={back}
              className="font-medium text-gray-500 hover:text-cyan-600"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
