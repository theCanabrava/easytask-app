import { expect } from 'chai';
import ProjectDataSource from '../src/1-ProjectManager/interfaces/ProjectDataSource';
import ProjectCommunicator from '../src/1-ProjectManager/interfaces/ProjectCommunicator';
import ApiRequest from '../src/0-ApiLibrary/types/ApiRequest';
import ProjectManager from '../src/1-ProjectManager/ProjectManager';
import EditProjectParameters from '../src/1-ProjectManager/types/EditProjectParameters';
import DeleteProjectParameters from '../src/1-ProjectManager/types/DeleteProjectParameters';
import ManageUserParameters from '../src/1-ProjectManager/types/ManageUserParameters';
import CommunicatorDelegate from '../src/1-ProjectManager/interfaces/CommunicatorDelagate';
import CreateProjectParameters from '../src/1-ProjectManager/types/CreateProjectParameters';

class DummyDS implements ProjectDataSource
{
    getToken()
    {
        return 'dummyToken';
    }
}

class DummyComunicator implements ProjectCommunicator
{
    public latestRequest: ApiRequest;
    private delegate: CommunicatorDelegate

    public send(request: ApiRequest)
    {
        this.latestRequest = request
    }

    public setDelegate(delegate: CommunicatorDelegate)
    {
        this.delegate = delegate
    }
}

describe('Project Manager', function()
{
    describe('Requisitions', function()
    {
        const dummyDS = new DummyDS();
        const dummyComunicator = new DummyComunicator();
        const manager = new ProjectManager({dataSource: dummyDS, communicator: dummyComunicator, subscribers: []});

        it('Sends create project request', function()
        {
            manager.createProject(createProject);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Create-Project');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            expect(dummyComunicator.latestRequest.body.projectName).to.equal('projectName');
            expect(dummyComunicator.latestRequest.body.managerId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(dummyComunicator.latestRequest.body.description).to.equal('projectDescription')
        });

        it('Sends edit project request', function()
        {
            manager.editProject(editProject);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Edit-Project');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            expect(dummyComunicator.latestRequest.body.projectName).to.equal('projectNameEdited');
            expect(dummyComunicator.latestRequest.body.managerId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(dummyComunicator.latestRequest.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa7');
            expect(dummyComunicator.latestRequest.body.description).to.equal('projectDescriptionEdited');
        });

        it('Sends delete project request', function()
        {
            manager.deleteProject(deleteProject);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Delete-Project');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            expect(dummyComunicator.latestRequest.body.managerId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(dummyComunicator.latestRequest.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa7');
        });

        it('Sends add user to project request', function()
        {
            manager.addUserToProject(addUser);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Add-User-To-Project');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            expect(dummyComunicator.latestRequest.body.userEmail).to.equal('testeProjeto@unitario.com');
            expect(dummyComunicator.latestRequest.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa7');
        });

        it('Sends remove user from project request', function()
        {
            manager.removeUserFromProject(removeUser);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Remove-User-From-Project');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            expect(dummyComunicator.latestRequest.body.userEmail).to.equal('testeProjeto@unitario.com');
            expect(dummyComunicator.latestRequest.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa7');
        });

        it('Sends get projects list request', function()
        {
            manager.getProjectsList(userId);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Get-Projects-List?UserId=3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(dummyComunicator.latestRequest.reqType).to.equal('get');
        });

        it('Sends get users in project request', function()
        {
            manager.getUsersInProject(projectId);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Get-Users-In-Project?ProjectId=3fa85f64-5717-4562-b3fc-2c963f66afa7');
            expect(dummyComunicator.latestRequest.reqType).to.equal('get');
        });

        const createProject: CreateProjectParameters =
        {
            projectName: 'projectName',
            managerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            description: 'projectDescription'
        }

        const editProject: EditProjectParameters =
        {
            projectName: 'projectNameEdited',
            managerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            description: 'projectDescriptionEdited'
        }
        
        const deleteProject: DeleteProjectParameters =
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            managerId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        }

        const addUser: ManageUserParameters =
        {
            userEmail: 'testeProjeto@unitario.com',
            projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        }

        const removeUser: ManageUserParameters =
        {
            userEmail: 'testeProjeto@unitario.com',
            projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        }

        const userId = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

        const projectId = '3fa85f64-5717-4562-b3fc-2c963f66afa7';
    });
})