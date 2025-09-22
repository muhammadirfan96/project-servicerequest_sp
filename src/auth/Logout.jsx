import { axiosDefault } from "../config/axios.js";
import { useDispatch } from "react-redux";
import { setToken, setExpire, setUsername } from "../redux/tokenSlice.js";
import { setNotification } from "../redux/notificationSlice.js";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosDefault.delete("/logout");

      dispatch(setToken(""));
      dispatch(setExpire(""));
      dispatch(setUsername(""));
      dispatch(
        setNotification({
          message: response.data?.message,
          background: "bg-green-500",
        }),
      );
      navigate("/");
    } catch (e) {
      const arrError = e.response.data.error.split(",");
      dispatch(
        setNotification({ message: arrError, background: "bg-amber-500" }),
      );
    }
  };

  return (
    <>
      <div>
        <button
          onClick={handleLogout}
          className="mx-1 rounded-md bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
