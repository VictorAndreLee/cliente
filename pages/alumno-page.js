import React from "react";
import Layout from "../components/PageComponents/LayoutPage";
import Link from "next/link";

const Alumno = () => {
  return (
    <Layout>
      <div className="flex flex-1 justify-evenly md:w-4/5 xl:w-3/5 w-full mx-auto mt-24 py-9 mb-32 ">
        <Link href="/alumno-nuevo">
          <a
            className="bg-green-700 cursor-pointer hover:text-white mx-3 text-white px-2 font-semibold text-lg py-4 rounded-lg transition-all duration-300 delay-75 ease-in transform hover:-translate-y-2 hover:bg-green-600"
          >
            Soy alumno nuevo
          </a>
        </Link>
        <Link href="/alumno-antiguo">
          <a
            className="bg-green-700 cursor-pointer hover:text-white mx-3 text-white px-2 font-semibold text-lg py-4 rounded-lg transition-all duration-300 delay-75 ease-in transform hover:-translate-y-2 hover:bg-green-600"
          >
            Soy alumno antiguo
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Alumno;
