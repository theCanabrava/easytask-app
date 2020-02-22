import AuthManager from "../../1-AuthManager/AuthManager";
import UserStorage from "../../2-Database/interfaces/UserStorage";
import ProjectManager from "../../1-ProjectManager/ProjectManager";
import ProjectStorage from "../../2-Database/interfaces/ProjectStorage";

export default interface AppToolset
{
    authManager: AuthManager
    projectManager: ProjectManager

    userStorage: UserStorage
    projectStorage: ProjectStorage
}