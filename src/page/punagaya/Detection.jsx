import { useState, useEffect } from "react";
import { axiosRT } from "../../config/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../redux/notificationSlice.js";
import { setConfirmation } from "../../redux/confirmationSlice.js";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaEye, FaPencilAlt, FaCheck, FaTrash } from "react-icons/fa";
import Unauthorized from "../Unauthorized.jsx";

const Detection = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.jwToken.token);
  const expire = useSelector((state) => state.jwToken.expire);
  const username = useSelector((state) => state.jwToken.username);
  const role = useSelector((state) => state.jwToken.role);
  const uid = useSelector((state) => state.jwToken.uid);

  const axiosInterceptors = axiosRT(token, expire, dispatch);

  // view data
  const [detection, setDetection] = useState([]);
  const [allPage, setAllPage] = useState(0);

  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState("");
  const [search, setSearch] = useState("");
  const [searchBased, setSearchBased] = useState("biota_type");

  const findDetection = async () => {
    try {
      const response = await axiosInterceptors.get(
        `/${import.meta.env.VITE_APP_NAME}/${
          import.meta.env.VITE_APP_VERSION
        }/detection?order=desc&limit=${limit}&page=${page}&${key}`,
      );

      setDetection(response.data.data);
      setAllPage(response.data.all_page);
      // console.log({ datax: response.data.data });
    } catch (e) {
      const arrError = e?.response?.data?.error?.split(",") ?? [
        "Terjadi kesalahan",
      ];
      dispatch(
        setNotification({ message: arrError[0], background: "bg-amber-500" }),
      );
    }
  };

  const pageComponents = [];
  for (let i = 1; i <= allPage; i++) {
    pageComponents.push(
      <button
        key={i}
        onClick={() => setPage(i)}
        className={`${
          i == page
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
            : "text-blue-700 hover:bg-blue-100"
        } mx-1 rounded border border-blue-400 px-1 text-xs`}
      >
        {i}
      </button>,
    );
  }

  useEffect(() => {
    findDetection();
  }, [limit, page, key]);

  // submit
  const handleSubmit = (event) => {
    event.preventDefault();
    form ? updateData(form.id) : false;
  };

  const [recomendation, setRecomendation] = useState("");
  const [status, setStatus] = useState(0);

  const [errForm, setErrForm] = useState(null);
  const [form, setForm] = useState(null);

  const handleUpdate = async (id) => {
    setForm({ id: id });
    setNamaModal("update detection");
    const oldData = await axiosInterceptors.get(
      `/${import.meta.env.VITE_APP_NAME}/${
        import.meta.env.VITE_APP_VERSION
      }/detection/${id}`,
    );
    openModal();
    setRecomendation(oldData.data?.recomendation);
    setStatus(oldData.data?.status);
  };

  const handleApprove = (id) => {
    dispatch(
      setConfirmation({
        message: "The selected data will be appreved ?",
        handleOke: () => approveData(id),
      }),
    );
  };

  const handleDelete = (id) => {
    dispatch(
      setConfirmation({
        message: "The selected data will be delete ?",
        handleOke: () => deleteData(id),
      }),
    );
  };

  const updateData = async (id) => {
    try {
      await axiosInterceptors.patch(
        `/${import.meta.env.VITE_APP_NAME}/${
          import.meta.env.VITE_APP_VERSION
        }/detection/${id}`,
        {
          recomendation,
          status,
        },
      );

      dispatch(
        setNotification({
          message: "selected data has been updated",
          background: "bg-green-500",
        }),
      );
      closeModal();
      findDetection();
    } catch (e) {
      const arrError = e?.response?.data?.error?.split(",") ?? [
        "Terjadi kesalahan",
      ];
      setErrForm(arrError);
    }
  };

  // approve data
  const approveData = async (id) => {
    try {
      const oldData = await axiosInterceptors.get(
        `/${import.meta.env.VITE_APP_NAME}/${
          import.meta.env.VITE_APP_VERSION
        }/detection/${id}`,
      );

      await axiosInterceptors.patch(
        `/${import.meta.env.VITE_APP_NAME}/${
          import.meta.env.VITE_APP_VERSION
        }/detection/${id}`,
        {
          recomendation: oldData.data?.recomendation,
          status: 1,
        },
      );

      dispatch(
        setNotification({
          message: "selected data has been approved",
          background: "bg-amber-500",
        }),
      );
      closeModal();
      findDetection();
    } catch (e) {
      const arrError = e?.response?.data?.error?.split(",") ?? [
        "Terjadi kesalahan",
      ];
      setErrForm(arrError);
    }
  };

  // delete
  const deleteData = async (id) => {
    try {
      await axiosInterceptors.delete(
        `/${import.meta.env.VITE_APP_NAME}/${import.meta.env.VITE_APP_VERSION}/detection/${id}`,
      );
      dispatch(
        setNotification({
          message: "selected data has been deleted",
          background: "bg-green-500",
        }),
      );
      findDetection();
    } catch (e) {
      const arrError = e?.response?.data?.error?.split(",") ?? [
        "Terjadi kesalahan",
      ];
      dispatch(
        setNotification({ message: arrError[0], background: "bg-amber-500" }),
      );
    }
  };

  // modal add / update
  const [namaModal, setNamaModal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setErrForm(null);
    setForm(null);
    setNamaModal("");
    setRecomendation("");
  };

  // console.log({ token });

  return token ? (
    <>
      <div className="mt-2 flex flex-wrap justify-evenly gap-2">
        <div className="w-[95%]">
          {/*judul*/}
          <p className="mb-2 rounded bg-gradient-to-r from-blue-500 to-cyan-500 p-1 text-center uppercase text-white shadow">
            detection
          </p>

          {/*pagination*/}
          <div className="mb-2 flex flex-wrap justify-between">
            <div className="w-[30%] rounded p-1 shadow shadow-blue-100">
              <p className="border-b border-blue-400 text-xs text-gray-700">
                limit
              </p>
              <div>
                <input
                  type="button"
                  value="8"
                  onClick={(e) => setLimit(e.target.value)}
                  className={`${
                    limit == 8
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "text-blue-700 hover:bg-blue-100"
                  } mx-1 cursor-pointer rounded border border-blue-400 px-2 text-xs`}
                />
                <input
                  type="button"
                  value="6"
                  onClick={(e) => setLimit(e.target.value)}
                  className={`${
                    limit == 6
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "text-blue-700 hover:bg-blue-100"
                  } mx-1 cursor-pointer rounded border border-blue-400 px-2 text-xs`}
                />
                <input
                  type="button"
                  value="4"
                  onClick={(e) => setLimit(e.target.value)}
                  className={`${
                    limit == 4
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "text-blue-700 hover:bg-blue-100"
                  } mx-1 cursor-pointer rounded border border-blue-400 px-2 text-xs`}
                />
              </div>
            </div>
            <div className="w-[30%] rounded p-1 shadow shadow-blue-100">
              <p className="mb-1 border-b border-blue-400 text-xs text-gray-700">
                page
              </p>
              <div className="flex overflow-x-auto overflow-y-hidden">
                {pageComponents}
              </div>
            </div>
            <div className="w-[30%] rounded p-1 shadow shadow-blue-100">
              <p className="border-b border-blue-400 text-xs text-gray-700">
                <select
                  value={searchBased}
                  onChange={(e) => setSearchBased(e.target.value)}
                  className="rounded border border-gray-300 bg-white text-gray-700 outline-none"
                >
                  <option value="biota_type">biota_type</option>
                  <option value="confidence">confidence</option>
                  <option value="recomendation">recomendation</option>
                  <option value="timestamp">timestamp</option>
                  <option value="status">status</option>
                </select>
                <button
                  onClick={() => setKey(`${searchBased}=${search}`)}
                  className="ml-1 rounded bg-gradient-to-r from-blue-500 to-cyan-500 p-1 text-xs italic text-white"
                >
                  <HiMiniMagnifyingGlass />
                </button>
              </p>
              <div className="overflow-auto">
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="..."
                  className="rounded border border-blue-100"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/*tabel*/}
          {detection && detection.length > 0 ? (
            <div className="w-full overflow-x-auto rounded-lg shadow-md shadow-blue-100">
              <table className="min-w-full table-auto text-sm font-light">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-cyan-500 uppercase text-white">
                    <td className="p-2">picture</td>
                    <td className="p-2">biota_type</td>
                    <td className="p-2">confidence</td>
                    <td className="p-2">recomendation</td>
                    <td className="p-2">timestamp</td>
                    <td className="p-2">created_at</td>
                    <td className="p-2">updated_at</td>
                    <td className="p-2">status</td>
                    <td className="p-2">action</td>
                  </tr>
                </thead>
                <tbody>
                  {detection.map((each) => (
                    <tr
                      key={each._id}
                      className="border-b border-blue-200 hover:bg-blue-100"
                    >
                      <td>
                        <div className="relative inline-block">
                          <img
                            src={
                              each.image_path
                                ? `${import.meta.env.VITE_API_URL}/${each.image_path}`
                                : "/default.png"
                            }
                            alt="vision"
                            className="h-20 w-20 rounded-full border border-blue-200 object-cover"
                            onError={(e) => {
                              e.target.src = "/default.png";
                            }}
                          />
                          <a
                            href="https://www.example.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-0 right-0 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-green-500 p-1 shadow-md transition-all hover:bg-green-600 active:scale-90"
                          >
                            <FaEye className="text-xs text-white" />
                          </a>
                        </div>
                      </td>
                      <td className="p-2 text-gray-800">{each.biota_type}</td>
                      <td className="p-2 text-gray-800">{each.confidence}</td>
                      <td className="p-2 text-gray-800">
                        {each.recomendation}
                      </td>
                      <td className="p-2 text-gray-800">{each.timestamp}</td>
                      <td className="p-2 text-gray-800">{each.createdAt}</td>
                      <td className="p-2 text-gray-800">{each.updatedAt}</td>
                      <td className="p-2 text-gray-800">{each.status}</td>
                      <td className="flex p-2">
                        <button
                          disabled={each.status !== 0}
                          onClick={() => handleUpdate(each._id)}
                          className={`m-1 rounded border border-blue-500 p-1 text-xs italic transition-colors duration-200 ${
                            each.status === 0
                              ? "text-blue-500 hover:bg-blue-500 hover:text-white"
                              : "bg-blue-500 text-white"
                          }`}
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          disabled={each.status !== 0}
                          onClick={() => handleApprove(each._id)}
                          className={`m-1 rounded border border-green-500 p-1 text-xs italic transition-colors duration-200 ${
                            each.status === 0
                              ? "text-green-500 hover:bg-green-500 hover:text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          <FaCheck />
                        </button>
                        <button
                          disabled={each.status !== 0}
                          onClick={() => handleDelete(each._id)}
                          className={`m-1 rounded border border-amber-500 p-1 text-xs italic transition-colors duration-200 ${
                            each.status === 0
                              ? "text-amber-500 hover:bg-amber-500 hover:text-white"
                              : "bg-amber-500 text-white"
                          }`}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="m-4 rounded bg-green-500 p-4 text-center uppercase text-white">
              data not found
            </div>
          )}
        </div>
      </div>

      {/* modal add/update */}
      {showModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-[95%] rounded-xl bg-white/90 shadow-2xl md:w-[80%] lg:w-[50%]">
            {/* Header */}
            <p className="mb-3 border-b-2 border-cyan-500 py-2 text-center text-lg font-semibold text-gray-700">
              {namaModal}
            </p>

            {/* Tombol close */}
            <button
              onClick={closeModal}
              className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-2 py-1 text-white shadow-md transition-colors duration-200 hover:from-red-600 hover:to-pink-600"
            >
              ✕
            </button>

            {/* Body */}
            <div className="max-h-[80vh] overflow-auto px-4 pb-4">
              {errForm && (
                <div className="mb-3 rounded-md border border-amber-400 bg-amber-50 px-3 py-2 text-xs italic text-amber-600">
                  {errForm.map((err, index) => (
                    <p key={index}>{err}</p>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* recomendation, input type text */}
                <input
                  type="text"
                  placeholder="recomendation"
                  className="w-full rounded-md border-b-2 border-blue-200 bg-blue-50 px-3 py-2 text-gray-700 outline-none transition-colors duration-200 focus:border-cyan-400"
                  value={recomendation}
                  onChange={(e) => setRecomendation(e.target.value)}
                />

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  ) : (
    <Unauthorized />
  );
};

export default Detection;
