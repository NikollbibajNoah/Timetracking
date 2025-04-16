import React, { ReactNode, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataTable, DataTableHeaderConfig } from "./DataTable";
import { ActionsMenu } from "./ActionsMenu";
import { Timesheet } from "@/lib/entities";

export interface MenuOption {
  label: string;
  onClick?: (row: Timesheet) => void;
  icon?: ReactNode;
  className?: string;
}

export interface TimesheetsTableProps {
  value: Timesheet[];
  onEdit?: (row: Timesheet) => void;
  onDelete?: (row: Timesheet) => void;
}

const tableConfig: DataTableHeaderConfig[] = [
  { label: "Datum", width: "14" },
  { label: "Stunden" },
  { label: "Projekt" },
  { label: "Benutzer" },
  { label: "Aktionen", width: "5" },
];

export const TimesheetsTable: React.FC<TimesheetsTableProps> = ({
  value,
  onEdit,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Timesheet | undefined>(
    undefined
  );
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    row: Timesheet
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedRow(undefined);
  };

  const options: MenuOption[] = [
    {
      label: "Bearbeiten",
      onClick: onEdit,
      icon: <EditIcon />,
    },
    {
      label: "Löschen",
      onClick: onDelete,
      icon: <DeleteIcon />,
      className: "text-red-500",
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="my-2">
          <h2 className="text-2xl font-bold">Timesheets</h2>
        </div>
        <div>
          <DataTable
            value={value}
            config={tableConfig}
            onRowClick={(e, row) => handleClick(e, row)}
          />
          <ActionsMenu
            anchorEl={anchorEl}
            options={options}
            onClose={handleClose}
            selectedRow={selectedRow}
          />
        </div>
      </div>
    </>
  );
};
