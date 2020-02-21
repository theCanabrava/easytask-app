import ProjectData from "../types/ProjectData";

export default interface ProjectStorage
{
    getProjects(): ProjectData[];
    updateProject(project: ProjectData);
    deleteProject(projectId: string);
}