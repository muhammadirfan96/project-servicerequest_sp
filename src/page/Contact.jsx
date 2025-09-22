import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for sending the form, e.g., to an API or email service
    console.log("Form submitted:", formData);

    // Replace alert() with a custom notification
    setNotificationMessage("Pesan Anda telah terkirim!");
    setShowNotification(true);

    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  const closeNotification = () => {
    setShowNotification(false);
    setNotificationMessage("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 p-4">
      <div className="mx-auto max-w-lg rounded-3xl bg-white/70 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-base font-semibold uppercase tracking-wide text-transparent">
            Hubungi Kami
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Mari Berkolaborasi
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Kami siap membantu Anda mencapai keandalan operasional yang lebih
            baik. Silakan hubungi kami melalui formulir di bawah ini atau
            melalui informasi kontak kami.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Lengkap
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Pesan
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 bg-white/50 px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-full border border-transparent bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Kirim Pesan
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500">Atau hubungi kami langsung:</p>
            <p className="mt-2 text-lg font-medium text-gray-900">
              <a
                href="mailto:contact@seapower.com"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent hover:underline"
              >
                contact@seapower.com
              </a>
            </p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              <a
                href="tel:+62211234567"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent hover:underline"
              >
                (021) 123-4567
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Notification Modal */}
      {showNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          <div className="z-10 mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">
              Pesan Terkirim
            </h3>
            <p className="mt-2 text-sm text-gray-600">{notificationMessage}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeNotification}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
