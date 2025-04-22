/**
 * Formats a given Date object into a string representation using the "de-EU" locale.
 * The resulting string will have the format "DD.MM.YYYY".
 *
 * @param value - The Date object to format.
 * @returns A string representing the formatted date.
 */
export const formatDateToString = (value: Date, timeOnly?: boolean): string => {
  if (timeOnly) {
    return value.toLocaleTimeString("de-EU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return value.toLocaleDateString("de-EU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * Converts a string representation of a date into a `Date` object.
 * If the input is already a `Date` object, it is returned as-is.
 * If the input is `undefined`, the function returns `undefined`.
 *
 * @param value - The value to be converted, which can be a string, a `Date` object, or `undefined`.
 * @returns A `Date` object if the input is a string or a `Date` object, or `undefined` if the input is `undefined`.
 */
export const formatStringToDate = (
  value: string | Date | undefined
): Date | undefined => {
  return typeof value === "string" ? new Date(value) : value;
};

export const formatStringToTime = (value: string): Date => {
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date;
};

export const formatTimeToString = (value: number): string => {
  const date = new Date(value);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const formatTimeToStringDuration = (value: number): string => {
  const date = new Date(value);
  const hours = getHoursFromDate(date);
  const minutes = getMinutesFromDate(date);

  return `${removeLeadingZero(hours)}h ${
    minutes === "0" ? "" : removeLeadingZero(minutes) + "m"
  }`;
};

export const formatDecimalToTime = (
  decimal: number,
  duration?: boolean
): string => {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  const pad = (n: number) => n.toString().padStart(2, "0");

  if (duration) {
    return `${removeLeadingZero(pad(hours))}h ${
      minutes === 0 ? "" : removeLeadingZero(pad(minutes)) + "m"
    }`;
  }

  return `${pad(hours)}:${pad(minutes)}`;
};

const getHoursFromDate = (date: Date): string => {
  return date.getHours().toString();
};

const getMinutesFromDate = (date: Date): string => {
  return date.getMinutes().toString();
};

const removeLeadingZero = (value: string): string => {
  return parseInt(value, 10).toString();
};
