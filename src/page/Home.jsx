const Home = () => {
  return (
    <>
      <div
        className="fixed left-0 top-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <div className="flex min-h-screen flex-col items-center justify-center p-4 md:flex-row md:flex-wrap md:justify-start">
          <div className="relative z-10 w-full p-4 md:w-[48%] lg:w-[40%]">
            <div className="w-full max-w-4xl rounded-3xl bg-gray-800 bg-opacity-20 p-8 text-center text-white shadow-2xl backdrop-blur-sm">
              <p className="mb-2 text-sm md:text-lg">
                Smart Solution for Reliable Energy
              </p>
              <h1 className="text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                {import.meta.env.VITE_APP_TITLE}
              </h1>
              <p className="mt-2 text-lg leading-relaxed text-gray-300 md:text-xl">
                (Sea & Environment Analytic Prediction for Power Plant)
              </p>
              <div className="mt-8 space-y-6 text-center">
                <p className="text-base leading-relaxed text-gray-300 md:text-lg">
                  Protect your power plant from marine biofouling with machine
                  learning technology that is efficient, cost-effective, and
                  sustainable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
