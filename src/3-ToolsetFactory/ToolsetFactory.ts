import AppToolset from "./types/AppToolset";
import Database from "../2-Database/Database";
import AuthManager from "../1-AuthManager/AuthManager";
import AuthManagerComponents from "../1-AuthManager/types/AuthManagerComponents";
import ProjectManagerComponents from "../1-ProjectManager/types/ProjectManagerComponents";
import WorkTaskManagerComponents from "../1-WorkTaskManager/types/WorkTaskManagerComponents";
import PushNotificationComponents from "../1-PushNotificationManager/types/PushNotificationComponents"
import AxiosCommunicator from "../2-AxiosCommunicator/AxiosCommunicator";
import ProjectManager from "../1-ProjectManager/ProjectManager";
import WorkTaskManager from "../1-WorkTaskManager/WorkTaskManager";
import PushNotificationManager from "../1-PushNotificationManager/PushNotificationManager";

export default class ToolsetFactory
{
    public static async makeToolset(): Promise<AppToolset>
    {
        const database = this.makeDatabase();
        await database.initDatabase();
        const authManager = this.makeAuthManager(database);
        const projectManager = this.makeProjectManager(database);
        const workTaskManager = this.makeWorkTaskManager(database);
        const pushNotificationManager = this.pushNotificationManager(database);

        const toolset: AppToolset =
        {
            userStorage: database,
            projectStorage: database,
            workTaskStorage: database,

            authManager: authManager,
            projectManager: projectManager,
            workTaskManager: workTaskManager,
            pushNotificationManager: pushNotificationManager
        }
        return toolset;
    }
    private static makeAuthManager(database: Database): AuthManager
    {
        const communicator =  new AxiosCommunicator();
        const components: AuthManagerComponents =
        {
            communicator: communicator,
            dataSource: database,
            subscribers: [database]
        }
        return new AuthManager(components)
    }

    private static makeProjectManager(database: Database): ProjectManager
    {
        const communicator =  new AxiosCommunicator();
        const components: ProjectManagerComponents =
        {
            communicator: communicator,
            dataSource: database,
            subscribers: [database]
        }
        return new ProjectManager(components)
    }

    private static makeWorkTaskManager(database: Database): WorkTaskManager
    {
        const communicator =  new AxiosCommunicator();
        const components: WorkTaskManagerComponents =
        {
            communicator: communicator,
            dataSource: database,
            subscribers: [database]
        }
        return new WorkTaskManager(components)
    }

    static pushNotificationManager(database: Database) : PushNotificationManager
    {
        const communicator =  new AxiosCommunicator();
        const components: PushNotificationComponents =
        {
            communicator: communicator,
            dataSource: database
        }
        return new PushNotificationManager(components);
    }

    private static makeDatabase(): Database
    {
        return new Database();
    }
}