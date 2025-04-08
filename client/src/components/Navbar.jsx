import { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ searchUtility }) {
  const { search, handleSearch, clearSearch } = searchUtility;
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      location.pathname !== "/" && navigate("/");
    }
  }

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 border-2">
      <section>
        <h1 className="text-xl/5 font">
          <Link to="/">
            ITI
            <br />
            Burgers
          </Link>
        </h1>
      </section>
      <section className="flex items-center gap-2 ">
        <label htmlFor="search">
          <svg
            className="w-5 h-5"
            viewBox="0 -0.5 21 21"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g id="SVGRepo_bgCarrier"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>search_left [#1504]</title>{" "}
              <desc>Created with Sketch.</desc> <defs> </defs>{" "}
              <g id="Page-1" stroke="none" fill="none" fillRule="evenodd">
                {" "}
                <g
                  id="Dribbble-Light-Preview"
                  transform="translate(-299.000000, -280.000000)"
                  fill="#000000"
                >
                  {" "}
                  <g id="icons" transform="translate(56.000000, 160.000000)">
                    {" "}
                    <path
                      d="M264,138.586 L262.5153,140 L258.06015,135.758 L259.54485,134.343 L264,138.586 Z M251.4,134 C247.9266,134 245.1,131.309 245.1,128 C245.1,124.692 247.9266,122 251.4,122 C254.8734,122 257.7,124.692 257.7,128 C257.7,131.309 254.8734,134 251.4,134 L251.4,134 Z M251.4,120 C246.7611,120 243,123.582 243,128 C243,132.418 246.7611,136 251.4,136 C256.0389,136 259.8,132.418 259.8,128 C259.8,123.582 256.0389,120 251.4,120 L251.4,120 Z"
                      id="search_left-[#1504]"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </label>
        <input
          className="p-2 outline-none"
          type="text"
          value={search}
          placeholder="Search ..."
          id="search"
          ref={searchRef}
          onChange={handleSearch}
          onKeyDown={handleSearchKeyDown}
        />
        {search && (
          <button
            className="text-xl cursor-pointer"
            onClick={() => clearSearch()}
          >
            x
          </button>
        )}
        <>
          <div className="text-sm border-2 px-1">Ctrl</div>
          <div className="text-sm border-2 px-1">K</div>
        </>
      </section>
      <section>
        <ul className="flex gap-10">
          <li className="hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:underline">
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}
