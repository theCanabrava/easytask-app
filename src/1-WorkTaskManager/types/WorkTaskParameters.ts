export default interface WorkTaskParameters
{
    workTaskName: string;
    projectId: string;
    id: string;
    description: string;
    startDate: string;
    expectedConclusionDate: string;
    where: string;
    why: string;
    how: string;
    howMuch: number;
    observation: string;
}