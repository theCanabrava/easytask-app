import AuthManager from "../../1-AuthManager/AuthManager";
import UserStorage from "../../2-Database/interfaces/UserStorage";
import ProjectManager from "../../1-ProjectManager/ProjectManager";
import ProjectStorage from "../../2-Database/interfaces/ProjectStorage";
import WorkTaskStorage from "../../2-Database/interfaces/WorkTaskStorage";
import WorkTaskManager from "../../1-WorkTaskManager/WorkTaskManager";
import pushNotificationManager from "../../1-PushNotificationManager/PushNotificationManager";

export default interface AppToolset
{
    authManager: AuthManager
    projectManager: ProjectManager

    userStorage: UserStorage
    projectStorage: ProjectStorage

    workTaskStorage: WorkTaskStorage
    workTaskManager: WorkTaskManager
    pushNotificationManager: pushNotificationManager
}