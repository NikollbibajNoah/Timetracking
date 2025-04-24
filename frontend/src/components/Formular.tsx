import { Autocomplete, Button, TextField } from "@mui/material";
import { DurationTabs } from "./DurationTabs";
import { FormularSection } from "./FormularSection";

import { useTimesheet } from "../hooks/useTimesheet";
import { formatStringToDate } from "../lib/utlis";
import React, { useEffect, useState } from "react";
import { getProjects } from "../services/ProjectsDataService";
import { Timesheet, Project, Timespan } from "@/lib/entities";
import JsonView from "@uiw/react-json-view";

const mandatoryFields: ReadonlyArray<keyof Timesheet> = [
  "date",
  "timespan",
  "project",
];

export interface TimesheetFormProps {
  value: Timesheet;
  onSave?: (timesheet: Timesheet) => void;
}

export const Formular: React.FC<TimesheetFormProps> = ({ value, onSave }) => {
  const [projects, setProjects] = useState<Project[] | undefined>([]);
  const { timesheet, setTimesheet, clearTimesheet, updateTimesheetField } =
    useTimesheet(value);
  const [invalidFields, setInvalidFields] = useState<
    Map<keyof Timesheet, boolean>
  >(new Map());

  const fetchProjects = async () => {
    const res = await getProjects();

    if (res) {
      setProjects(res);
    }
  };

  useEffect(() => {
    if (value.id !== timesheet.id) {
      invalidFields.clear();
    }

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
    if (validateTimesheet(timesheet, mandatoryFields)) return;

    onSave?.(timesheet);
    clearTimesheet();
  };

  const handleProjectChange = (project: Project | null) => {
    updateTimesheetField("project", project ?? undefined);
  };

  const handleDateChange = (date: string) => {
    const formattedDate = formatStringToDate(date);

    updateTimesheetField("date", formattedDate);
  };

  const handleTimeChange = (timespan: Timespan) => {
    updateTimesheetField("timespan", timespan);
  };

  const validateTimesheet = (
    timesheet: Timesheet,
    mandatoryFields: ReadonlyArray<keyof Timesheet>
  ) => {
    const missingFields: Map<keyof Timesheet, boolean> = new Map();

    Object.entries(timesheet).forEach(([key, value]) => {
      if (!mandatoryFields.includes(key as keyof Timesheet)) {
        return;
      }

      if (key === "timespan") {
        const timespan: Timespan = value as Timesheet["timespan"];

        if (!timespan.duration && (!timespan.start || !timespan.end)) {
          missingFields.set(key as keyof Timesheet, true);
        }
      } else if (value === undefined || value === "") {
        missingFields.set(key as keyof Timesheet, true);
      }
    });

    setInvalidFields(missingFields);

    return missingFields.size > 0;
  };

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
                <TextField
                  {...params}
                  label="Projekt"
                  error={invalidFields.get("project")}
                  helperText={
                    invalidFields.get("project") && "Bitte Projekt auswählen"
                  }
                />
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
              error={invalidFields.get("date")}
            />
          </FormularSection>
          <FormularSection title="Duration">
            <DurationTabs
              timespan={timesheet.timespan}
              invalidFields={invalidFields}
              onChangeTime={handleTimeChange}
            />
          </FormularSection>
        </div>
        <div className="my-4">
          <Button variant="contained" color="success" onClick={saveTimesheet}>
            Erfassen
          </Button>
        </div>
        <JsonView value={timesheet} />
      </div>
    </div>
  );
};
