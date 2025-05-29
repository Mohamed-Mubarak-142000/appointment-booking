import BookingAppointment from "../components/home/book-appointment";
import FindBySpecialty from "../components/home/find-by-speciality";
import Hero from "../components/home/hero";
import TopDoctors from "../components/home/top-doctors";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FindBySpecialty />
      <TopDoctors />
      <BookingAppointment />
    </>
  );
};

export default HomePage;
