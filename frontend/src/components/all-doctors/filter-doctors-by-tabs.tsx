import { Box } from "@mui/material";
import CustomTabs from "../custom-tabs";
import { doctors } from "../home/data-static-doctors";
import DoctorItem from "../home/doctor-card";
import { useMemo, useState } from "react";
import PaginationControlled from "../custom-pagination";
import { EmptyStateContent } from "../empty-state-content";
import { tFn } from "../../locales";
import type { TabProps } from "../../types";

export const specialityData: TabProps[] = [
  { label: "All", value: "All" },

  {
    label: tFn("home:speciality.specialities.General_physician"),
    value: "General_physician",
  },
  {
    label: tFn("home:speciality.specialities.Gynecologist"),
    value: "Gynecologist",
  },
  {
    label: tFn("home:speciality.specialities.Dermatologist"),
    value: "Dermatologist",
  },
  {
    label: tFn("home:speciality.specialities.Pediatricians"),
    value: "Pediatricians",
  },
  {
    label: tFn("home:speciality.specialities.Neurologist"),
    value: "Neurologist",
  },
  {
    label: tFn("home:speciality.specialities.Gastroenterologist"),
    value: "Gastroenterologist",
  },
  // {
  //   label: tFn("home:speciality.specialities.Cardiologist"),
  //   value: "dd",
  // },
];

const FilterDoctorsByTabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

  const handleTabChange = (newValue: number) => {
    setActiveTabIndex(newValue);
  };
  const filteredDoctors = useMemo(() => {
    const activeTabValue = specialityData[activeTabIndex].value;
    if (activeTabValue === "All") return doctors;
    return doctors.filter((doctor) => doctor.speciality === activeTabValue);
  }, [activeTabIndex]);

  return (
    <CustomTabs
      tabs={specialityData}
      spacing={2}
      onTabChange={handleTabChange}
      tabIndex={activeTabIndex}
    >
      {filteredDoctors.length === 0 ? (
        <EmptyStateContent
          title="No Doctors Found"
          subtitle=" No Doctors Found for this Speciality"
          slotProps={{
            title: {
              variant: "h5",
              sx: {
                fontSize: { xs: "1.5rem", md: "2rem", lg: "3rem" },
                fontWeight: (theme) => theme.typography.fontWeightBold,
              },
            },
            subtitle: {
              variant: "subtitle1",
              sx: {
                fontSize: { xs: "1rem", md: "1.25rem", lg: "1.5rem" },
                fontWeight: (theme) => theme.typography.fontWeightRegular,
              },
            },
          }}
        />
      ) : (
        <PaginationControlled
          items={filteredDoctors}
          countPerPage={8}
          sx={{ mt: 2, mb: 2 }}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          render={(doctors) => (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
                gap: 2,
              }}
            >
              {doctors.map((doctor) => (
                <DoctorItem key={doctor._id} doctor={doctor} />
              ))}
            </Box>
          )}
        />
      )}
    </CustomTabs>
  );
};

export default FilterDoctorsByTabs;
