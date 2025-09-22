import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="absolute inset-0 mt-0 flex items-center justify-center bg-gradient-to-br from-blue-300 to-teal-200 px-4 py-12 backdrop-blur-sm md:mt-4">
      <div className="flex h-fit w-full flex-col items-center justify-center gap-6 rounded-3xl bg-white/80 p-8 shadow-2xl md:h-[60%] md:flex-row md:justify-around md:p-12 lg:h-[70%] lg:w-[80%]">
        {/* Section Ilustrasi */}
        <div className="hidden h-full w-full max-w-sm rounded-xl bg-gradient-to-br from-cyan-400 to-sky-300 shadow-xl md:flex md:w-[45%] lg:w-[50%]">
          <img
            src="/unauthorized.png" // Ganti dengan path gambar Anda
            alt="Unauthorized illustration"
            className="h-full w-full rounded-xl object-contain p-8"
          />
        </div>

        {/* Konten utama */}
        <div className="relative h-fit w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-xl md:w-[45%] md:p-8">
          <h1 className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-7xl font-extrabold text-transparent drop-shadow-md md:text-8xl">
            401
          </h1>
          <p className="mt-4 text-2xl font-bold uppercase tracking-wide text-gray-700 md:text-3xl">
            Akses Ditolak
          </p>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Silakan
            login dengan akun yang sesuai atau hubungi administrator.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 16l-4-4m0 0l4-4m-4 4h14M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            Pergi ke Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
