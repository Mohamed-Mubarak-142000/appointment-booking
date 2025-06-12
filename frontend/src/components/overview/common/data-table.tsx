import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Typography,
  Box,
  TablePagination,
  TableSortLabel,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import { Search, MoreVert } from "@mui/icons-material";
import type { DataTableProps } from "../../../apis/use-case/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  error = null,
  renderAddButton,
  renderEditButton,
  renderDeleteButton,
  renderViewButton,
  title,
  pagination,
  sorting,
  emptyMessage = "No data available",
  searchTerm = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  showSearch = false,
}: DataTableProps<T>) => {
  const [anchorElMap, setAnchorElMap] = useState<
    Record<string, HTMLElement | null>
  >({});
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const getRowId = (row: T, index: number) => row._id || index;

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    row: T,
    index: number
  ) => {
    const id = getRowId(row, index);
    setAnchorElMap((prev) => ({ ...prev, [id]: event.currentTarget }));
    setSelectedRow(row);
  };

  const handleMenuClose = (rowId: string | number) => {
    setAnchorElMap((prev) => ({ ...prev, [rowId]: null }));
  };

  const handleChangePage = (_: unknown, newPage: number) =>
    pagination?.onPageChange(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) =>
    pagination?.onRowsPerPageChange(parseInt(e.target.value, 10));

  const handleSort = (columnId: keyof T) => sorting?.onSort(columnId);

  const showActions = !!(
    renderViewButton ||
    renderEditButton ||
    renderDeleteButton
  );
  const columnSpan = columns.length + (showActions ? 1 : 0);

  const renderHeader = () => (
    <TableHead>
      <TableRow>
        {columns.map(({ id, align, label, sortable }) => (
          <TableCell
            key={id.toString()}
            align={align || "left"}
            sx={{ fontWeight: "bold" }}
          >
            {sorting && sortable ? (
              <TableSortLabel
                active={sorting.sortBy === id}
                direction={sorting.sortBy === id ? sorting.sortOrder : "asc"}
                onClick={() => handleSort(id)}
              >
                {label}
              </TableSortLabel>
            ) : (
              label
            )}
          </TableCell>
        ))}
        {showActions && (
          <TableCell align="center" sx={{ fontWeight: "bold" }}>
            الإجراءات
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );

  const renderBody = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={columnSpan} align="center">
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    }

    if (!data.length) {
      return (
        <TableRow>
          <TableCell colSpan={columnSpan} align="center">
            {emptyMessage}
          </TableCell>
        </TableRow>
      );
    }

    return data.map((row, index) => {
      const rowId = getRowId(row, index);
      return (
        <TableRow key={rowId}>
          {columns.map(({ id, align, format }) => (
            <TableCell key={id.toString()} align={align || "left"}>
              {format ? format(row[id], row) : String(row[id])}
            </TableCell>
          ))}
          {showActions && (
            <TableCell align="center">
              <IconButton
                aria-label="actions"
                onClick={(e) => handleMenuClick(e, row, index)}
              >
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorElMap[rowId]}
                open={Boolean(anchorElMap[rowId])}
                onClose={() => handleMenuClose(rowId)}
                PaperProps={{ style: { width: "15ch" } }}
              >
                {renderViewButton &&
                  selectedRow &&
                  selectedRow._id === row._id && (
                    <MenuItem>
                      {renderViewButton(row, () => handleMenuClose(rowId))}
                    </MenuItem>
                  )}

                {renderEditButton &&
                  selectedRow &&
                  selectedRow._id === row._id && (
                    <MenuItem>
                      {renderEditButton(row, () => handleMenuClose(rowId))}
                    </MenuItem>
                  )}

                {renderDeleteButton &&
                  selectedRow &&
                  selectedRow._id === row._id && (
                    <MenuItem>
                      {renderDeleteButton(row, () => handleMenuClose(rowId))}
                    </MenuItem>
                  )}
              </Menu>
            </TableCell>
          )}
        </TableRow>
      );
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      {(title || renderAddButton) && (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: (theme) => theme.palette.primary.lighter,
            height: 100,
            borderRadius: 2,
            px: 2,
          }}
          mb={2}
        >
          {title && <Typography variant="h6">{title}</Typography>}
          {renderAddButton}
        </Box>
      )}

      {showSearch && (
        <Box mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper}>
        <Table>
          {renderHeader()}
          <TableBody>{renderBody()}</TableBody>
        </Table>
      </TableContainer>

      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={pagination.totalRows}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default DataTable;
