export default class DBConstants
{
    public static dbName = "EASYTASK_DB";
    
    public static tables =
    {
        user: 'USER',
        project: 'PROJECT',
        workTask: 'WORKTASK'
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

    public static workTaskFields =
    {
        id: 'id',
        workTaskName: 'workTaskName',
        description: 'description',
        projectId: 'projectId',
        responsibleUserId: 'responsibleUserId',
        startDate: 'startDate',
        expectedConclusionDate: 'expectedConclusionDate',
        finishDate: 'finishDate',
        where: 'where',
        why: 'why',
        how: 'how',
        howMuch: 'howMuch',
        observation: 'observation'
    }

    public static workTaskTypes =
    {
        id: 'VARCHAR(36) PRIMARY KEY NOT NULL',
        workTaskName: 'VARCHAR(255)',
        description: 'TEXT',
        projectId: 'VARCHAR(36)',
        responsibleUserId: 'VARCHAR(36)',
        startDate: 'VARCHAR(24)',
        expectedConclusionDate: 'VARCHAR(24)',
        finishDate: 'VARCHAR(24)',
        where: 'TEXT',
        why: 'TEXT',
        how: 'TEXT',
        howMuch: 'INT',
        observation: 'TEXT'
    }
}