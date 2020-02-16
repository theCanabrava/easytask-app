export default interface UpdateWorkTaskParameters
{
    workTaskName: string;
    projectId: string;
    id: string;
    description: string;
    expectedConclusionDate: string;
    where: string;
    why: string;
    how: string;
    howMuch: number;
    observation: string;
}