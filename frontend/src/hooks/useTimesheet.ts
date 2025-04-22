import { Timesheet } from "@/lib/entities";
import { useState } from "react";

export const useTimesheet = (initialTimesheet: Timesheet) => {
  const [timesheet, setTimesheet] = useState<Timesheet>(initialTimesheet);

  const updateTimesheetField = <K extends keyof Timesheet>(
    field: K,
    value: Timesheet[K]
  ) => {
    setTimesheet({ ...timesheet, [field]: value });
  };

  const clearTimesheet = () => {
    setTimesheet({
      date: undefined,
      duration: undefined,
      timespan: {
        duration: undefined,
        start: undefined,
        end: undefined,
      },
      user: undefined,
      project: undefined,
      id: undefined,
    });
  };

  return {
    updateTimesheetField,
    timesheet,
    setTimesheet,
    clearTimesheet,
  };
};
