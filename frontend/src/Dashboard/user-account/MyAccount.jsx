import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import MyBooking from "./MyBooking";
import Profile from "./Profile";
import useFetchData from "../../hooks/useFetchData";
import { Base_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";

const MyAccount = () => {
  const { dispatch, user } = useContext(AuthContext);
  const [tab, setTab] = useState("bookings");
  console.log(user);
  const { data: userData, loading, error } = useFetchData(user ? `${Base_URL}/users/profile/me/${user?._id}` : null);

  // const {data:userData, loading, error} = useFetchData(`${Base_URL}/users/profile/me/${user?._id}`);

  console.log("user data from be ", userData, loading, error);
  console.log(error);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`${Base_URL}/users/${user?._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // include the token in the Authorization header
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          dispatch({ type: "LOGOUT" });
        } else {
          console.log("Error deleting account");
        }
      } else {
        console.log("Error deleting account:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error deleting account", error);
    }
  };


  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}

        {error && !userData && !loading && <Error errMessage={error} />}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex items-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img src={userData.photo} alt="" className="w-full h-full rounded-full" />
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">{userData.name}</h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">{userData.email}</p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type: <span className="ml-2 text-headingColor text-[22px] leading-8">{userData.bloodType}</span>
                </p>
              </div>

              <div className="mt-[50px] md:mt-[100px]">
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

            <div className="md:col-span-2 md:px-[30px]">
              <div>
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab == "bookings" && "bg-primaryColor text-white font-normal"
                  }p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px]
                leading-7 border border-solid border-primaryColor`}
                >
                  My Bookings
                </button>

                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab == "settings" && "bg-primaryColor text-white font-normal"
                  }p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px]
                leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
              </div>

              {tab == "bookings" && <MyBooking />}
              {tab == "settings" && <Profile user={userData} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;
