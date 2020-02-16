import CommunicatorDelegate from "./interfaces/CommunicatorDelagate";
import WorkTaskCommunicator from "./interfaces/WorkTaskCommunicator";
import WorkTaskDataSource from "./interfaces/WorkTaskDataSource";
import WorkTaskSubscriber from "./interfaces/WorkTaskSubscriber";
import WorkTaskManagerComponents from "./types/WorkTaskManagerComponents";
import ApiResponse from "../0-ApiLibrary/types/ApiResponse";
import WorkTaskForm from "../0-ApiLibrary/types/ProjectForm";
import ApiConstants from "../0-ApiLibrary/constants/ApiConstants";
import WorkTaskLib from "../0-ApiLibrary/interfaces/WorkTaskLib";
import ApiRequest from "../0-ApiLibrary/types/ApiRequest";
import UpdateWorkTaskParameters from "./types/UpdateWorkTaskParameters";
import AddResponsibleParameters from "./types/AddResponsibleParameters";
import DeleteTaskParameters from "./types/DeleteTaskParameters";
import CreateWorkTaskParameters from "./types/CreateWorkTaskParameters";

export default class WorkTaskManager implements CommunicatorDelegate
{
    private token: string;
    private communicator: WorkTaskCommunicator;
    private dataSource: WorkTaskDataSource;
    private subscribers: WorkTaskSubscriber[];

    constructor(components: WorkTaskManagerComponents)
    {
        this.setCommunicator(components);
        this.setDataSource(components);
        this.setSubscribers(components);
    }

    private setCommunicator(components: WorkTaskManagerComponents)
    {
        this.communicator = components.communicator;
        this.communicator.setDelegate(this);
    }

    private setDataSource(components: WorkTaskManagerComponents)
    {
        this.dataSource = components.dataSource;
        this.token = this.dataSource.getToken();
    }

    private setSubscribers(components: WorkTaskManagerComponents)
    {
        this.subscribers = [];
        for(let index in components.subscribers)
        {
            this.subscribe(components.subscribers[index])
        } 
    }

    public async createWorkTask(workTask: CreateWorkTaskParameters)
    {
        const createWorkTaskForm: WorkTaskForm =
        {
            id: ApiConstants.workTask.createWorkTask,
            parameters:
            {
                ...workTask,
                token: this.token
            }
        }

        const request: ApiRequest = WorkTaskLib.workTaskRequest(createWorkTaskForm);
        await this.communicator.send(request);
    }

    public async updateWorkTask(workTask: UpdateWorkTaskParameters)
    {
        const updateWorkTaskForm: WorkTaskForm =
        {
            id: ApiConstants.workTask.updateWorkTask,
            parameters:
            {
                ...workTask,
                token: this.token
            }
        }

        const request: ApiRequest = WorkTaskLib.workTaskRequest(updateWorkTaskForm);
        await this.communicator.send(request);
    }

    public async addResponsibleToWorkTask(addResponsible: AddResponsibleParameters)
    {
        const addResponsibleForm: WorkTaskForm =
        {
            id: ApiConstants.workTask.addResoinsible,
            parameters:
            {
                ...addResponsible,
                token: this.token
            }
        }

        const request: ApiRequest = WorkTaskLib.workTaskRequest(addResponsibleForm);
        await this.communicator.send(request);
    }

    public async getWorkTasksOfProject(projectId: string)
    {
        const getWorkTaskForm: WorkTaskForm =
        {
            id: ApiConstants.workTask.getWorkTasksOfProject,
            parameters:
            {
                projectId: projectId,
                token: this.token
            }
        }

        const request: ApiRequest = WorkTaskLib.workTaskRequest(getWorkTaskForm);
        await this.communicator.send(request);
    }

    public async deleteWorkTask(deleteTask: DeleteTaskParameters)
    {
        const deleteWorkTaskForm: WorkTaskForm =
        {
            id: ApiConstants.workTask.deleteWorkTask,
            parameters:
            {
                ...deleteTask,
                token: this.token
            }
        }

        const request: ApiRequest = WorkTaskLib.workTaskRequest(deleteWorkTaskForm);
        await this.communicator.send(request);
    }

    public subscribe(subscriber: WorkTaskSubscriber)
    {
        this.subscribers[this.subscribers.length] = subscriber;
    }

    public unsubscribe(subscriber: WorkTaskSubscriber)
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