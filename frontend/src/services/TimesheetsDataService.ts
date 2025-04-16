import { Timesheet } from "@/lib/entities";
import axiosInstance from "./AxiosInstance";

const TIMESHEETS_API_URL = import.meta.env.VITE_APP_BACKEND_TIMESHEETS_ENDPOINT;

const getTimesheets = async () => {
  try {
    const res = await axiosInstance.get(TIMESHEETS_API_URL);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching timesheets:", error);
  }
};

const createTimesheet = async (timesheet: Timesheet) => {
  try {
    const res = await axiosInstance.post(TIMESHEETS_API_URL, timesheet);

    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    console.error("Error creating timesheet:", error);
  }
};

const updateTimesheet = async (timesheet: Timesheet) => {
  try {
    const res = await axiosInstance.put(
      `${TIMESHEETS_API_URL}/${timesheet.id}`,
      timesheet
    );

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error updating timesheet:", error);
  }
};

const deleteTimesheet = async (id: number | undefined) => {
  if (!id) {
    console.error("Invalid timesheet ID:", id);
    return;
  }

  try {
    const res = await axiosInstance.delete(`${TIMESHEETS_API_URL}/${id}`);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error deleting timesheet:", error);
  }
};

export { getTimesheets, createTimesheet, updateTimesheet, deleteTimesheet };
