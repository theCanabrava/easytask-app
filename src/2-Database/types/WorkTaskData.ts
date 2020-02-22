export default interface WorkTaskData
{
    id: string,
    workTaskName?: string,
    description?: string,
    projectId?: string,
    responsibleUserId?: string,
    startDate?: string,
    expectedConclusionDate?: string,
    finishDate?: string,
    where?: string,
    why?: string,
    how?: string,
    howMuch?: number,
    observation?: string
}