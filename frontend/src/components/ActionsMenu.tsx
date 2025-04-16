import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { MenuOption } from "./TimesheetsTable";
import { Timesheet } from "@/lib/entities";

const ITEM_HEIGHT = 48;

export interface ActionsMenuProps {
  options: MenuOption[];
  anchorEl: HTMLElement | null;
  selectedRow?: Timesheet;
  onClose?: () => void;
}

export const ActionsMenu: React.FC<ActionsMenuProps> = ({
  options,
  anchorEl,
  selectedRow,
  onClose,
}) => {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <Menu
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        },
      }}
    >
      {options.map((option: MenuOption) => (
        <MenuItem
          key={option.label}
          onClick={() => {
            if (option.onClick && selectedRow) option.onClick(selectedRow);
            handleClose();
          }}
        >
          <div className={`flex gap-2 ${option.className}`}>
            <div className="mr-2">{option.label}</div>
            <div>{option.icon}</div>
          </div>
        </MenuItem>
      ))}
    </Menu>
  );
};
