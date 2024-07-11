import useFetchData from "../../hooks/useFetchData"
import { Base_URL } from "../../config"
import DoctorCard from "../../components/Doctors/DoctorCard"
import Loading from '../../components/Loader/Loading'
import Error from "../../components/Error/Error"
import BookingDoctorCard from "../../components/Doctors/BookingDoctorCard"


const MyBooking = () => {
    const {data:appointments, loading, error} = useFetchData(`${Base_URL}/users/appointments/my-appointments`)

  return <div>
{loading && !error && <Loading/>} 

{ error && !loading && <Error errMessage={error}/>}

{!loading && !error && (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {appointments.map(doctor =>(
            <BookingDoctorCard doctor={doctor} key={doctor.id} />
        ))}
    </div>  
)}

{!loading && !error && appointments.length === 0 && (
    <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
        You did not book any doctor yet!</h2>
)}
  </div>;
};

export default MyBooking
