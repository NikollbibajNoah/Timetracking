import { Tab, Tabs, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  formatDecimalToTime,
  formatStringToDate,
  formatStringToTime,
  formatTimeToString,
} from "../lib/utlis";
import { Timespan } from "@/lib/entities";

export interface DurationTabsProps {
  value: number | undefined;
  timespan?: Timespan;
  onChangeTime: (time: number | undefined, timespan?: Timespan) => void;
}

export const DurationTabs: React.FC<DurationTabsProps> = ({
  value,
  timespan,
  onChangeTime,
}) => {
  const [tab, setTab] = useState<number>(0);
  const [time, setTime] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (!value) {
      setTime("");
      setStartTime("");
      setEndTime("");
      setDuration(0);
    } else {
      let formattedTime = undefined;

      if (Number.isInteger(value)) {
        formattedTime = formatTimeToString(value);
      } else {
        formattedTime = formatDecimalToTime(value);
      }

      setDuration(value);
      setTime(formattedTime);
    }
    if (timespan) {
      const formattedStartDate = formatStringToDate(timespan.start)?.getTime();
      const formattedEndDate = formatStringToDate(timespan.end)?.getTime();
      setStartTime(formatTimeToString(formattedStartDate!));
      setEndTime(formatTimeToString(formattedEndDate!));
    } else {
      setStartTime("");
      setEndTime("");
    }
  }, [value, timespan]);

  useEffect(() => {
    if (tab === 0) {
      const formattedTime = formatStringToTime(time).getTime();

      if (formattedTime) {
        onChangeTime(formattedTime);
      }
    } else if (tab === 1) {
      if (startTime && endTime) {
        const durationDecimal = calculateDuration();
        setDuration(durationDecimal);
        onChangeTime(durationDecimal, {
          duration: durationDecimal,
          start: formatStringToTime(startTime),
          end: formatStringToTime(endTime),
        });
      }
    }
  }, [startTime, endTime, time, tab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleTimeChange = (time: string) => {
    setTime(time);
  };

  const handleStartTimeChange = (time: string) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time: string) => {
    setEndTime(time);
  };

  const calculateDuration = (): number => {
    const formattedStartTime = formatStringToTime(startTime);
    const formattedEndTime = formatStringToTime(endTime);

    if (formattedEndTime < formattedStartTime) {
      formattedEndTime.setDate(formattedEndTime.getDate() + 1);
    }

    const durationMs =
      formattedEndTime.getTime() - formattedStartTime.getTime();
    const durationMinutes = Math.floor(durationMs / 60000);

    return Number((durationMinutes / 60).toFixed(2));
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
                value={time}
                onChange={(e) => handleTimeChange(e.target.value)}
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
              />
              <TextField
                type="time"
                value={endTime}
                onChange={(e) => handleEndTimeChange(e.target.value)}
              />
            </div>
            <span>Duration: {formatDecimalToTime(duration)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
