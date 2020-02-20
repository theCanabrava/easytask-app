import UserData from "../types/UserData";
import ProjectData from "../types/ProjectData";

export default interface UserStorage
{
    getUser(): UserData;
    updateUser(user: UserData);

    getProjects(): ProjectData[];
    updateProject(project: ProjectData);
}