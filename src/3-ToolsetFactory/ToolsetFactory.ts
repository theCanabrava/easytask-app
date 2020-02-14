import AppToolset from "./types/AppToolset";
import Database from "../2-Database/Database";
import AuthManager from "../1-AuthManager/AuthManager";
import AuthManagerComponents from "../1-AuthManager/types/AuthManagerComponents";
import AxiosCommunicator from "../2-AxiosCommunicator/AxiosCommunicator";

export default class ToolsetFactory
{
    public static async makeToolset(): Promise<AppToolset>
    {
        const database = this.makeDatabase();
        await database.initDatabase();
        const authManager = this.makeAuthManager(database);
        const toolset: AppToolset =
        {
            userStorage: database,
            authManager: authManager
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

    private static makeDatabase(): Database
    {
        return new Database();
    }
}