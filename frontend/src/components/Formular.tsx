import { Autocomplete, Button, TextField } from "@mui/material";
import { DurationTabs } from "./DurationTabs";
import { FormularSection } from "./FormularSection";

import { useTimesheet } from "../hooks/useTimesheet";
import { formatStringToDate } from "../lib/utlis";
import React, { useEffect, useState } from "react";
import { getProjects } from "../services/ProjectsDataService";
import { Timesheet, Project, Timespan } from "@/lib/entities";
import JsonView from "@uiw/react-json-view";

export interface TimesheetFormProps {
  value: Timesheet;
  onSave?: (timesheet: Timesheet) => void;
}

export const Formular: React.FC<TimesheetFormProps> = ({ value, onSave }) => {
  const [projects, setProjects] = useState<Project[] | undefined>([]);
  const { timesheet, setTimesheet, clearTimesheet, updateTimesheetField } =
    useTimesheet(value);

  const fetchProjects = async () => {
    const res = await getProjects();

    if (res) {
      setProjects(res);
    }
  };

  useEffect(() => {
    setTimesheet({
      ...value,
      timespan: {
        ...value.timespan,
        duration: value.timespan?.duration
          ? value.timespan.duration
          : undefined,
      },
      date: value.date ? new Date(value.date) : undefined,
    });
  }, [value]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const saveTimesheet = async () => {
    onSave?.(timesheet);
  };

  const clearFormular = () => {
    clearTimesheet();
  };

  const handleProjectChange = (project: Project | null) => {
    updateTimesheetField("project", project ?? undefined);
  };

  const handleDateChange = (date: string) => {
    const formattedDate = formatStringToDate(date);

    updateTimesheetField("date", formattedDate);
  };

  const handleTimeChange = (time: number | undefined, timespan?: Timespan) => {
    if (timespan) {
      updateTimesheetField("timespan", timespan);
    } else {
      updateTimesheetField("timespan", {
        ...timesheet.timespan,
        duration: time,
      });
    }
  };

  // const handleTimespanChange = (timespan: Timesheet) => {
  //   updateTimesheetField("timespan", timespan ?? undefined);
  // }

  return (
    <div className="w-[600px] p-4 flex">
      <div>
        <div className="my-2">
          <h2 className="text-2xl font-bold">Formular</h2>
        </div>
        <div className="flex flex-col gap-5 p-2">
          <FormularSection title="Project">
            <Autocomplete
              key={timesheet.project?.id ?? undefined}
              value={timesheet.project}
              options={projects ?? []}
              renderInput={(params) => (
                <TextField {...params} label="Projekt" />
              )}
              onChange={(e, value: Project | null) =>
                handleProjectChange(value)
              }
              getOptionLabel={(option: Project) => option.projectName}
              className="w-64"
            />
          </FormularSection>
          <FormularSection title="Date">
            <TextField
              value={
                typeof timesheet.date === "object"
                  ? timesheet.date.toISOString().split("T")[0]
                  : ""
              }
              type="date"
              className="w-36"
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </FormularSection>
          <FormularSection title="Duration">
            <DurationTabs
              value={timesheet.timespan.duration}
              timespan={timesheet.timespan}
              onChangeTime={(time, timespan) =>
                handleTimeChange(time, timespan)
              }
            />
          </FormularSection>
        </div>
        <div className="my-4">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              saveTimesheet();
              clearFormular();
            }}
          >
            Erfassen
          </Button>
        </div>
        <JsonView value={timesheet} />
      </div>
    </div>
  );
};
