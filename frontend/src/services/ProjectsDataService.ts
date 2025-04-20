import { Project } from "@/lib/entities";
import axiosInstance from "./AxiosInstance";

const PROJECTS_API_URL = import.meta.env.VITE_APP_BACKEND_PROJECTS_ENDPOINT;

const getProjects = async (): Promise<Project[] | undefined> => {
  try {
    const res = await axiosInstance.get(PROJECTS_API_URL);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};


export { getProjects };