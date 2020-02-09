import AuthForm from "./types/AuthForm";
import ApiRequest from "./types/ApiRequest";
import ProjectForm from "./types/ProjectForm";
import ApiConstants from "./constants/ApiConstants";

export default class ApiLibrary extends Object
{
    public static authRequest(form: AuthForm): ApiRequest
    {
        return ApiLibrary.authLibrary[form.id](form.parameters);
    }

    public static projectRequest(form: ProjectForm): ApiRequest
    {
        return ApiLibrary.projectLibrary[form.id](form.parameters);
    }

    private static authLibrary =
    {
        [ApiConstants.auth.newUser]: ApiLibrary.newUser,
        [ApiConstants.auth.login]: ApiLibrary.login,
        [ApiConstants.auth.refreshToken]: ApiLibrary.refreshToken
    }

    private static newUser(parameters): ApiRequest
    {
        const newUserRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.newUser,
            reqType: ApiConstants.reqType.post,
            body:
            {
                email: parameters.email,
                password: parameters.password,
                confirmPassword: parameters.confirmPassword
            }
        };

        return newUserRequest;
    }

    private static login(parameters): ApiRequest
    {
        const loginRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.login,
            reqType: ApiConstants.reqType.post,
            body:
            {
                email: parameters.email,
                password: parameters.password,
            }
        };

        return loginRequest;
    }

    private static refreshToken(parameters): ApiRequest
    {
        const refreshTokenRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.refreshToken,
            reqType: ApiConstants.reqType.post,
            body:
            {
                email: parameters.email,
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }

        };

        return refreshTokenRequest;
    }

    private static projectLibrary =
    {
        [ApiConstants.project.createProject]: ApiLibrary.createProject,
        [ApiConstants.project.editProject]: ApiLibrary.editProject,
        [ApiConstants.project.deleteProject]: ApiLibrary.deleteProject,
        [ApiConstants.project.addUserToProject]: ApiLibrary.addUserToProject,
        [ApiConstants.project.removeUserFromProject]: ApiLibrary.removeUserFromProject,
        [ApiConstants.project.getProjectsList]: ApiLibrary.getProjectsList,
        [ApiConstants.project.getUsersInProject]: ApiLibrary.getUsersInProject
    }

    private static createProject(parameters): ApiRequest
    {
        const createProjectRequest =
        {
            url: ApiConstants.paths.prefix + '/api/Project/Create-Project',
            reqType: ApiConstants.reqType.post,
            body:
            {
                projectName: parameters.projectName,
                managerId: parameters.managerId,
                id: parameters.id,
                description: parameters.description
            }
        }

        return createProjectRequest;
    }

    private static editProject(parameters): ApiRequest
    {
        const editProjectRequest =
        {
            url: ApiConstants.paths.prefix + '/api/Project/Edit-Project',
            reqType: ApiConstants.reqType.post,
            body:
            {
                projectName: parameters.projectName,
                managerId: parameters.managerId,
                id: parameters.id,
                description: parameters.description
            }
        }

        return editProjectRequest;
    }

    private static deleteProject(parameters): ApiRequest
    {
        const deleteProjectRequest =
        {
            url: ApiConstants.paths.prefix + '/api/Project/Delete-Project',
            reqType: ApiConstants.reqType.post,
            body:
            {
                projectName: parameters.projectName,
                managerId: parameters.managerId,
                id: parameters.id,
                description: parameters.description
            }
        }

        return deleteProjectRequest;
    }

    private static addUserToProject(parameters): ApiRequest
    {
        const addUserToProjectRequest =
        {
            url: ApiConstants.paths.prefix + '/api/Project/Add-User-To-Project',
            reqType: ApiConstants.reqType.post,
            body:
            {
                userId: parameters.userId,
                projectId: parameters.projectId
            }
        }

        return addUserToProjectRequest;
    }

    private static removeUserFromProject(parameters): ApiRequest
    {
        const removeUserFromProjectRequest =
        {
            url: ApiConstants.paths.prefix + '/api/Project/Remove-User-From-Project',
            reqType: ApiConstants.reqType.post,
            body:
            {
                userId: parameters.userId,
                projectId: parameters.projectId
            }
        }

        return removeUserFromProjectRequest;
    }

    private static getProjectsList(parameters): ApiRequest
    {
        const getProjectsListRequest =
        {
            url: ApiConstants.paths.prefix + `/api/Project/Get-Projects-List?UserId=${encodeURI(parameters.userId)}`,
            reqType: ApiConstants.reqType.get,
            body:{}
        }

        return getProjectsListRequest;
    }

    private static getUsersInProject(parameters): ApiRequest
    {
        const getUsersInProjectRequest =
        {
            url: ApiConstants.paths.prefix +  `/api/Project/Get-Projects-List?ProjectId=${encodeURI(parameters.projectId)}`,
            reqType: ApiConstants.reqType.get,
            body:{}
        }

        return getUsersInProjectRequest;
    }
}