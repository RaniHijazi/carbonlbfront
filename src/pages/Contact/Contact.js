import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "Home");
  }, [location]);

  const phoneNumber = "+961 71 015 151"; // Replace with your company's phone number
  const whatsappNumber = "71015151"; // Replace with your company's WhatsApp number
  const instagramUsername = "carbon_lb"; // Replace with your company's Instagram username

  const handleWhatsAppRedirect = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const handleInstagramRedirect = () => {
    window.open(`https://www.instagram.com/${instagramUsername}/`, "_blank");
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full flex items-start pt-10">
        <div className="max-w-container px-4 ml-10">
          <Breadcrumbs title="Contact" prevLocation={prevLocation} />
          <div className="w-full py-6 flex flex-col gap-6">
            <div>
              <p className="text-base font-titleFont font-semibold px-2">Phone</p>
              <p className="w-full py-1 px-2 text-base font-medium">
                {phoneNumber}
              </p>
            </div>
            <div>
              <button
                onClick={handleWhatsAppRedirect}
                className="w-56 bg-green-500 text-white h-12 font-titleFont text-base tracking-wide font-semibold hover:bg-green-700 duration-200 rounded-3xl flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <FaWhatsapp className="text-3xl" />
                Chat on WhatsApp
              </button>
            </div>
            <div>
              <button
                onClick={handleInstagramRedirect}
                className="w-56 bg-pink-600 text-white h-12 font-titleFont text-base tracking-wide font-semibold hover:bg-pink-700 duration-200 rounded-3xl flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <FaInstagram className="text-3xl" />
                DM on Instagram
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 hidden lgl:flex h-full text-white">
        <div className="w-full h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <p className="text-2xl font-bold text-white">Carbon Lb</p>
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Stay connected with us
            </h1>
            <p className="text-base">We are here to help you!</p>
          </div>
          <div className="w-full flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Quick support
              </span>
              <br />
              Contact us anytime for your inquiries and support needs.
            </p>
          </div>
          <div className="w-full flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Accessible everywhere
              </span>
              <br />
              Reach us via phone or WhatsApp for convenience.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <Link to="/">
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                © CARBON_LB
              </p>
            </Link>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Contact;
