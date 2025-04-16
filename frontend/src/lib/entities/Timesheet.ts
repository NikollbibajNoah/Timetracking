import { Project } from "./Project";
import { User } from "./User";

export interface Timesheet {
    id: number | undefined;
    date: Date | undefined;
    duration: number | undefined;
    project: Project | undefined;
    user: User | undefined;
}