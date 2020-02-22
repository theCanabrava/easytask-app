import WorkTaskData from "../types/WorkTaskData";

export default interface WorkTaskStorage
{
    getWorkTasks(): WorkTaskData[];
    updateWorkTask(workTask: WorkTaskData);
    deleteWorkTask(workTask: string);
}