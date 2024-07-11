import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { Base_URL, token } from "../../config";
// import { useNavigate } from 'react-router-dom'

const Tabs = ({ tab, setTab }) => {
  const { dispatch, user } = useContext(AuthContext);
  // const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleDeleteAccount = async () => {

    const doctor = user;

    if (!doctor || !doctor._id) {
      console.log("Doctor object is not available or does not have an _id property");
      return;
    }
  
    try {
      const response = await fetch(`${Base_URL}/doctors/${doctor._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        dispatch({ type: "LOGOUT" });
      } else {
        console.log("Error deleting account");
      }
    } catch (error) {
      console.log("Error deleting account", error);
    }
  };

  
  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview" ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
      </div>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          onClick={() => setTab("appointments")}
          className={`${
            tab === "appointments" ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>
      </div>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings" ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>
        <div className="mt-[100px] w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
          >
            Logout
          </button>
          <button 
          onClick={handleDeleteAccount}
          className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
