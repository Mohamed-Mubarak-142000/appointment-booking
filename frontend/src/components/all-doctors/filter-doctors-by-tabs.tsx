import { Box, CircularProgress } from "@mui/material";
import CustomTabs from "../custom-tabs";
import DoctorItem from "../home/doctor-card";
import { useMemo, useState } from "react";
import PaginationControlled from "../custom-pagination";
import { EmptyStateContent } from "../empty-state-content";
import { useGetAllDoctors } from "../../apis/use-case/doctor/get-all-doctors";
import { useSpecialties } from "../../apis/use-case/get-all-specialiste";
import { getCurrentLang } from "../../locales";

const FilterDoctorsByTabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 8;

  // Fetch specialties from API
  const {
    data: specialtiesResponse,
    isLoading: isSpecialtiesLoading,
    error: specialtiesError,
  } = useSpecialties();

  // Add "All" option to the beginning of specialties
  const specialtyData = useMemo(() => {
    const specialties = specialtiesResponse?.data || [];
    return [
      { id: "all", value: "All", label: { en: "All", ar: "الكل" } },
      ...specialties,
    ];
  }, [specialtiesResponse]);

  // Get current specialty filter
  const currentSpecialty = useMemo(() => {
    return specialtyData[activeTabIndex]?.value || "All";
  }, [activeTabIndex, specialtyData]);

  // Fetch doctors with current filter
  const doctorQueryParams = {
    page: currentPage,
    limit: doctorsPerPage,
    sort: "-rating",
    ...(currentSpecialty !== "All" && { specialty: currentSpecialty }),
  };

  const {
    data: doctorsData,
    isLoading: isDoctorsLoading,
    error: doctorsError,
  } = useGetAllDoctors(doctorQueryParams);

  const handleTabChange = (newValue: number) => {
    setActiveTabIndex(newValue);
    setCurrentPage(1);
  };

  if (isSpecialtiesLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (specialtiesError) {
    return (
      <EmptyStateContent
        title="Error Loading Specialties"
        subtitle={specialtiesError.message}
      />
    );
  }

  return (
    <CustomTabs
      tabs={specialtyData.map((spec) => ({
        label: getCurrentLang() === "ar" ? spec.label.ar : spec.label.en,
        value: spec.value,
      }))}
      spacing={2}
      onTabChange={handleTabChange}
      tabIndex={activeTabIndex}
    >
      {/* Doctors loading state */}
      {isDoctorsLoading && (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )}

      {doctorsError && (
        <EmptyStateContent
          title="Error Loading Doctors"
          subtitle={doctorsError.message}
        />
      )}

      {!isDoctorsLoading && !doctorsError && doctorsData?.data.length === 0 && (
        <EmptyStateContent
          title="No Doctors Found"
          subtitle={`No doctors found for ${currentSpecialty} specialty`}
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
      )}

      {!isDoctorsLoading &&
        !doctorsError &&
        doctorsData &&
        doctorsData.data.length > 0 && (
          <PaginationControlled
            items={doctorsData.data}
            countPerPage={doctorsPerPage}
            initialPage={currentPage}
            onPageChange={(_pageItems, page) => setCurrentPage(page)}
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
