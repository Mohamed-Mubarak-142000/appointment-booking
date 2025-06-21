// src/pages/DoctorsFilterPage.tsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSpecialties } from "../apis/use-case/get-all-specialiste";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import { useGovernorates } from "../apis/use-case/get-all-government";
import PaginationControlled from "../components/custom-pagination";
import { useFilteredDoctors } from "../apis/use-case/doctor/filter-doctors";
import DoctorItem from "../components/home/doctor-card";
import TopSection from "../components/filter-doctors/top-section";
import FilterOPtions from "../components/filter-doctors/filter-options";
import { ErrorStateContent } from "../components/error-state-content";
import { EmptyStateContent } from "../components/empty-state-content";
import { useTranslate } from "../locales";

const DoctorsFilterPage = () => {
  const doctorsPerPage = 8;
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: specialtiesData } = useSpecialties();
  const { data: governorates } = useGovernorates();
  const { t } = useTranslate("filter-doctor");
  // Initialize state from URL
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      name: params.get("name") || "",
      specialty: params.get("specialty") || "",
      governorate: params.get("governorate") || "",
      page: parseInt(params.get("page") || "1"),
    };
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.name) params.set("name", filters.name);
    if (filters.specialty) params.set("specialty", filters.specialty);
    if (filters.governorate) params.set("governorate", filters.governorate);
    if (filters.page > 1) params.set("page", filters.page.toString());

    // Only update if params actually changed
    if (params.toString() !== searchParams.toString()) {
      setSearchParams(params);
    }
  }, [filters, searchParams, setSearchParams]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newFilters = {
      name: params.get("name") || "",
      specialty: params.get("specialty") || "",
      governorate: params.get("governorate") || "",
      page: parseInt(params.get("page") || "1"),
    };

    // Only update if filters actually changed
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters);
    }
  }, [window.location.search]); // eslint-disable-line react-hooks/exhaustive-deps

  const specialtyData = useMemo(() => {
    const specialties = specialtiesData?.data || [];
    return [
      {
        id: "all",
        value: "",
        label: { en: "All Specialties", ar: "كل التخصصات" },
      },
      ...specialties,
    ];
  }, [specialtiesData]);

  const governorateData = useMemo(() => {
    const govs = governorates?.data || [];
    return [
      {
        id: "all",
        value: "",
        label: { en: "All Governorates", ar: "كل المحافظات" },
      },
      ...govs,
    ];
  }, [governorates]);

  const doctorQueryParams = useMemo(
    () => ({
      page: filters.page,
      limit: doctorsPerPage,
      sort: "-rating",
      ...(filters.specialty && { specialty: filters.specialty }),
      ...(filters.governorate && { governorate: filters.governorate }),
      ...(filters.name && { name: filters.name }),
    }),
    [filters]
  );

  const {
    data,
    isPending: isPendingDOctors,
    isError: isErrorDoctors,
  } = useFilteredDoctors(doctorQueryParams);

  const handleFilterChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
    ) => {
      const { name, value } = e.target;
      setFilters((prev) => ({
        ...prev,
        [name as string]: value,
        page: 1, // Reset to first page when filters change
      }));
    },
    []
  );

  const handlePageChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (_pageItems: any[], currentPage: number) => {
      setFilters((prev) => ({ ...prev, page: currentPage }));
    },
    []
  );

  const clearFilter = useCallback((filterName: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: "",
      page: 1,
    }));
  }, []);

  const selectedSpecialty = specialtyData.find(
    (s) => s.value === filters.specialty
  );
  const selectedGovernorate = governorateData.find(
    (g) => g.value === filters.governorate
  );

  if (isPendingDOctors) {
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <CircularProgress sx={{ color: "primary.darker" }} size={25} />
    </Box>;
  }

  if (isErrorDoctors) {
    <ErrorStateContent
      icon="material-symbols:error-outline-rounded"
      title={t("errorFetchingDoctors.title")}
      subtitle={t("errorFetchingDoctors.subtitle")}
      sx={{ mt: 4 }}
    />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <TopSection
        selectedGovernorate={selectedGovernorate}
        selectedSpecialty={selectedSpecialty}
        filters={filters}
        clearFilter={clearFilter}
      />

      <FilterOPtions
        onFilterChange={handleFilterChange}
        filters={filters}
        governorateData={governorateData}
        specialtyData={specialtyData}
      />

      {!data || !data.data || data.data.length === 0 ? (
        <EmptyStateContent
          title={t("noDoctorsFound.title")}
          subtitle={t("noDoctorsFound.subtitle")}
          sx={{ mt: 4 }}
        />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <PaginationControlled
              items={data.data}
              countPerPage={doctorsPerPage}
              initialPage={filters.page}
              onPageChange={handlePageChange}
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
          </Box>
        </>
      )}
    </Box>
  );
};

export default DoctorsFilterPage;
