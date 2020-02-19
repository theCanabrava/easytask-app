export default class DBConstants
{
    public static dbName = "EASYTASK_DB";
    
    public static tables =
    {
        user: 'USER',
        project: 'PROJECT'
    }

    public static userFields =
    {
        id: 'id',
        email: 'email',
        uuid: 'uuid',
        webtoken: 'webtoken'
    }

    public static userTypes =
    {
        id: 'PRIMARY KEY NOT NULL',
        email: 'VARCHAR (255)',
        uuid: 'VARCHAR (255)',
        webtoken: 'VARCHAR (255)'
    }

    public static projectFields =
    {
        id: 'id',
        projectName: 'projectName',
        description: 'description',
        startDate: 'startDate',
        finishDate: 'finishDate',
        managerId: 'managerId',
        completed: 'completed',
    }

    public static projectTypes =
    {
        id: 'VARCHAR(36) PRIMARY KEY NOT NULL',
        projectName: 'VARCHAR(255)',
        description: 'TEXT',
        startDate: 'VARCHAR(24)',
        finishDate: 'VARCHAR(24)',
        managerId: 'VARCHAR(36)',
        completed: 'BOOL',
    }
}