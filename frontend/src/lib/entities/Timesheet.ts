import { Project } from "./Project";
import { Timespan } from "./Timespan";
import { User } from "./User";

export interface Timesheet {
    id: number | undefined;
    date: Date | undefined;
    timespan: Timespan;
    project: Project | undefined;
    user: User | undefined;
}