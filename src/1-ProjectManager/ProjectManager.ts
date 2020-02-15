import CommunicatorDelegate from "./interfaces/CommunicatorDelagate";
import ProjectCommunicator from "./interfaces/ProjectCommunicator";
import ProjectDataSource from "./interfaces/ProjectDataSource";
import ProjectSubscriber from "./interfaces/ProjectSubscriber";
import ProjectManagerComponents from "./types/ProjectManagerComponents";
import ApiResponse from "../0-ApiLibrary/types/ApiResponse";
import ProjectParameters from "./types/ProjectParameters";
import ManageUserParameters from "./types/ManageUserParameters";
import ProjectForm from "../0-ApiLibrary/types/ProjectForm";
import ApiConstants from "../0-ApiLibrary/constants/ApiConstants";
import ProjectLib from "../0-ApiLibrary/interfaces/ProjectLib";
import ApiRequest from "../0-ApiLibrary/types/ApiRequest";

export default class ProjectManager implements CommunicatorDelegate
{
    private token: string;
    private communicator: ProjectCommunicator;
    private dataSource: ProjectDataSource;
    private subscribers: ProjectSubscriber[];

    constructor(components: ProjectManagerComponents)
    {
        this.setCommunicator(components);
        this.setDataSource(components);
        this.setSubscribers(components);
    }

    private setCommunicator(components: ProjectManagerComponents)
    {
        this.communicator = components.communicator;
        this.communicator.setDelegate(this);
    }

    private setDataSource(components: ProjectManagerComponents)
    {
        this.dataSource = components.dataSource;
        this.token = this.dataSource.getToken();
    }

    private setSubscribers(components: ProjectManagerComponents)
    {
        this.subscribers = [];
        for(let index in components.subscribers)
        {
            this.subscribe(components.subscribers[index])
        } 
    }

    public async createProject(project: ProjectParameters)
    {
        const createProjectForm: ProjectForm =
        {
            id: ApiConstants.project.createProject,
            parameters: 
            {
                ...project,
                token: this.token
            }
        }

        const request:ApiRequest = ProjectLib.projectRequest(createProjectForm);
        await this.communicator.send(request);
    }

    public async editProject(project: ProjectParameters)
    {
        const editProjectForm: ProjectForm =
        {
            id: ApiConstants.project.editProject,
            parameters: 
            {
                ...project,
                token: this.token
            }
        }

        const request:ApiRequest = ProjectLib.projectRequest(editProjectForm);
        await this.communicator.send(request);
    }

    public async deleteProject(project: ProjectParameters)
    {
        const deleteProjectForm: ProjectForm =
        {
            id: ApiConstants.project.deleteProject,
            parameters: 
            {
                ...project,
                token: this.token
            }
        }

        const request:ApiRequest = ProjectLib.projectRequest(deleteProjectForm);
        await this.communicator.send(request);
    }

    public async addUserToProject(addUser: ManageUserParameters)
    {
        const addUserToProjectForm: ProjectForm =
        {
            id: ApiConstants.project.addUserToProject,
            parameters: 
            {
                ...addUser,
                token: this.token
            }
        }

        const request:ApiRequest = ProjectLib.projectRequest(addUserToProjectForm);
        await this.communicator.send(request);
    }

    public async removeUserFromProject(removeUser: ManageUserParameters)
    {
        const removeUserInProjectForm: ProjectForm =
        {
            id: ApiConstants.project.removeUserFromProject,
            parameters: 
            {
                ...removeUser,
                token: this.token
            }
        }

        const request:ApiRequest = ProjectLib.projectRequest(removeUserInProjectForm);
        await this.communicator.send(request);
    }

    public async getProjectsList(userId: string)
    {
        const getProjectsListForm: ProjectForm =
        {
            id: ApiConstants.project.getProjectsList,
            parameters: 
            {
                userId: userId,
                token: this.token
            }
        }

        const request:ApiRequest = ProjectLib.projectRequest(getProjectsListForm);
        await this.communicator.send(request);
    }

    public async getUsersInProject(projectId: string)
    {
        const getUsersInProjectFrom: ProjectForm =
        {
            id: ApiConstants.project.getUsersInProject,
            parameters: 
            {
                projectId: projectId,
                token: this.token
            }
        }

        const request:ApiRequest = ProjectLib.projectRequest(getUsersInProjectFrom);
        await this.communicator.send(request);
    }

    public subscribe(subscriber: ProjectSubscriber)
    {
        this.subscribers[this.subscribers.length] = subscriber;
    }

    public unsubscribe(subscriber: ProjectSubscriber)
    {
        this.subscribers = this.subscribers.filter(element => element !== subscriber);
    }

    public read(response: ApiResponse)
    {
        if(response.status == 200)
        {
            this.token = response.data.data;
        }
        for(let i in this.subscribers)
        {
            this.subscribers[i].notify(response);
        }
    }
}