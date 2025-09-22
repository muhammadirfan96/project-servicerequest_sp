import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setNotification } from "../redux/notificationSlice.js";
import { setConfirmation } from "../redux/confirmationSlice.js";

const Confirmation = () => {
  const dispatch = useDispatch();
  const confirmation = useSelector(
    (state) => state.confirmationAlert.confirmation,
  );

  return (
    <>
      {confirmation && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-[95%] rounded-xl bg-white/90 p-6 shadow-2xl md:w-[70%] lg:w-[40%]">
            <p className="mb-3 border-b border-cyan-500 pb-1 text-center text-base font-semibold text-gray-700">
              Confirmation
            </p>
            <p className="mb-6 text-center text-sm text-gray-600">
              {confirmation.message}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => dispatch(setConfirmation(false))}
                className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-5 py-1.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-red-600 hover:to-pink-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmation.handleOke();
                  dispatch(setConfirmation(false));
                }}
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-1.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:from-cyan-600 hover:to-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(
    (state) => state.notificationAlert.notification,
  );

  // Hapus notifikasi otomatis setelah 3 detik
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(setNotification(false));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  return (
    <>
      {notification && (
        <div
          className={`${notification.background} fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-lg px-4 py-2 shadow-lg`}
        >
          <p className="text-center text-sm font-medium text-white drop-shadow">
            {notification.message}
          </p>
        </div>
      )}
    </>
  );
};

export { Confirmation, Notification };
