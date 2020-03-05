import UserData from "./types/UserData";
import ApiResponse from "../0-ApiLibrary/types/ApiResponse";
import UserStorage from "./interfaces/UserStorage";
import * as SQLite from 'expo-sqlite';
import DBConstants from "./constants/DBConstants";
import { WebSQLDatabase } from "expo-sqlite";
import ProjectData from "./types/ProjectData";
import ProjectStorage from "./interfaces/ProjectStorage";
import ApiConstants from "../0-ApiLibrary/constants/ApiConstants";
import WorkTaskData from "./types/WorkTaskData";
import WorkTaskStorage from "./interfaces/WorkTaskStorage";
const jwt_decode = require('jwt-decode');

export default class Database implements UserStorage, ProjectStorage, WorkTaskStorage
{
    private database: WebSQLDatabase;
    private userData: UserData;
    private projectsArray: ProjectData[];
    private workTasksArray: WorkTaskData[];
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
        this.projectsArray = [];
        this.workTasksArray = [];
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

        tx.executeSql(statement, [], this.selectProjects.bind(this));
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
            this.projectsArray.push(project);
        }
        this.createWorkTaskTable(tx, res);
    }

    private createWorkTaskTable(tx, res)
    {
        const statement = `CREATE TABLE IF NOT EXISTS ${DBConstants.tables.workTask}
        (
            ${DBConstants.workTaskFields.id} ${DBConstants.workTaskTypes.id},
            ${DBConstants.workTaskFields.workTaskName} ${DBConstants.workTaskTypes.workTaskName},
            ${DBConstants.workTaskFields.description} ${DBConstants.workTaskTypes.description},
            ${DBConstants.workTaskFields.projectId} ${DBConstants.workTaskTypes.projectId},
            ${DBConstants.workTaskFields.responsibleUserId} ${DBConstants.workTaskTypes.responsibleUserId},
            ${DBConstants.workTaskFields.startDate} ${DBConstants.workTaskTypes.startDate},
            ${DBConstants.workTaskFields.expectedConclusionDate} ${DBConstants.workTaskTypes.expectedConclusionDate},
            ${DBConstants.workTaskFields.finishDate} ${DBConstants.workTaskTypes.finishDate},
            '${DBConstants.workTaskFields.where}' ${DBConstants.workTaskTypes.where},
            ${DBConstants.workTaskFields.why} ${DBConstants.workTaskTypes.why},
            ${DBConstants.workTaskFields.how} ${DBConstants.workTaskTypes.how},
            ${DBConstants.workTaskFields.howMuch} ${DBConstants.workTaskTypes.howMuch},
            ${DBConstants.workTaskFields.observation} ${DBConstants.workTaskTypes.observation}
        );`;

        tx.executeSql(statement, [], this.selectWorkTasks.bind(this));
    }

    private selectWorkTasks(tx, res)
    {
        const statement = `SELECT * FROM ${DBConstants.tables.workTask}`;
        tx.executeSql(statement, [], this.extractWorkTasks.bind(this));
    }

    private extractWorkTasks(tx, res)
    {
        for(let i=0; i<res.rows.length; i++)
        {
            const workTask: WorkTaskData =
            {
                id: res.rows.item(i).id,
                workTaskName: res.rows.item(i).workTaskName,
                description: res.rows.item(i).description,
                projectId: res.rows.item(i).projectId,
                responsibleUserId: res.rows.item(i).responsibleUserId,
                startDate: res.rows.item(i).startDate,
                expectedConclusionDate: res.rows.item(i).expectedConclusionDate,
                finishDate: res.rows.item(i).finishDate,
                where: res.rows.item(i).where,
                why: res.rows.item(i).why,
                how: res.rows.item(i).how,
                howMuch: res.rows.item(i).howMuch,
                observation: res.rows.item(i).observation,
            }
            this.workTasksArray.push(workTask);
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
            ${DBConstants.userFields.email} = ?,
            ${DBConstants.userFields.uuid} = ?,
            ${DBConstants.userFields.webtoken} = ?
            WHERE
            ${DBConstants.userFields.id} = 0`;
            const args = [this.userData.email, this.userData.uuid, this.userData.webtoken];
            tx.executeSql(statement, args);
        })
    }



    public getProjects(): ProjectData[]
    {
        return this.projectsArray;
    }




    public updateProject(project: ProjectData)
    {
        const index = this.projectIndex(project);
        if(index !== -1) this.rewriteProject(project, index)
        else this.writeProject(project);
    }

    private projectIndex(project: ProjectData): number
    {
        return this.projectsArray.findIndex(proj => proj.id === project.id)
    }

    private rewriteProject(project: ProjectData, index: number)
    {
        if(project.projectName) this.projectsArray[index].projectName = project.projectName;
        if(project.description) this.projectsArray[index].description = project.description;
        if(project.startDate) this.projectsArray[index].startDate = project.startDate;
        if(project.finishDate) this.projectsArray[index].finishDate = project.finishDate;
        if(project.managerId) this.projectsArray[index].managerId = project.managerId;
        if(typeof project.completed !== 'undefined') this.projectsArray[index].completed = project.completed;
        this.setProject(this.projectsArray[index]);
    }

    private setProject(project: ProjectData)
    {
        this.database.transaction((tx) =>
        {
            const statement = `UPDATE ${DBConstants.tables.project}
            SET 
                ${DBConstants.projectFields.projectName} = ?,
                ${DBConstants.projectFields.description} = ?,
                ${DBConstants.projectFields.startDate} = ?,
                ${DBConstants.projectFields.finishDate} = ?,
                ${DBConstants.projectFields.managerId} = ?,
                ${DBConstants.projectFields.completed} = ?
            WHERE
                ${DBConstants.projectFields.id} = ?`

            const args =
            [
                project.projectName,
                project.description,
                project.startDate,
                (project.finishDate ? `${project.finishDate}` : `NULL`),
                project.managerId,
                (project.completed ? 1:0),
                project.id
            ];

            tx.executeSql(statement, args);
        })
    }

    private writeProject(project: ProjectData)
    {
        this.projectsArray.push(project);
        this.insertProject(project)
    }

    private insertProject(project: ProjectData)
    {
        this.database.transaction((tx) =>
        {
            const statement = `INSERT INTO ${DBConstants.tables.project} VALUES 
            (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )`;

            const args =
            [
                project.id,
                project.projectName,
                project.description,
                project.startDate,
                (project.finishDate ? `'${project.finishDate}'` : `NULL`),
                project.managerId,
                (project.completed ? 1:0),
            ];

            tx.executeSql(statement, args);
        })
    }



    public deleteProject(projectId: string)
    {
        let projectIndex = this.projectIndex({id: projectId})
        if(projectIndex !== -1)
        {
            this.projectsArray.splice(projectIndex, 1);
            this.database.transaction((tx) =>
            {
                const statement = `DELETE FROM ${DBConstants.tables.project}
                    WHERE ${DBConstants.projectFields.id} = '?'`;
                const args = [projectId];
                tx.executeSql(statement, args);
            });
        }
    }



    public getWorkTasks(): WorkTaskData[]
    {
        return this.workTasksArray;
    }



    public updateWorkTask(workTask: WorkTaskData)
    {
        const index = this.workTaskIndex(workTask);
        if(index !== -1) this.rewriteWorkTask(workTask, index)
        else this.writeWorkTask(workTask);
    }

    private workTaskIndex(workTask: WorkTaskData): number
    {
        return this.workTasksArray.findIndex(work => work.id === workTask.id)
    }

    private rewriteWorkTask(workTask: WorkTaskData, index: number)
    {
        if(workTask.workTaskName) this.workTasksArray[index].workTaskName = workTask.workTaskName;
        if(workTask.description) this.workTasksArray[index].description = workTask.description;
        if(workTask.projectId) this.workTasksArray[index].projectId = workTask.projectId;
        if(workTask.responsibleUserId) this.workTasksArray[index].responsibleUserId = workTask.responsibleUserId;
        if(workTask.startDate) this.workTasksArray[index].startDate = workTask.startDate;
        if(workTask.expectedConclusionDate) this.workTasksArray[index].expectedConclusionDate = workTask.expectedConclusionDate;
        if(workTask.finishDate) this.workTasksArray[index].finishDate = workTask.finishDate;
        if(workTask.where) this.workTasksArray[index].where = workTask.where;
        if(workTask.why) this.workTasksArray[index].why = workTask.why;
        if(workTask.how) this.workTasksArray[index].how = workTask.how;
        if(workTask.howMuch) this.workTasksArray[index].howMuch = workTask.howMuch;
        if(workTask.observation) this.workTasksArray[index].observation = workTask.observation;
        this.setWorkTask(this.workTasksArray[index]);
    }

    private setWorkTask(workTask: WorkTaskData)
    {
        this.database.transaction((tx) =>
        {
            const statement = `UPDATE ${DBConstants.tables.workTask}
            SET 
                ${DBConstants.workTaskFields.workTaskName} = '?',
                ${DBConstants.workTaskFields.description} = '?',
                ${DBConstants.workTaskFields.projectId} = '?',
                ${DBConstants.workTaskFields.responsibleUserId} = '?',
                ${DBConstants.workTaskFields.startDate} = ?,
                ${DBConstants.workTaskFields.expectedConclusionDate} = ?,
                ${DBConstants.workTaskFields.finishDate} = ?,
                '${DBConstants.workTaskFields.where}' = '?',
                ${DBConstants.workTaskFields.why} = '?',
                ${DBConstants.workTaskFields.how} = '?',
                ${DBConstants.workTaskFields.howMuch} = ?,
                ${DBConstants.workTaskFields.observation} = '?'
            WHERE
                ${DBConstants.workTaskFields.id} = '?'`

            const args =
            [
                workTask.workTaskName,
                workTask.description,
                workTask.projectId,
                workTask.responsibleUserId,
                (workTask.startDate ? `${workTask.startDate}` : `NULL`),
                (workTask.expectedConclusionDate ? `${workTask.expectedConclusionDate}` : `NULL`),
                (workTask.finishDate ? `${workTask.finishDate}` : `NULL`),
                workTask.where,
                workTask.why,
                workTask.how,
                workTask.howMuch,
                workTask.observation,
                workTask.id
            ];

            tx.executeSql(statement, args);
        })
    }

    private writeWorkTask(workTask: WorkTaskData)
    {
        this.workTasksArray.push(workTask);
        this.insertWorkTask(workTask)
    }

    private insertWorkTask(workTask: WorkTaskData)
    {
        this.database.transaction((tx) =>
        {
            const statement = `INSERT INTO ${DBConstants.tables.workTask} VALUES 
            (
                '?',
                '?',
                '?',
                '?',
                '?',
                ?,
                ?,
                ?,
                '?',
                '?',
                '?',
                ?,
                '?'
            )`;
            
            const args =
            [
                workTask.id,
                workTask.workTaskName,
                workTask.description,
                workTask.projectId,
                workTask.responsibleUserId,
                (workTask.startDate ? `${workTask.startDate}` : `NULL`),
                (workTask.expectedConclusionDate ? `${workTask.expectedConclusionDate}` : `NULL`),
                (workTask.finishDate ? `${workTask.finishDate}` : `NULL`),
                workTask.where,
                workTask.why,
                workTask.how,
                workTask.howMuch,
                workTask.observation
            ];

            tx.executeSql(statement, args);
        })
    }



    public deleteWorkTask(workTaskId: string)
    {
        let workTaskIndex = this.workTaskIndex({id: workTaskId})
        if(workTaskIndex !== -1)
        {
            this.workTasksArray.splice(workTaskIndex, 1);
            this.database.transaction((tx) =>
            {
                const statement = `DELETE FROM ${DBConstants.tables.workTask}
                    WHERE ${DBConstants.workTaskFields.id} = '?'`;
                const args = [workTaskId];
                tx.executeSql(statement, args);
            });
        }
    }



    public notify(response: ApiResponse)
    {
        if(this.isAuthResponse(response)) this.processAuth(response);
        else if(this.isValidUpdateProject(response)) this.updateProject(response.data.data);
        else if(this.isValidDeleteProject(response)) this.deleteProject(response.data.data.id);
        else if(this.isValidGetProjects(response)) this.reloadProjects(response.data.data);
        else if(this.isValidUpdateWorkTask(response)) this.updateWorkTask(response.data.data);
        else if(this.isValidAddResponsible(response))
        {
            const workTask: WorkTaskData =
            {
                id: response.data.data.workTaskId,
                projectId: response.data.data.projectId,
                responsibleUserId: response.data.data.userEmail
            }
            this.updateWorkTask(workTask);
        }
        else if(this.isValidGetWorkTasks(response)) this.reloadWorkTasks(response.data.data);
        else if(this.isValidDeleteWorkTask(response)) this.deleteWorkTask(response.data.data.id);
    }



    private isAuthResponse(response: ApiResponse): boolean
    {
        if(response.path.includes(ApiConstants.paths.newUser)) return true;
        else if(response.path.includes(ApiConstants.paths.login)) return true;
        else if(response.path.includes(ApiConstants.paths.refreshToken)) return true;
        return false;
    }

    private processAuth(response: ApiResponse)
    {
        if(response.data.success === true) this.renewToken(response);
        else this.reset();
    }

    private renewToken(response: ApiResponse)
    {
        const webtoken = response.data.data;
        const uuid = jwt_decode(webtoken).sub;
        this.softSave({uuid: uuid, webtoken: webtoken});
        this.commitUser();
    }

    private reset()
    {
        this.userData =
        {
            email: '',
            uuid: '',
            webtoken: '',
        };
        this.projectsArray = [];
        this.workTasksArray = [];
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
                    const statement = `DROP TABLE IF EXISTS ${DBConstants.tables.workTask}`;
                    tx.executeSql(statement, [], (tx, res) =>
                    {
                        this.initDatabase();
                    })
                })
            });
        });
    }

    private isValidUpdateProject(response: ApiResponse): boolean
    {
        if(response.data.success)
        {
            if(response.path.endsWith(ApiConstants.paths.createProject)) return true;
            else if(response.path.endsWith(ApiConstants.paths.editProject)) return true;
        }

        return false;
    }

    private isValidDeleteProject(response: ApiResponse): boolean
    {
        if(response.data.success)
        {
            if(response.path.endsWith(ApiConstants.paths.deleteProject)) return true;
        }
        return false;
    }

    private isValidGetProjects(response: ApiResponse): boolean
    {
        if(response.data.success)
        {
            if(response.path.includes(ApiConstants.paths.getProjectsList)) return true;
        }
        return false;
    }

    

    private reloadProjects(projects: ProjectData[])
    {
        this.projectsArray = projects;
        this.database.transaction((tx) =>
        {
            const statement = `DELETE FROM ${DBConstants.tables.project}`;
            tx.executeSql(statement, [], this.loadProjects.bind(this));
        })
    }

    private loadProjects(tx, res)
    {
        let statement =  `INSERT INTO ${DBConstants.tables.project} VALUES `;
        for(let i in this.projectsArray)
        {
            const project = this.projectsArray[i];
            statement += `(
                '${project.id}',
                '${project.projectName}',
                '${project.description}',
                '${project.startDate}',
                ${project.finishDate ? `'${project.finishDate}'` : `NULL`},
                '${project.managerId}',
                ${project.completed ? 1: 0}
            )`
            if(Number(i)+1 != this.projectsArray.length) statement += ', '
        }
        tx.executeSql(statement, []);
    }

    private isValidUpdateWorkTask(response: ApiResponse): boolean
    {
        if(response.data.success)
        {
            if(response.path.endsWith(ApiConstants.paths.createWorkTask)) return true;
            else if(response.path.endsWith(ApiConstants.paths.updateWorkTask)) return true;
        }

        return false;
    }

    private isValidAddResponsible(response: ApiResponse): boolean
    {
        if(response.data.success)
        {
            if(response.path.endsWith(ApiConstants.paths.addResponsible)) return true;
        }

        return false;
    }

    private isValidGetWorkTasks(response: ApiResponse): boolean
    {
        if(response.data.success)
        {
            if(response.path.includes(ApiConstants.paths.getWorkTasksOfProject)) return true;
        }

        return false;
    }

    private isValidDeleteWorkTask(response: ApiResponse): boolean
    {
        if(response.data.success)
        {
            if(response.path.includes(ApiConstants.paths.deleteWorkTask)) return true;
        }

        return false;
    }


    private reloadWorkTasks(workTasks: WorkTaskData[])
    {
        const projectId = workTasks[0].projectId;
        if(projectId)
        {
            this.workTasksArray = this.workTasksArray.filter(work => work.projectId !== projectId);
            for(const i in workTasks) this.workTasksArray.push(workTasks[i]);

            this.database.transaction((tx) =>
            {
                const statement = `DELETE FROM ${DBConstants.tables.project}
                    WHERE ${DBConstants.workTaskFields.projectId} = '${projectId}'`;
                tx.executeSql(statement, [], this.loadWorkTasks.bind(this, projectId));
            })
        }
    }

    private loadWorkTasks(projectId: string, tx, res)
    {
        const updatedWorkTasks = this.workTasksArray.filter(work => work.projectId === projectId);
        let statement =  `INSERT INTO ${DBConstants.tables.workTask} VALUES `;
        for(let i in updatedWorkTasks)
        {
            const workTask = updatedWorkTasks[i];
            statement += `(
                '${workTask.id}',
                '${workTask.workTaskName}',
                '${workTask.description}',
                '${workTask.projectId}',
                '${workTask.responsibleUserId}',
                ${workTask.startDate ? `'${workTask.startDate}'` : `NULL`},
                ${workTask.expectedConclusionDate ? `'${workTask.expectedConclusionDate}'` : `NULL`},
                ${workTask.finishDate ? `'${workTask.finishDate}'` : `NULL`},
                '${workTask.where}',
                '${workTask.why}',
                '${workTask.how}',
                ${workTask.howMuch},
                '${sqlSafe(workTask.observation)}'
            )`
            if(Number(i)+1 != updatedWorkTasks.length) statement += ', '
        }
        tx.executeSql(statement, []);
    }



    public getToken(): string
    {
        return this.userData.webtoken;
    }
}

function sqlSafe(str) 
{
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char; // prepends a backslash to backslash, percent,
                                  // and double/single quotes
            default:
                return char;
        }
    });
}