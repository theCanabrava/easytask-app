export default class DBConstants
{
    public static dbName = "EASYTASK_DB";
    
    public static tables =
    {
        user: 'USER',
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
}