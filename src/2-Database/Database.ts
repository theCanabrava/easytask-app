import UserData from "./types/UserData";
import ApiResponse from "../0-ApiLibrary/types/ApiResponse";
import UserStorage from "./interfaces/UserStorage";
import * as SQLite from 'expo-sqlite';
import DBConstants from "./constants/DBConstants";
import { WebSQLDatabase } from "expo-sqlite";
const jwt_decode = require('jwt-decode');

export default class Database implements UserStorage
{
    private database: WebSQLDatabase;
    private userData: UserData;
    private resolve: (value?: unknown) => void

    constructor()
    {
        this.database = SQLite.openDatabase(DBConstants.name);
        this.userData = 
        {
            email: '',
            uuid: '',
            webtoken: '',
        }
    }

    public async initDatabase()
    {
        return new Promise((res, rej) =>
        {
            this.resolve = res;
            this.database.transaction(this.createUserTable.bind(this));
        });
    }

    private createUserTable(tx)
    {
        const statement = `CREATE TABLE IF NOT EXISTS ${DBConstants.tables.user}
        (
            ${DBConstants.userFields.id} ${DBConstants.userTypes.id},
            ${DBConstants.userFields.email} ${DBConstants.userTypes.email},
            ${DBConstants.userFields.uuid} ${DBConstants.userTypes.uuid},
            ${DBConstants.userFields.webtoken} ${DBConstants.userTypes.webtoken}
        );`;

        tx.executeSql(statement, [], this.selectUser.bind(this));
    }

    private selectUser(tx, res)
    {
        const statement = `SELECT * FROM ${DBConstants.tables.user}`;
        tx.executeSql(statement, [], this.extractUser.bind(this));
    }

    private extractUser(tx, res)
    {
        if(res.rows.length==0) this.addUser(tx, res);
        else this.saveUser(res);
    }

    private addUser(tx, res)
    {
        const statement = `INSERT INTO  ${DBConstants.tables.user} VALUES (0, "", "", "");`;
        tx.executeSql(statement, [], this.selectUser.bind(this));
    }

    private saveUser(res)
    {
        this.userData = 
        {
            email: res.rows.item(0).email,
            uuid: res.rows.item(0).uuid,
            webtoken: res.rows.item(0).webtoken,
        };
        if(this.resolve !== undefined) this.resolve('Done!');
    }

    public getUser(): UserData
    {
        return this.userData;
    }

    public updateUser(user: UserData)
    {
        this.softSave(user);
        this.commitToDatabase();
    }

    private softSave(user: UserData)
    {
        if(user.email) this.userData.email = user.email;
        if(user.uuid) this.userData.uuid = user.uuid;
        if(user.webtoken) this.userData.webtoken = user.webtoken
    }

    private commitToDatabase()
    {
        this.database.transaction((tx) =>
        {
            const statement = `UPDATE ${DBConstants.tables.user} 
            SET
            ${DBConstants.userFields.email} = '${this.userData.email}',
            ${DBConstants.userFields.uuid} = '${this.userData.uuid}',
            ${DBConstants.userFields.webtoken} = '${this.userData.webtoken}'
            WHERE
            ${DBConstants.userFields.id} = 0
            `
            tx.executeSql(statement, []);
        })
    }

    public notify(response: ApiResponse)
    {
        if(response.data.success === true) this.renewToken(response);
        else this.resetUser();
    }

    private renewToken(response: ApiResponse)
    {
        const webtoken = response.data.data;
        const uuid = jwt_decode(webtoken).sub;
        this.softSave({uuid: uuid, webtoken: webtoken});
        this.commitToDatabase();
    }

    private resetUser()
    {
        this.userData =
        {
            email: '',
            uuid: '',
            webtoken: '',
        }
        this.dropTables();
    }

    private dropTables()
    {
        this.database.transaction((tx) =>
        {
            const statement = `DROP TABLE ${DBConstants.tables.user}`
            tx.executeSql(statement, [], (tx, res) =>
            {
                this.initDatabase();
            });
        });
    }

    public getToken(): string
    {
        return this.userData.webtoken;
    }
}