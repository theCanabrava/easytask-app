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
        refreshToken: '/api/Refresh-Token'
    }
}