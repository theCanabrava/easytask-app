import UserData from "./types/UserData";
import ApiResponse from "../0-ApiLibrary/types/ApiResponse";
import UserStorage from "./interfaces/UserStorage";
import * as SQLite from 'expo-sqlite';
import DBConstants from "./constants/DBConstants";
import { WebSQLDatabase } from "expo-sqlite";
import ProjectData from "./types/ProjectData";
const jwt_decode = require('jwt-decode');

export default class Database implements UserStorage
{
    private database: WebSQLDatabase;
    private userData: UserData;
    private projecsArray: ProjectData[];
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
        this.projecsArray = [];
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
        else 
        {
            this.saveUser(res);
            this.createProjectsTable(tx, res);
        }
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
    }

    private createProjectsTable(tx, res)
    {
        const statement = `CREATE TABLE IF NOT EXISTS ${DBConstants.tables.project}
        (
            ${DBConstants.projectFields.id} ${DBConstants.projectTypes.id},
            ${DBConstants.projectFields.projectName} ${DBConstants.projectTypes.projectName},
            ${DBConstants.projectFields.description} ${DBConstants.projectTypes.description},
            ${DBConstants.projectFields.startDate} ${DBConstants.projectTypes.startDate},
            ${DBConstants.projectFields.finishDate} ${DBConstants.projectTypes.finishDate},
            ${DBConstants.projectFields.managerId} ${DBConstants.projectTypes.managerId},
            ${DBConstants.projectFields.completed} ${DBConstants.projectTypes.completed}
        );`;

        tx.executeSql(statement, [], this.selectProjects.bind(this), (err) => console.log(err));
    }

    private selectProjects(tx, res)
    {
        const statement = `SELECT * FROM ${DBConstants.tables.project}`;
        tx.executeSql(statement, [], this.extractProjects.bind(this));
    }

    private extractProjects(tx, res)
    {
        for(let i=0; i<res.rows.length; i++)
        {
            const project: ProjectData =
            {
                id: res.rows.item(i).id,
                projectName: res.rows.item(i).projectName,
                description: res.rows.item(i).description,
                startDate: res.rows.item(i).startDate,
                finishDate: res.rows.item(i).finishDate,
                managerId: res.rows.item(i).managerId,
                completed: res.rows.item(i).completed,
            }
            this.projecsArray.push(project);
        }
        if(this.resolve !== undefined) this.resolve('Done!');
    }

    public getUser(): UserData
    {
        return this.userData;
    }

    public updateUser(user: UserData)
    {
        this.softSave(user);
        this.commitUser();
    }

    private softSave(user: UserData)
    {
        if(user.email) this.userData.email = user.email;
        if(user.uuid) this.userData.uuid = user.uuid;
        if(user.webtoken) this.userData.webtoken = user.webtoken
    }

    private commitUser()
    {
        this.database.transaction((tx) =>
        {
            const statement = `UPDATE ${DBConstants.tables.user} 
            SET
            ${DBConstants.userFields.email} = '${this.userData.email}',
            ${DBConstants.userFields.uuid} = '${this.userData.uuid}',
            ${DBConstants.userFields.webtoken} = '${this.userData.webtoken}'
            WHERE
            ${DBConstants.userFields.id} = 0`
            tx.executeSql(statement, []);
        })
    }

    public getProjects(): ProjectData[]
    {
        return this.projecsArray;
    }

    public updateProject(project: ProjectData)
    {
        const index = this.projectIndex(project);
        if(index !== -1) this.appendProject(project, index)
        else this.addProject(project);
    }

    private projectIndex(project: ProjectData): number
    {
        return this.projecsArray.findIndex(proj => proj.id === project.id)
    }

    private appendProject(project: ProjectData, index: number)
    {
        if(project.projectName) this.projecsArray[index].projectName = project.projectName;
        if(project.description) this.projecsArray[index].description = project.description;
        if(project.startDate) this.projecsArray[index].startDate = project.startDate;
        if(project.finishDate) this.projecsArray[index].finishDate = project.finishDate;
        if(project.managerId) this.projecsArray[index].managerId = project.managerId;
        if(typeof project.completed !== 'undefined') this.projecsArray[index].completed = project.completed;
        this.setProject(this.projecsArray[index]);
    }

    private setProject(project: ProjectData)
    {
        this.database.transaction((tx) =>
        {
            const statement = `UPDATE ${DBConstants.tables.project}
            SET 
                ${DBConstants.projectFields.projectName} = '${project.projectName}',
                ${DBConstants.projectFields.description} = '${project.description}',
                ${DBConstants.projectFields.startDate} = '${project.startDate}',
                ${DBConstants.projectFields.finishDate} = ${project.finishDate ? `'${project.finishDate}'` : `NULL`},
                ${DBConstants.projectFields.managerId} = '${project.managerId}',
                ${DBConstants.projectFields.completed} = ${project.completed ? 1: 0}
            WHERE
                ${DBConstants.projectFields.id} = '${project.id}'`

            tx.executeSql(statement, [], undefined, (err) => console.log(err));
        })
    }

    private addProject(project: ProjectData)
    {
        this.projecsArray.push(project);
        this.insertProject(project)
    }

    private insertProject(project: ProjectData)
    {
        this.database.transaction((tx) =>
        {
            const statement = `INSERT INTO ${DBConstants.tables.project} VALUES 
            (
                '${project.id}',
                '${project.projectName}',
                '${project.description}',
                '${project.startDate}',
                ${project.finishDate ? `'${project.finishDate}'` : `NULL`},
                '${project.managerId}',
                ${project.completed ? 1: 0}
            )`

            tx.executeSql(statement, [], undefined, (err) => console.log(err));
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
        this.commitUser();
    }

    private resetUser()
    {
        this.userData =
        {
            email: '',
            uuid: '',
            webtoken: '',
        };
        this.projecsArray = [];
        this.dropTables();
    }

    private dropTables()
    {
        this.database.transaction((tx) =>
        {
            const statement = `DROP TABLE IF EXISTS ${DBConstants.tables.user}`;
            tx.executeSql(statement, [], (tx, res) =>
            {
                const statement = `DROP TABLE IF EXISTS ${DBConstants.tables.project}`;
                tx.executeSql(statement, [], (tx, res) =>
                {
                    this.initDatabase();
                })
            });
        });
    }

    public getToken(): string
    {
        return this.userData.webtoken;
    }
}