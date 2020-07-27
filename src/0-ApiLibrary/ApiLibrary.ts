import AuthForm from "./types/AuthForm";
import ApiRequest from "./types/ApiRequest";
import ProjectForm from "./types/ProjectForm";
import WorkTaskForm from "./types/WorkTaskForm";
import ApiConstants from "./constants/ApiConstants";
import PushNotificationForm from "./types/PushNotificationForm";

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

    public static workTaskRequest(form: WorkTaskForm): ApiRequest
    {
        return ApiLibrary.workTaskLibrary[form.id](form.parameters);
    }

    public static pushNotificationRequest(form: PushNotificationForm) : ApiRequest
    {
        return ApiLibrary.pushNotificationLibrary[form.id](form.parameters);
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
            url: ApiConstants.paths.prefix + ApiConstants.paths.refreshToken + `?email=${encodeURI(parameters.email)}`,
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
        [ApiConstants.project.addManagerToProject]: ApiLibrary.addManagerToProject,
        [ApiConstants.project.getProjectsList]: ApiLibrary.getProjectsList,
        [ApiConstants.project.getUsersInProject]: ApiLibrary.getUsersInProject,
        [ApiConstants.project.getUserManagedProjects]: ApiLibrary.getUserManagedProjects
    }

    private static createProject(parameters): ApiRequest
    {
        const createProjectRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.createProject,
            reqType: ApiConstants.reqType.post,
            body:
            {
                projectName: parameters.projectName,
                managerId: parameters.managerId,
                description: parameters.description
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return createProjectRequest;
    }

    private static editProject(parameters): ApiRequest
    {
        const editProjectRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.editProject,
            reqType: ApiConstants.reqType.post,
            body:
            {
                projectName: parameters.projectName,
                managerId: parameters.managerId,
                id: parameters.id,
                description: parameters.description
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return editProjectRequest;
    }

    private static deleteProject(parameters): ApiRequest
    {
        const deleteProjectRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.deleteProject,
            reqType: ApiConstants.reqType.post,
            body:
            {
                managerId: parameters.managerId,
                id: parameters.id,
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return deleteProjectRequest;
    }

    private static addUserToProject(parameters): ApiRequest
    {
        const addUserToProjectRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.addUserToProject,
            reqType: ApiConstants.reqType.post,
            body:
            {
                projectId: parameters.projectId,
                userEmail: parameters.userEmail
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return addUserToProjectRequest;
    }

    private static removeUserFromProject(parameters): ApiRequest
    {
        const removeUserFromProjectRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.removeUserFromProject,
            reqType: ApiConstants.reqType.post,
            body:
            {
                projectId: parameters.projectId,
                userEmail: parameters.userEmail
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return removeUserFromProjectRequest;
    }

    private static addManagerToProject(parameters): ApiRequest
    {
        const addManagerToProjectRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.addManagerToProject,
            reqType: ApiConstants.reqType.post,
            body:
            {
                projectId: parameters.projectId,
                userEmail: parameters.userEmail
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return addManagerToProjectRequest;
    }

    private static getProjectsList(parameters): ApiRequest
    {
        const getProjectsListRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.getProjectsList + `?UserId=${encodeURI(parameters.userId)}`,
            reqType: ApiConstants.reqType.get,
            body:{},
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }
        return getProjectsListRequest;
    }

    private static getUsersInProject(parameters): ApiRequest
    {
        const getUsersInProjectRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.getUsersInProject + `?ProjectId=${encodeURI(parameters.projectId)}`,
            reqType: ApiConstants.reqType.get,
            body:{},
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return getUsersInProjectRequest;
    }

    private static getUserManagedProjects(parameters): ApiRequest
    {
        const getUserManagedProjectsRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.getUserManagedProjects + `?UserId=${encodeURI(parameters.userId)}`,
            reqType: ApiConstants.reqType.get,
            body:{},
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return getUserManagedProjectsRequest;
    }

    private static workTaskLibrary =
    {
        [ApiConstants.workTask.createWorkTask]: ApiLibrary.createWorkTask,
        [ApiConstants.workTask.updateWorkTask]: ApiLibrary.updateWorkTask,
        [ApiConstants.workTask.finishWorkTask]: ApiLibrary.finishWorkTask,
        [ApiConstants.workTask.addResponsible]: ApiLibrary.addResponsible,
        [ApiConstants.workTask.getWorkTasksOfProject]: ApiLibrary.getWorkTasksOfProject,
        [ApiConstants.workTask.deleteWorkTask]: ApiLibrary.deleteWorkTask,
        [ApiConstants.workTask.filterWorkTask]: ApiLibrary.filterWorkTask
    }

    private static createWorkTask(parameters): ApiRequest
    {
        const createWorkTaskRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.createWorkTask,
            reqType: ApiConstants.reqType.post,
            body:
            {
                workTaskName: parameters.workTaskName,
                projectId: parameters.projectId,
                description: parameters.description,
                expectedConclusionDate: parameters.expectedConclusionDate,
                where: parameters.where,
                why: parameters.why,
                how: parameters.how,
                howMuch: parameters.howMuch,
                observation: parameters.observation
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return createWorkTaskRequest;
    }

    private static updateWorkTask(parameters): ApiRequest
    {
        const updateWorkTaskRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.updateWorkTask,
            reqType: ApiConstants.reqType.post,
            body:
            {
                workTaskName: parameters.workTaskName,
                projectId: parameters.projectId,
                id: parameters.id,
                description: parameters.description,
                expectedConclusionDate: parameters.expectedConclusionDate,
                where: parameters.where,
                why: parameters.why,
                how: parameters.how,
                howMuch: parameters.howMuch,
                observation: parameters.observation
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return updateWorkTaskRequest;
    }

    private static finishWorkTask(parameters): ApiRequest
    {
        const finishWorkTaskRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.finishWorkTask,
            reqType: ApiConstants.reqType.post,
            body:
            {
                projectId: parameters.projectId,
                id: parameters.id,
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return finishWorkTaskRequest;
    }

    private static addResponsible(parameters): ApiRequest
    {
        const addResponsibleRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.addResponsible,
            reqType: ApiConstants.reqType.post,
            body:
            {
                workTaskId: parameters.workTaskId,
                projectId: parameters.projectId,
                userEmail: parameters.userEmail,
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return addResponsibleRequest;
    }

    private static getWorkTasksOfProject(parameters): ApiRequest
    {
        const getWorkTasksOfProjectRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.getWorkTasksOfProject + `?projectId=${parameters.projectId}`,
            reqType: ApiConstants.reqType.get,
            body:{},
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return getWorkTasksOfProjectRequest;
    }

    private static deleteWorkTask(parameters): ApiRequest
    {
        const deleteWorkTaskRequest: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.deleteWorkTask,
            reqType: ApiConstants.reqType.delete,
            body:
            {
                id: parameters.id,
                projectId: parameters.projectId,
            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return deleteWorkTaskRequest;
    }

    private static filterWorkTask(parameters): ApiRequest
    {
        const filterWorkTask: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.filterWorkTask +  `?projectId=${parameters.projectId}&status=${parameters.status}`,
            reqType: ApiConstants.reqType.get,
            body: {},
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return filterWorkTask;
    }

    private static pushNotificationLibrary =
    {
        [ApiConstants.pushNotification.sendPushNotificationToken]: ApiLibrary.sendPushNotificationToken
    }

    private static sendPushNotificationToken(parameters) : ApiRequest
    {
        const sendPushNotificationToken: ApiRequest =
        {
            url: ApiConstants.paths.prefix + ApiConstants.paths.sendPushNotificationToken,
            reqType: ApiConstants.reqType.post,
            body: 
            {
                userEmail: parameters.userEmail,
                pushNotificationToken : parameters.pushNotificationToken

            },
            headers: 
            {
                Authorization: `Bearer ${parameters.token}`
            }
        }

        return sendPushNotificationToken;
    }
}