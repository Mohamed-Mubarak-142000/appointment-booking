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
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Add,
  Search,
  MoreVert,
  Visibility,
  Edit,
  Delete,
} from "@mui/icons-material";
import type { DataTableProps } from "../../../apis/use-case/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  error = null,
  onAdd,
  onEdit,
  onDelete,
  onView,
  addButtonText = "Add New",
  title,
  pagination,
  sorting,
  emptyMessage = "No data available",
  searchTerm = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  showSearch = false,
}: DataTableProps<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleView = () => {
    if (selectedRow && onView) {
      onView(selectedRow);
    }
    handleClose();
  };

  const handleEdit = () => {
    if (selectedRow && onEdit) {
      onEdit(selectedRow);
    }
    handleClose();
  };

  const handleDelete = () => {
    if (selectedRow && onDelete) {
      onDelete(selectedRow);
    }
    handleClose();
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    pagination?.onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    pagination?.onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  const handleSort = (columnId: keyof T) => {
    sorting?.onSort(columnId);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {(title || onAdd) && (
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
          {onAdd && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={onAdd}
            >
              {addButtonText}
            </Button>
          )}
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
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id.toString()}
                  align={column.align || "left"}
                  sx={{ fontWeight: "bold" }}
                >
                  {sorting && column.sortable ? (
                    <TableSortLabel
                      active={sorting.sortBy === column.id}
                      direction={
                        sorting.sortBy === column.id ? sorting.sortOrder : "asc"
                      }
                      onClick={() => handleSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
              {(onView || onEdit || onDelete) && (
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  الإجراءات
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + (onView || onEdit || onDelete ? 1 : 0)
                  }
                  align="center"
                >
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + (onView || onEdit || onDelete ? 1 : 0)
                  }
                  align="center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id.toString()}
                        align={column.align || "left"}
                      >
                        {column.format
                          ? column.format(value, row)
                          : String(value)}
                      </TableCell>
                    );
                  })}
                  {(onView || onEdit || onDelete) && (
                    <TableCell align="center">
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e, row)}
                      >
                        <MoreVert />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            width: "20ch",
                          },
                        }}
                      >
                        {onView && (
                          <MenuItem onClick={handleView}>
                            <Visibility fontSize="small" sx={{ mr: 1 }} />
                            View
                          </MenuItem>
                        )}
                        {onEdit && (
                          <MenuItem onClick={handleEdit}>
                            <Edit fontSize="small" sx={{ mr: 1 }} />
                            Edit
                          </MenuItem>
                        )}
                        {onDelete && (
                          <MenuItem onClick={handleDelete}>
                            <Delete fontSize="small" sx={{ mr: 1 }} />
                            Delete
                          </MenuItem>
                        )}
                      </Menu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
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
