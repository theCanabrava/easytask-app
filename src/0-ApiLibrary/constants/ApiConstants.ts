export default class ApiConstants
{
    public static readonly auth =
    {
        newUser: "New-User",
        login: "Login",
        refreshToken: "Refresh-Token",
    }

    public static readonly project =
    {
        createProject: "Create-Project",
        editProject: "Edit-Project",
        deleteProject: "Delete-Project",
        addUserToProject: "Add-User-To-Project",
        removeUserFromProject: "Remove-User-From-Project",
        getProjectsList: "Get-Projects-List",
        getUsersInProject: "Get-Users-In-Project"
    }

    public static readonly workTask =
    {
        createWorkTask: "Create-WorkTask",
        updateWorkTask: "Update-WorkTask",
        addResponsible: "Add-Responsible",
        getWorkTasksOfProject: "GetWorkTasksOfProject",
        deleteWorkTask: "Delete-WorkTask"
    }

    public static readonly reqType =
    {
        get: 'get',
        post: 'post',
        delete: 'delete'
    }

    public static readonly paths =
    {
        prefix: 'http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080',

        newUser: '/api/New-User',
        login: '/api/Login',
        refreshToken: '/api/Refresh-Token',

        createProject: '/api/Project/Create-Project',
        editProject: '/api/Project/Edit-Project',
        deleteProject: '/api/Project/Delete-Project',
        addUserToProject: '/api/Project/Add-User-To-Project',
        removeUserFromProject: '/api/Project/Remove-User-From-Project',
        getProjectsList:  '/api/Project/Get-Projects-List',
        getUsersInProject: '/api/Project/Get-Users-In-Project',

        createWorkTask: '/api/WorkTask/Create-WorkTask',
        updateWorkTask: '/api/WorkTask/Update-WorkTask',
        addResponsible: '/api/WorkTask/Add-Responsible',
        getWorkTasksOfProject: '/api/WorkTask/GetWorkTasksOfProject',
        deleteWorkTask: '/api/WorkTask/Delete-WorkTask',
    }
}