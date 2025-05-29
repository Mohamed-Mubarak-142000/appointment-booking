import { Stack } from "@mui/material";
import FilterDoctorsByTabs from "../components/all-doctors/filter-doctors-by-tabs";
import TopSection from "../components/all-doctors/top-section";

const DoctorsPage = () => {
  return (
    <Stack spacing={3}>
      <TopSection />
      <FilterDoctorsByTabs />
    </Stack>
  );
};

export default DoctorsPage;
