import { useContext, useState } from "react";
import convertTime from "../../utils/convertTime";
import { Base_URL } from "../../config";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  const { token } = useContext(AuthContext);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const bookingHandler = async () => {
    if (!selectedTimeSlot) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      const res = await fetch(
        `${Base_URL}/booking/checkout-session/${doctorId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ timeSlot: selectedTimeSlot }),
        }
      );
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} RS
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text_para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{" "}
                {convertTime(item.endingTime)}
              </p>
              <button
                className={`bg-${
                  selectedTimeSlot === item ? "secondaryColor" : "primaryColor"
                } text-white py-1 px-2 rounded text-xs md:text-sm lg:text-base`}
                onClick={() => setSelectedTimeSlot(item)}
              >
                {selectedTimeSlot === item ? "Selected" : "Select"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md">
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
