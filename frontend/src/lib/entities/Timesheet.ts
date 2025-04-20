import { Project } from "./Project";
import { Timespan } from "./Timespan";
import { User } from "./User";

export interface Timesheet {
    id: number | undefined;
    date: Date | undefined;
    duration: number | undefined;
    timespan: Timespan | undefined;
    project: Project | undefined;
    user: User | undefined;
}