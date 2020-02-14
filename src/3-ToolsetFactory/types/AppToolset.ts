import AuthManager from "../../1-AuthManager/AuthManager";
import UserStorage from "../../2-Database/interfaces/UserStorage";

export default interface AppToolset
{
    authManager: AuthManager
    userStorage: UserStorage
}