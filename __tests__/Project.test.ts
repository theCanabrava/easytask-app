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
import EditProjectParameters from '../src/1-ProjectManager/types/EditProjectParameters';
import ManageUserParameters from '../src/1-ProjectManager/types/ManageUserParameters';
import CreateProjectParameters from '../src/1-ProjectManager/types/CreateProjectParameters';
import DeleteProjectParameters from '../src/1-ProjectManager/types/DeleteProjectParameters';
const jwt_decode = require('jwt-decode');

describe('Project', function()
{
    let projectId: string;
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
            if(response.path.endsWith(ApiConstants.paths.login))
            {
                dataSource.setToken(response.data.data);
            }
            else
            {
                if(response.path.endsWith(ApiConstants.paths.createProject))
                {
                    projectId = response.data.data.id;
                }
                console.log(response.data.data);
                expect(response.status).to.equal(200);
            }
        }
    };
    
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
    });

    let projectManager: ProjectManager;

    it('Instantiates project manager', function()
    {
        const components: AuthManagerComponents =
        {
            communicator: communicator,
            dataSource: dataSource,
            subscribers: [subscriber],
        }

        projectManager = new ProjectManager(components);
        expect(projectManager).to.not.equal(undefined);
    });

    it('Creates projects', async function()
    {
        const createParams: CreateProjectParameters =
        {
            projectName: 'Unit Test Project',
            managerId: dataSource.getUuid(),
            description: 'This is an unit test',
        }
        await projectManager.createProject(createParams);
    });

    it('Edits projects', async function()
    {
        const editParams: EditProjectParameters =
        {
            projectName: 'Unit Test Project Edited',
            managerId: dataSource.getUuid(),
            id: projectId,
            description: 'This is an unit test edited',
        };
        await projectManager.editProject(editParams);
    });

    it('Adds users from project', async function()
    {
        const addParams: ManageUserParameters =
        {
            projectId: projectId,
            userEmail: 'testeProjeto@unitario.com',
        }
        await projectManager.addUserToProject(addParams);
    });

    it('Removes users from project', async function()
    {
        const removeParams: ManageUserParameters =
        {
            projectId: projectId,
            userEmail: 'testeProjeto@unitario.com',
        }
        await projectManager.removeUserFromProject(removeParams);
    });

    it('Gets user project list', async function()
    {
        await projectManager.getProjectsList(dataSource.getUuid());
    });

    it('Gets projects users list', async function()
    {
        await projectManager.getUsersInProject(projectId);
    });

    it('Deletes projects', async function()
    {
        const deleteParams: DeleteProjectParameters =
        {
            managerId: dataSource.getUuid(),
            id: projectId,
        }
        await projectManager.deleteProject(deleteParams);
    });
})