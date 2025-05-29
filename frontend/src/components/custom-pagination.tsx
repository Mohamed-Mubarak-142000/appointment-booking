import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box, type SxProps, type Theme } from "@mui/material";

interface PaginationControlledProps<T> {
  items: T[];
  countPerPage?: number;
  initialPage?: number;
  onPageChange?: (pageItems: T[], currentPage: number) => void;
  showPageNumber?: boolean;
  sx?: SxProps<Theme>;
  color?: "primary" | "secondary" | "standard";
  variant?: "text" | "outlined";
  shape?: "circular" | "rounded";
  size?: "small" | "medium" | "large";
  render?: (items: T[]) => React.ReactNode;
}

const PaginationControlled = <T,>({
  items,
  countPerPage = 8,
  initialPage = 1,
  onPageChange,
  showPageNumber = true,
  sx,
  color = "primary",
  variant = "text",
  shape = "circular",
  size = "medium",
  render,
}: PaginationControlledProps<T>) => {
  const [page, setPage] = React.useState(initialPage);

  const paginatedItems = React.useMemo(() => {
    const startIndex = (page - 1) * countPerPage;
    return items.slice(startIndex, startIndex + countPerPage);
  }, [items, page, countPerPage]);

  const totalPages = Math.ceil(items.length / countPerPage);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (onPageChange) {
      const startIndex = (value - 1) * countPerPage;
      const currentItems = items.slice(startIndex, startIndex + countPerPage);
      onPageChange(currentItems, value);
    }
  };

  React.useEffect(() => {
    if (onPageChange) {
      onPageChange(paginatedItems, page);
    }
  }, [paginatedItems, page, onPageChange]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}>
      {/* عرض العناصر المعروضة حالياً */}
      {render && render(paginatedItems)}

      {/* عرض عناصر التقسيم */}
      {items.length > countPerPage && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} alignItems="center">
            {showPageNumber && (
              <Typography variant="body1">
                Page: {page} of {totalPages}
              </Typography>
            )}
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              color={color}
              variant={variant}
              shape={shape}
              size={size}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default PaginationControlled;
