import React, { useState } from "react";
import Logout from "../auth/Logout.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMenu, setProjectsNama } from "../redux/projectsSlice.js";

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  const username = useSelector((state) => state.jwToken.username);
  const projectsNama = useSelector((state) => state.projects.nama);
  const menu = useSelector((state) => state.projects.menu);

  function potongTeks(teks, batas = 15) {
    return teks.length > batas ? teks.slice(0, batas) + "..." : teks;
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-40 h-auto bg-opacity-90 bg-gradient-to-r from-blue-50 to-teal-50 shadow-lg backdrop-blur-sm md:h-20">
      {/* Topbar Utama: Logo, Hamburger, dan Login/Logout */}
      <div className="flex h-16 w-full items-center justify-between px-4 py-2 md:h-20 md:px-6">
        {/* Logo di kiri */}
        <div className="flex-shrink-0">
          <button
            onClick={() => {
              navigate("/");
              dispatch(setMenu(false));
            }}
          >
            <img
              src="/logo_sp.png"
              alt="SEAPOWER Logo"
              className="h-12 w-auto md:h-16"
            />
          </button>
        </div>

        {/* Navigasi Desktop */}
        <nav className="hidden flex-grow justify-center gap-4 md:flex md:gap-8">
          {!menu ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/about")}
                className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500 md:text-base"
              >
                About
              </button>

              {/* Projects + Dropdown (Desktop) */}
              <div className="relative hidden md:block">
                <button
                  onClick={() =>
                    setIsProjectDropdownOpen(!isProjectDropdownOpen)
                  }
                  className="flex items-center text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500 md:text-base"
                >
                  Projects
                  <svg
                    className={`ml-1 h-3 w-3 transform transition-transform ${
                      isProjectDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isProjectDropdownOpen && (
                  <div className="absolute left-0 mt-3 rounded-md bg-white shadow-xl">
                    {["punagaya", "muarakarang", "paiton"].map((project) => (
                      <button
                        key={project}
                        onClick={() => {
                          dispatch(setProjectsNama(project));
                          dispatch(setMenu(true));
                          setIsProjectDropdownOpen(false);
                          navigate(`/${project}/prediction`);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                      >
                        {project.charAt(0).toUpperCase() + project.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500 md:text-base"
              >
                Contact
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/${projectsNama}/prediction`)}
                className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500 md:text-base"
              >
                Prediction
              </button>
              <button
                onClick={() => navigate(`/${projectsNama}/detection`)}
                className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500 md:text-base"
              >
                Detection
              </button>
              <a
                href="http://seapower-dashboard.plnnusantarapower.co.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500 md:text-base"
              >
                Dashboard
              </a>
              <a
                href="https://icore.plnnusantarapower.co.id/data/perspective/client/_4_PLTU_Punagaya/pltu1/5%20Seapower"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500 md:text-base"
              >
                Condensor
              </a>
            </div>
          )}
        </nav>

        {/* Hamburger Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-blue-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>

        {/* Login/Logout */}
        <div className="flex flex-shrink-0 items-center gap-2 text-xs text-white">
          {username ? (
            <div className="flex flex-col items-end">
              <p className="mb-2 hidden text-sm text-blue-700 md:block">
                Hi, {username}
              </p>
              <p className="mb-2 text-blue-700 md:hidden">
                Hi, {potongTeks(username)}
              </p>
              <Logout />
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigasi Mobile */}
      {isMobileMenuOpen && (
        <nav className="flex w-full justify-center border-t border-slate-300 py-2 md:hidden">
          <div className="flex w-full justify-center gap-4 px-4">
            {!menu ? (
              <>
                <button
                  onClick={() => navigate("/about")}
                  className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500"
                >
                  About
                </button>
                {/* Projects + Dropdown (Mobile) */}
                <div className="relative md:hidden">
                  <button
                    onClick={() =>
                      setIsProjectDropdownOpen(!isProjectDropdownOpen)
                    }
                    className="flex w-full items-center justify-between text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500"
                  >
                    Projects
                    <svg
                      className={`ml-1 h-3 w-3 transform transition-transform ${
                        isProjectDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isProjectDropdownOpen && (
                    <div className="absolute left-0 mt-2 rounded-md bg-white shadow-lg">
                      {["punagaya", "muarakarang", "paiton"].map((project) => (
                        <button
                          key={project}
                          onClick={() => {
                            dispatch(setProjectsNama(project));
                            dispatch(setMenu(true));
                            setIsMobileMenuOpen(false);
                            setIsProjectDropdownOpen(false);
                            navigate(`/${project}/prediction`);
                          }}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100"
                        >
                          {project.charAt(0).toUpperCase() + project.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate("/contact")}
                  className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500"
                >
                  Contact
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate(`/${projectsNama}/prediction`)}
                  className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500"
                >
                  Prediction
                </button>
                <button
                  onClick={() => navigate(`/${projectsNama}/detection`)}
                  className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500"
                >
                  Detection
                </button>
                <a
                  href="http://seapower-dashboard.plnnusantarapower.co.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500 md:text-base"
                >
                  Dashboard
                </a>
                <a
                  href="https://icore.plnnusantarapower.co.id/data/perspective/client/_4_PLTU_Punagaya/pltu1/5%20Seapower"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-700 transition-colors hover:text-cyan-500"
                >
                  Condensor
                </a>
              </>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Topbar;
