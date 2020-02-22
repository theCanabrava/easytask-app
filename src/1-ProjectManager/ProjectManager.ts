import CommunicatorDelegate from "./interfaces/CommunicatorDelagate";
import ProjectCommunicator from "./interfaces/ProjectCommunicator";
import ProjectDataSource from "./interfaces/ProjectDataSource";
import ProjectSubscriber from "./interfaces/ProjectSubscriber";
import ProjectManagerComponents from "./types/ProjectManagerComponents";
import ApiResponse from "../0-ApiLibrary/types/ApiResponse";
import EditProjectParameters from "./types/EditProjectParameters";
import ManageUserParameters from "./types/ManageUserParameters";
import ProjectForm from "../0-ApiLibrary/types/ProjectForm";
import ApiConstants from "../0-ApiLibrary/constants/ApiConstants";
import ProjectLib from "../0-ApiLibrary/interfaces/ProjectLib";
import ApiRequest from "../0-ApiLibrary/types/ApiRequest";
import CreateProjectParameters from "./types/CreateProjectParameters";
import DeleteProjectParameters from "./types/DeleteProjectParameters";

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

    public async createProject(project: CreateProjectParameters)
    {
        this.updateToken();
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

    public async editProject(project: EditProjectParameters)
    {
        this.updateToken();
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

    public async deleteProject(project: DeleteProjectParameters)
    {
        this.updateToken();
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
        this.updateToken();
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
        this.updateToken();
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
        this.updateToken();
        const getProjectsListForm: ProjectForm =
        {
            id: ApiConstants.project.getProjectsList,
            parameters: 
            {
                userId: userId,
                token: this.token
            }
        }
        console
        const request:ApiRequest = ProjectLib.projectRequest(getProjectsListForm);
        await this.communicator.send(request);
    }

    public async getUsersInProject(projectId: string)
    {
        this.updateToken();
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

    private updateToken()
    {
        if(this.token !== this.dataSource.getToken())
        {
            this.token = this.dataSource.getToken();
        }
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
        for(let i in this.subscribers)
        {
            this.subscribers[i].notify(response);
        }
    }
}