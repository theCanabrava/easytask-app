import UserData from "../types/UserData";

export default interface UserStorage
{
    getUser(): UserData;
    updateUser(user: UserData);
}