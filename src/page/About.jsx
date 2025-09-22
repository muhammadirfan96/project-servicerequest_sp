import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-200 to-cyan-100 px-4 py-16 text-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-3xl bg-white/70 p-8 shadow-2xl shadow-blue-300 backdrop-blur-sm md:p-12">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-base font-semibold uppercase tracking-wide text-transparent">
            Tentang Kami
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Misi Kami: Mencegah, Bukan Hanya Bereaksi
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            SEAPOWER hadir untuk mengatasi tantangan operasional di sektor
            pembangkit listrik dengan teknologi prediktif yang cerdas.
          </p>
        </div>

        {/* Content Section */}
        <div className="mt-12 space-y-16 lg:space-y-24">
          {/* Visi dan Misi */}
          <div className="relative">
            <div className="relative lg:mx-auto lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
              <div className="relative">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Mengapa SEAPOWER?
                </h3>
                <p className="mt-3 text-lg text-gray-600">
                  Keandalan pembangkit seringkali terancam oleh masalah tak
                  terduga, terutama biofouling. Kami percaya masalah ini bisa
                  dicegah dengan pendekatan proaktif. Kami memadukan keahlian
                  teknik, ilmu data, dan pemahaman mendalam tentang industri
                  untuk menciptakan solusi yang berbeda.
                </p>
              </div>
              <div className="relative -mx-4 mt-10 lg:mt-0" aria-hidden="true">
                <img
                  className="relative mx-auto rounded-lg shadow-2xl"
                  width="490"
                  src="/team_engineers.png"
                  alt="A team of engineers and data scientists"
                />
              </div>
            </div>
          </div>

          {/* Solusi dan Teknologi */}
          <div className="relative mt-12">
            <div className="relative lg:mx-auto lg:grid lg:grid-cols-2 lg:items-center lg:gap-8">
              <div className="relative lg:order-2">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Teknologi di Balik Keandalan
                </h3>
                <p className="mt-3 text-lg text-gray-600">
                  SEAPOWER adalah platform digital yang menggunakan{" "}
                  <i>machine learning</i> dan <i>smart workflow</i> untuk
                  memprediksi kedatangan biota laut. Tim operasional akan
                  mendapatkan notifikasi peringatan dini, memungkinkan mereka
                  mengambil tindakan pencegahan sebelum masalah terjadi.
                </p>
                <p className="mt-3 text-lg font-semibold text-gray-600">
                  Tujuan kami adalah meningkatkan efisiensi, menghemat biaya,
                  dan mendukung keberlanjutan operasi.
                </p>
              </div>
              <div
                className="relative -mx-4 mt-10 lg:order-1 lg:mt-0"
                aria-hidden="true"
              >
                <img
                  className="relative mx-auto rounded-lg shadow-2xl"
                  width="490"
                  src="/person_analyzing_data.png"
                  alt="A person analyzing data on a futuristic dashboard"
                />
              </div>
            </div>
          </div>

          {/* Our Team Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Tim Kami: Inovasi yang Berpusat pada Manusia
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Kami adalah para ahli di bidang teknik, ilmu data, dan perangkat
              lunak yang berdedikasi untuk menciptakan solusi canggih bagi
              industri energi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
