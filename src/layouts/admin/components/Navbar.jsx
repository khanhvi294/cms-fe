import { Button } from "@mui/material";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { appRoutes } from "../../../routes/appRouter";

const Navbar = () => {
  const { pathname } = useLocation();

  const navbarItems = [
    {
      title: "Courses",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          id="list"
          width={18}
        >
          <path
            d="M30 2H4a2 2 0 0 0-2 2v26a2 2 0 0 0 2 2h26a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 22H9a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0-6H9a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0-6H9a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      iconActive: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          id="list"
          width={18}
        >
          <path
            d="M30 2H4a2 2 0 0 0-2 2v26a2 2 0 0 0 2 2h26a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 22H9a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0-6H9a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2zm0-6H9a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2z"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      path: appRoutes.ACOURSES,
    },

    {
      title: "Classes",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 64 64"
          id="Classroom"
          width={18}
        >
          <path
            d="M5 60h14a1 1 0 0 0 1-1 8 8 0 0 0-16 0 1 1 0 0 0 1 1Z"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
          <circle
            cx="12"
            cy="45"
            r="5"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></circle>
          <path
            d="M24 59a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1 8 8 0 0 0-16 0Z"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
          <circle
            cx="32"
            cy="45"
            r="5"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></circle>
          <path
            d="M52 51a8 8 0 0 0-8 8 1 1 0 0 0 1 1h14a1 1 0 0 0 1-1 8 8 0 0 0-8-8Z"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
          <circle
            cx="52"
            cy="45"
            r="5"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></circle>
          <circle
            cx="13"
            cy="9"
            r="5"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></circle>
          <path
            d="M5 27h3v10a1 1 0 0 0 1 1h3V28a1 1 0 0 1 2 0v10h3a1 1 0 0 0 1-1V21h7a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H8a4 4 0 0 0-4 4v7a1 1 0 0 0 1 1Z"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
          <path
            d="M59 4H21a1 1 0 0 0-1 1v9h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5v9a1 1 0 0 0 1 1h38a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm-6 22H43a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2Zm0-7H29a1 1 0 0 1 0-2h24a1 1 0 0 1 0 2Zm0-7H27a1 1 0 0 1 0-2h26a1 1 0 0 1 0 2Z"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      iconActive: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 64 64"
          id="Classroom"
          width={18}
        >
          <path
            d="M5 60h14a1 1 0 0 0 1-1 8 8 0 0 0-16 0 1 1 0 0 0 1 1Z"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
          <circle
            cx="12"
            cy="45"
            r="5"
            fill="#ffffff"
            className="color000000 svgShape"
          ></circle>
          <path
            d="M24 59a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1 8 8 0 0 0-16 0Z"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
          <circle
            cx="32"
            cy="45"
            r="5"
            fill="#ffffff"
            className="color000000 svgShape"
          ></circle>
          <path
            d="M52 51a8 8 0 0 0-8 8 1 1 0 0 0 1 1h14a1 1 0 0 0 1-1 8 8 0 0 0-8-8Z"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
          <circle
            cx="52"
            cy="45"
            r="5"
            fill="#ffffff"
            className="color000000 svgShape"
          ></circle>
          <circle
            cx="13"
            cy="9"
            r="5"
            fill="#ffffff"
            className="color000000 svgShape"
          ></circle>
          <path
            d="M5 27h3v10a1 1 0 0 0 1 1h3V28a1 1 0 0 1 2 0v10h3a1 1 0 0 0 1-1V21h7a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H8a4 4 0 0 0-4 4v7a1 1 0 0 0 1 1Z"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
          <path
            d="M59 4H21a1 1 0 0 0-1 1v9h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5v9a1 1 0 0 0 1 1h38a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm-6 22H43a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2Zm0-7H29a1 1 0 0 1 0-2h24a1 1 0 0 1 0 2Zm0-7H27a1 1 0 0 1 0-2h26a1 1 0 0 1 0 2Z"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      path: appRoutes.ACLASSES,
    },

    {
      title: "Employees",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id="user"
          width={20}
        >
          <path
            d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      iconActive: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id="user"
          width={20}
        >
          <path
            d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      path: appRoutes.AEMPLOYEES,
    },
    {
      title: "Students",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id="users"
          width={20}
        >
          <path
            d="M337.454 232c33.599 0 61.092-27.002 61.092-60 0-32.997-27.493-60-61.092-60s-61.09 27.003-61.09 60c0 32.998 27.491 60 61.09 60zm-162.908 0c33.599 0 61.09-27.002 61.09-60 0-32.997-27.491-60-61.09-60s-61.092 27.003-61.092 60c0 32.998 27.493 60 61.092 60zm0 44C126.688 276 32 298.998 32 346v54h288v-54c0-47.002-97.599-70-145.454-70zm162.908 11.003c-6.105 0-10.325 0-17.454.997 23.426 17.002 32 28 32 58v54h128v-54c0-47.002-94.688-58.997-142.546-58.997z"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      iconActive: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id="users"
          width={20}
        >
          <path
            d="M337.454 232c33.599 0 61.092-27.002 61.092-60 0-32.997-27.493-60-61.092-60s-61.09 27.003-61.09 60c0 32.998 27.491 60 61.09 60zm-162.908 0c33.599 0 61.09-27.002 61.09-60 0-32.997-27.491-60-61.09-60s-61.092 27.003-61.092 60c0 32.998 27.493 60 61.092 60zm0 44C126.688 276 32 298.998 32 346v54h288v-54c0-47.002-97.599-70-145.454-70zm162.908 11.003c-6.105 0-10.325 0-17.454.997 23.426 17.002 32 28 32 58v54h128v-54c0-47.002-94.688-58.997-142.546-58.997z"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      path: appRoutes.ASTUDENTS,
    },
    {
      title: "Exam Form",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="Form"
          width={16}
        >
          <path
            d="M22 6H2C.9 6 0 5.1 0 4V2C0 .9.9 0 2 0h20c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2zm0-2v1-1zM2 2v2h20V2H2zm20 13H2c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h20c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2zm0-2v1-1zM2 11v2h20v-2H2zm9 12H2c-.5 0-1-.5-1-1v-2c0-.5.5-1 1-1h9c.6 0 1 .5 1 1v2c0 .5-.4 1-1 1z"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
          <path
            d="M11 24H2c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2zm0-2v1-1zm-9-2v2h9v-2H2z"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      iconActive: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="Form"
          width={16}
        >
          <path
            d="M22 6H2C.9 6 0 5.1 0 4V2C0 .9.9 0 2 0h20c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2zm0-2v1-1zM2 2v2h20V2H2zm20 13H2c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h20c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2zm0-2v1-1zM2 11v2h20v-2H2zm9 12H2c-.5 0-1-.5-1-1v-2c0-.5.5-1 1-1h9c.6 0 1 .5 1 1v2c0 .5-.4 1-1 1z"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
          <path
            d="M11 24H2c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2h9c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2zm0-2v1-1zm-9-2v2h9v-2H2z"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      path: appRoutes.AEXAMFORMS,
    },
    {
      title: "Competitions",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 46 46"
          id="Competition"
          width={16}
        >
          <path
            d="M23 1006.362c12.708 0 23 10.292 23 23 0 12.709-10.292 23-23 23s-23-10.291-23-23c0-12.708 10.292-23 23-23zm-4.5 17a.5.5 0 0 0-.5.5v2.5H9.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h27a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5H28v-3.5a.5.5 0 0 0-.5-.5zm.5 1h8v11h-8v-8.5zm4 1.98v.01h-.057a.63.63 0 0 0-.142.042c-.014.01-.027.012-.04.02h-.005c-.013.01-.025.015-.037.024h-.004a.58.58 0 0 0-.04.03c-.008.01-.016.016-.025.024l-.006.01-.994.982c-.492.469.23 1.199.703.711l.155-.152v3.302H22c-.676-.01-.676 1.01 0 1h.89a.507.507 0 0 0 .233 0H24c.676.01.676-1.01 0-1h-.492v-4.492a.5.5 0 0 0-.184-.394h-.006a.508.508 0 0 0-.226-.102c-.014 0-.028-.01-.041-.01H23zm-13 1.02h8v8h-8zm3.992 1c-.822 0-1.5.678-1.5 1.5-.01.676 1.01.676 1 0 0-.286.214-.5.5-.5.286 0 .5.214.5.5a.825.825 0 0 1-.201.58c-.133.167-.347.334-.596.522-.249.187-.534.395-.775.697-.24.302-.42.716-.42 1.201a.5.5 0 0 0 .5.5h2c.676.01.676-1.01 0-1h-1.324c.015-.022.01-.056.027-.078.133-.166.345-.334.594-.521.249-.188.534-.395.775-.698.241-.302.42-.717.42-1.203 0-.822-.678-1.5-1.5-1.5zm14.008 0h8v7h-8zm3.857 1.008a1.502 1.502 0 0 0-1.357 1.492c-.01.676 1.01.676 1 0 0-.203.12-.383.309-.46a.496.496 0 0 1 .545.107.497.497 0 0 1-.354.853.531.531 0 0 0-.197.037c-.01 0-.02.01-.03.014l-.013.01a.5.5 0 0 0-.201.194c-.003.01-.006.01-.008.016a.5.5 0 0 0-.055.183l-.002.023-.002.025.002.025.002.023v.01a.544.544 0 0 0 .063.187c.005.01.011.018.017.027a.453.453 0 0 0 .026.037l.006.01.007.01c.008.01.016.017.024.025a.522.522 0 0 0 .049.045c.01.01.019.013.029.02a.424.424 0 0 0 .057.031c.01.01.02.011.03.016a.503.503 0 0 0 .196.04c.204 0 .385.118.463.306a.5.5 0 1 1-.963.193c.01-.676-1.01-.676-1 0a1.502 1.502 0 0 0 2.56 1.06 1.507 1.507 0 0 0 .327-1.636 1.466 1.466 0 0 0-.282-.426c.115-.125.214-.265.282-.428a1.5 1.5 0 0 0-1.53-2.064v-.01z"
            color="#000"
            overflow="visible"
            transform="translate(0 -1006.362)"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      iconActive: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 46 46"
          id="Competition"
          width={16}
        >
          <path
            d="M23 1006.362c12.708 0 23 10.292 23 23 0 12.709-10.292 23-23 23s-23-10.291-23-23c0-12.708 10.292-23 23-23zm-4.5 17a.5.5 0 0 0-.5.5v2.5H9.5a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h27a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5H28v-3.5a.5.5 0 0 0-.5-.5zm.5 1h8v11h-8v-8.5zm4 1.98v.01h-.057a.63.63 0 0 0-.142.042c-.014.01-.027.012-.04.02h-.005c-.013.01-.025.015-.037.024h-.004a.58.58 0 0 0-.04.03c-.008.01-.016.016-.025.024l-.006.01-.994.982c-.492.469.23 1.199.703.711l.155-.152v3.302H22c-.676-.01-.676 1.01 0 1h.89a.507.507 0 0 0 .233 0H24c.676.01.676-1.01 0-1h-.492v-4.492a.5.5 0 0 0-.184-.394h-.006a.508.508 0 0 0-.226-.102c-.014 0-.028-.01-.041-.01H23zm-13 1.02h8v8h-8zm3.992 1c-.822 0-1.5.678-1.5 1.5-.01.676 1.01.676 1 0 0-.286.214-.5.5-.5.286 0 .5.214.5.5a.825.825 0 0 1-.201.58c-.133.167-.347.334-.596.522-.249.187-.534.395-.775.697-.24.302-.42.716-.42 1.201a.5.5 0 0 0 .5.5h2c.676.01.676-1.01 0-1h-1.324c.015-.022.01-.056.027-.078.133-.166.345-.334.594-.521.249-.188.534-.395.775-.698.241-.302.42-.717.42-1.203 0-.822-.678-1.5-1.5-1.5zm14.008 0h8v7h-8zm3.857 1.008a1.502 1.502 0 0 0-1.357 1.492c-.01.676 1.01.676 1 0 0-.203.12-.383.309-.46a.496.496 0 0 1 .545.107.497.497 0 0 1-.354.853.531.531 0 0 0-.197.037c-.01 0-.02.01-.03.014l-.013.01a.5.5 0 0 0-.201.194c-.003.01-.006.01-.008.016a.5.5 0 0 0-.055.183l-.002.023-.002.025.002.025.002.023v.01a.544.544 0 0 0 .063.187c.005.01.011.018.017.027a.453.453 0 0 0 .026.037l.006.01.007.01c.008.01.016.017.024.025a.522.522 0 0 0 .049.045c.01.01.019.013.029.02a.424.424 0 0 0 .057.031c.01.01.02.011.03.016a.503.503 0 0 0 .196.04c.204 0 .385.118.463.306a.5.5 0 1 1-.963.193c.01-.676-1.01-.676-1 0a1.502 1.502 0 0 0 2.56 1.06 1.507 1.507 0 0 0 .327-1.636 1.466 1.466 0 0 0-.282-.426c.115-.125.214-.265.282-.428a1.5 1.5 0 0 0-1.53-2.064v-.01z"
            color="#000"
            overflow="visible"
            transform="translate(0 -1006.362)"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      path: appRoutes.ACOMPETITIONS,
    },
    {
      title: "Register",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id="form"
          width={16}
        >
          <path
            d="m392 361c-66.167969 0-120 54.28125-120 121h-242v-391.011719h242v90.011719h90v36.28125c-26.460938 11.597656-45 38.027344-45 68.71875 0 41.355469 33.644531 75 75 75s75-33.644531 75-75c0-16.847656-5.585938-32.414062-15-44.949219v-241.050781h-392v61c-39.5625 0-24.207031 0-60 0v451h512v-30c0-66.71875-53.832031-121-120-121zm-90-210v-38.78125c12.527344 12.53125 26.273438 26.285156 38.746094 38.78125zm135 135c0 24.8125-20.1875 45-45 45s-45-20.1875-45-45 20.1875-45 45-45 45 20.1875 45 45zm-347-256h332v187.28125c-9.195312-4.027344-19.335938-6.28125-30-6.28125v-51.070312c-4.976562-4.984376-98.789062-98.921876-98.789062-98.921876-40.8125 0-142.957032.003907-203.210938.003907zm212 452c0-45.011719 32.488281-82.488281 75-89.730469v58.730469h30v-58.730469c42.511719 7.242188 75 44.71875 75 89.730469zm0 0"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
          <path
            d="M60 211h242v30h-242zm0 0M60 271h212v30h-212zm0 0M60 331h212v30h-212zm0 0M60 391h182v30h-182zm0 0M120 151h92v30h-92zm0 0"
            fill="#9ea8b4"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      iconActive: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id="form"
          width={16}
        >
          <path
            d="m392 361c-66.167969 0-120 54.28125-120 121h-242v-391.011719h242v90.011719h90v36.28125c-26.460938 11.597656-45 38.027344-45 68.71875 0 41.355469 33.644531 75 75 75s75-33.644531 75-75c0-16.847656-5.585938-32.414062-15-44.949219v-241.050781h-392v61c-39.5625 0-24.207031 0-60 0v451h512v-30c0-66.71875-53.832031-121-120-121zm-90-210v-38.78125c12.527344 12.53125 26.273438 26.285156 38.746094 38.78125zm135 135c0 24.8125-20.1875 45-45 45s-45-20.1875-45-45 20.1875-45 45-45 45 20.1875 45 45zm-347-256h332v187.28125c-9.195312-4.027344-19.335938-6.28125-30-6.28125v-51.070312c-4.976562-4.984376-98.789062-98.921876-98.789062-98.921876-40.8125 0-142.957032.003907-203.210938.003907zm212 452c0-45.011719 32.488281-82.488281 75-89.730469v58.730469h30v-58.730469c42.511719 7.242188 75 44.71875 75 89.730469zm0 0"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
          <path
            d="M60 211h242v30h-242zm0 0M60 271h212v30h-212zm0 0M60 331h212v30h-212zm0 0M60 391h182v30h-182zm0 0M120 151h92v30h-92zm0 0"
            fill="#ffffff"
            className="color000000 svgShape"
          ></path>
        </svg>
      ),
      path: appRoutes.AREGISTER,
    },
  ];
  return (
    <div className="w-[280px] h-full bg-[#000] text-white ">
      <div>
        <img src={logo} alt="logo" className="" />
      </div>
      <div className="flex w-full flex-col gap-3 justify-center text-center mt-2">
        {navbarItems.map((item) => {
          const isActive = matchPath(item.path, pathname);

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className="active text-white"
            >
              <Button
                className={` !font-semibold !py-3 flex !pl-10 !justify-start gap-6 !text-sm rounded-md hover:!bg-[#252e3f] w-[94%]  !capitalize ${
                  isActive ? "!bg-[#252e3f] !text-white" : "!text-[#9ea8b4]"
                }`}
                size="large"
              >
                {isActive ? (
                  <span>{item.iconActive}</span>
                ) : (
                  <span> {item.icon}</span>
                )}
                <span className="#9ea8b4">{item.title}</span>
              </Button>
            </NavLink>
          );
        })}
      </div>
      {/* <List>
        {[
          "Home",
          "Competition",
          "Account",
          "Class",
          "Course",
          "Student",
          "Employee",
          "Register",
          "Rounds",
        ].map((text, index) => (
          <ListItem key={index} disablePadding className="m-auto !w-[94%]">
            <ListItemButton className=" hover:!bg-[#404552] !rounded-md ">
              <ListItemText primary={text} className=" font-semibold" />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );
};

export default Navbar;
