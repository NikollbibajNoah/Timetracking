import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import {
  formatDateToString,
  formatStringToDate,
  formatDecimalToTime,
} from "../lib/utlis";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Timesheet } from "@/lib/entities";

export interface DataTableHeaderConfig {
  label: string;
  width?: string;
}

export interface DataTableProps {
  value: Timesheet[];
  config: DataTableHeaderConfig[];
  onRowClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: Timesheet
  ) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  value,
  config,
  onRowClick,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRows: number) => {
    setRowsPerPage(newRows);
    setPage(0);
  };

  return (
    <Paper className="overflow-hidden shadow-md rounded-lg">
      <TableContainer className="min-w-[800px] h-[450px]">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {config.map((header: DataTableHeaderConfig) => (
                <TableCell className={`w-${header.width}`}>
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {value
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Timesheet, i: number) => (
                <TableRow
                  key={row.id}
                  className={`${i % 2 === 0 ? "bg-gray-50" : ""}`}
                >
                  <TableCell>
                    {row.date ? formatDateToString(formatStringToDate(row.date)!) : "-"}
                  </TableCell>
                  <TableCell>
                    {row.timespan.duration ? formatDecimalToTime(row.timespan.duration, true) : "-"}
                  </TableCell>
                  <TableCell>
                      {row.timespan.start ? formatDateToString(formatStringToDate(row.timespan.start)!, true) : "-"}
                  </TableCell>
                  <TableCell>
                      {row.timespan.end ? formatDateToString(formatStringToDate(row.timespan.end)!, true) : "-"}
                  </TableCell>
                  <TableCell>{row.project ? row.project.projectName : "-"}</TableCell>
                  <TableCell>{row.user ? row.user.name : "-"}</TableCell>
                  <TableCell className="w-20" align="right">
                    <IconButton
                      onClick={(e) => onRowClick && onRowClick(e, row)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        count={value.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, page) => handlePageChange(page)}
        onRowsPerPageChange={(event) =>
          handleRowsPerPageChange(Number(event.target.value))
        }
      />
    </Paper>
  );
};
