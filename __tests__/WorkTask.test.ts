import {expect} from 'chai';

import AuthManager from '../src/1-AuthManager/AuthManager';
import ProjectManager from '../src/1-ProjectManager/ProjectManager';
import AxiosCommunicator from '../src/2-AxiosCommunicator/AxiosCommunicator';
import AuthDataSource from '../src/1-AuthManager/interfaces/AuthDataSource';
import AuthSubscriber from '../src/1-AuthManager/interfaces/AuthSubscriber';
import ApiResponse from '../src/0-ApiLibrary/types/ApiResponse';
import ApiConstants from '../src/0-ApiLibrary/constants/ApiConstants';
import AuthManagerComponents from '../src/1-AuthManager/types/AuthManagerComponents';
import LoginParameters from '../src/1-AuthManager/types/LoginParameters';
import CreateProjectParameters from '../src/1-ProjectManager/types/CreateProjectParameters';
import DeleteProjectParameters from '../src/1-ProjectManager/types/DeleteProjectParameters';
import WorkTaskManager from '../src/1-WorkTaskManager/WorkTaskManager';
import UpdateWorkTaskParameters from '../src/1-WorkTaskManager/types/UpdateWorkTaskParameters';
import CreateWorkTaskParameters from '../src/1-WorkTaskManager/types/CreateWorkTaskParameters';
import AddResponsibleParameters from '../src/1-WorkTaskManager/types/AddResponsibleParameters';
import DeleteTaskParameters from '../src/1-WorkTaskManager/types/DeleteTaskParameters';
const jwt_decode = require('jwt-decode');

describe('Project', function()
{
    let projectId: string;
    let workTaskId: string;
    class DataSource implements AuthDataSource
    {
        token = '';
        uuid = '';

        getToken()
        {
            return this.token;
        }

        getUuid()
        {
            return this.uuid;
        }

        setToken(token: string)
        {
            this.token = token;
            this.uuid = jwt_decode(token).sub;
        }
    };
    const dataSource = new DataSource;
    const communicator = new AxiosCommunicator();
    const subscriber: AuthSubscriber =
    {
        notify(response: ApiResponse)
        {
            if(response.path===ApiConstants.paths.login)
            {
                dataSource.setToken(response.data.data);
            }
            else if(response.path == ApiConstants.paths.createProject)
            {
                projectId = response.data.data.id;
            }
            else if(response.path != ApiConstants.paths.deleteProject)
            {
                if(response.path == ApiConstants.paths.createWorkTask)
                {
                    workTaskId = response.data.data.id
                }
                console.log(response);
                expect(response.status).to.equal(200);
            }
        }
    };
    
    let projectManager: ProjectManager

    beforeAll(async function()
    {
        let components: AuthManagerComponents =
        {
            communicator: communicator,
            dataSource: dataSource,
            subscribers: [subscriber]
        };
        const authManager = new AuthManager(components);
        const user: LoginParameters =
        {
            email: 'teste@unitario.com',
            password: 'Teste@123',
        }
        await authManager.login(user);

        projectManager = new ProjectManager(components);
        expect(projectManager).to.not.equal(undefined);
        const createParams: CreateProjectParameters =
        {
            projectName: 'Unit Test Project',
            managerId: dataSource.getUuid(),
            description: 'This is an unit test',
        }
        await projectManager.createProject(createParams);
        await projectManager.addUserToProject({projectId: projectId, userEmail:'testeProjeto@unitario.com'});
    });

    let workTaskManager: WorkTaskManager;

    it('Instantiates worktask manager', function()
    {
        const components: AuthManagerComponents =
        {
            communicator: communicator,
            dataSource: dataSource,
            subscribers: [subscriber]
        };

        workTaskManager = new WorkTaskManager(components);
        expect(workTaskManager).to.not.equal(undefined);
    });

    it('Sends create work task request', async function()
    {
        const workTask: CreateWorkTaskParameters =
        {
            workTaskName: "Unit test work task",
            projectId: projectId,
            description: "Unit Test description",
            expectedConclusionDate: "2020-03-16T21:17:44.089Z",
            where: "Where",
            why: "Why",
            how: "How",
            howMuch: 0,
            observation: "Obs:"
        }
        await workTaskManager.createWorkTask(workTask);
    });

    it('Edits work tasks', async function()
    {
        const updateWorkTask: UpdateWorkTaskParameters =
        {
            workTaskName: "Unit test work task edited",
            projectId: projectId,
            id: workTaskId,
            description: "Unit Test description edited",
            expectedConclusionDate: "2020-04-16T21:17:44.089Z",
            where: "Where edited",
            why: "Why edited",
            how: "How edited",
            howMuch: 1,
            observation: "Obs: This was edited"
        }
        await workTaskManager.updateWorkTask(updateWorkTask);
    });

    it('Adds responsible to work task', async function()
    {
        const addResponsible: AddResponsibleParameters =
        {
            workTaskId: workTaskId,
            projectId: projectId,
            userEmail: 'testeProjeto@unitario.com'
        }
        await workTaskManager.addResponsibleToWorkTask(addResponsible);
    });

    it('Gets work tasks of projects', async function()
    {
        await workTaskManager.getWorkTasksOfProject(projectId);
    })

    it('Deletes work task', async function()
    {
        const deleteTask: DeleteTaskParameters =
        {
            id: workTaskId,
            projectId: projectId
        }
        await workTaskManager.deleteWorkTask(deleteTask);
    })

    afterAll(async function()
    {
        const deleteParams: DeleteProjectParameters =
        {
            managerId: dataSource.getUuid(),
            id: projectId,
        }
        await projectManager.deleteProject(deleteParams);
    });
})