import { Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  convertTimeStringToDecimal,
  formatDecimalToTime,
  formatStringToDate,
  formatStringToTime,
  formatTimeToString,
} from "../lib/utlis";
import { Timesheet, Timespan } from "@/lib/entities";

export interface DurationTabsProps {
  timespan: Timespan;
  invalidFields: Map<keyof Timesheet, boolean>;
  onChangeTime: (timespan: Timespan) => void;
}

export const DurationTabs: React.FC<DurationTabsProps> = ({
  timespan,
  invalidFields,
  onChangeTime,
}) => {
  const [tab, setTab] = useState<number>(0);
  const [duration, setDuration] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    if (tab === 0 && timespan.duration) {
      const formattedTime = formatDecimalToTime(timespan.duration);

      setDuration(formattedTime);
    } else {
      setDuration("");
      setStartTime("");
      setEndTime("");
    }

    if (tab === 1 && timespan.start && timespan.end) {
      const formattedStartDate = formatStringToDate(timespan.start)?.getTime();
      const formattedEndDate = formatStringToDate(timespan.end)?.getTime();

      if (formattedStartDate && formattedEndDate) {
        setStartTime(formatTimeToString(formattedStartDate!));
        setEndTime(formatTimeToString(formattedEndDate!));
      }
    }
  }, [timespan, tab]);

  useEffect(() => {
    if (tab === 0) {
      const formattedTime: number = convertTimeStringToDecimal(duration);
    
      if (formattedTime) {
        onChangeTime({
          duration: formattedTime,
          start: undefined,
          end: undefined,
        });
      }
    }
  }, [duration, tab]);

  useEffect(() => {
    if (tab === 1 && startTime && endTime) {
      const durationDecimal: number = calculateDuration();
      onChangeTime({
        duration: durationDecimal,
        start: formatStringToTime(startTime),
        end: formatStringToTime(endTime),
      });
    }
  }, [startTime, endTime, tab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleDurationChange = (time: string) => {
    setDuration(time);
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
  };

  const calculateDuration = (): number => {
    const formattedStartTime: Date = formatStringToTime(startTime);
    const formattedEndTime: Date = formatStringToTime(endTime);

    if (formattedEndTime < formattedStartTime) {
      formattedEndTime.setDate(formattedEndTime.getDate() + 1);
    }

    const durationMs: number =
      formattedEndTime.getTime() - formattedStartTime.getTime();
    const durationMinutes = Math.floor(durationMs / 60000);

    const result = Number((durationMinutes / 60).toFixed(2));

    return result ? result : 0;
  };

  return (
    <div>
      <Tabs value={tab} onChange={handleTabChange}>
        <Tab label="Hours" />
        <Tab label="Timespan" />
      </Tabs>
      <div className="p-2">
        {tab === 0 && (
          <div>
            <div>Time</div>
            <div>
              <TextField
                type="time"
                value={duration}
                onChange={(e) => handleDurationChange(e.target.value)}
                error={invalidFields.get("timespan")}
              />
            </div>
          </div>
        )}
        {tab === 1 && (
          <div>
            <div>Timespan</div>
            <div className="flex gap-4">
              <TextField
                type="time"
                value={startTime}
                onChange={(e) => handleStartTimeChange(e.target.value)}
                error={invalidFields.get("timespan")}
              />
              <TextField
                type="time"
                value={endTime}
                onChange={(e) => handleEndTimeChange(e.target.value)}
                error={invalidFields.get("timespan")}
              />
            </div>
            <span>Duration: {formatDecimalToTime(calculateDuration())}</span>
          </div>
        )}
      </div>
    </div>
  );
};
