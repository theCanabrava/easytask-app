export default interface CreateWorkTaskParameters
{
    workTaskName: string;
    projectId: string;
    description: string;
    expectedConclusionDate: string;
    where: string;
    why: string;
    how: string;
    howMuch: number;
    observation: string;
}