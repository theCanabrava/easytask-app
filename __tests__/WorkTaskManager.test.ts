import { expect } from 'chai';
import WorkTaskDataSource from '../src/1-WorkTaskManager/interfaces/WorkTaskDataSource';
import WorkTaskCommunicator from '../src/1-WorkTaskManager/interfaces/WorkTaskCommunicator';
import ApiRequest from '../src/0-ApiLibrary/types/ApiRequest';
import WorkTaskManager from '../src/1-WorkTaskManager/WorkTaskManager';
import WorkTaskParameters from '../src/1-WorkTaskManager/types/WorkTaskParameters';
import AddResponsibleParameters from '../src/1-WorkTaskManager/types/AddResponsibleParameters';
import DeleteTaskParameters from '../src/1-WorkTaskManager/types/DeleteTaskParameters';
import CommunicatorDelegate from '../src/1-WorkTaskManager/interfaces/CommunicatorDelagate';

class DummyDS implements WorkTaskDataSource
{
    getToken()
    {
        return 'dummyToken';
    }
}

class DummyComunicator implements WorkTaskCommunicator
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

describe('WorkTask Manager', function()
{
    describe('Requisitions', function()
    {
        const dummyDS = new DummyDS();
        const dummyComunicator = new DummyComunicator();
        const manager = new WorkTaskManager({dataSource: dummyDS, communicator: dummyComunicator, subscribers: []});

        it('Sends create work task request', function()
        {
            manager.createWorkTask(createWorkTask);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Create-WorkTask');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            for(let i in createWorkTask) expect(dummyComunicator.latestRequest.body[i]).to.equal(createWorkTask[i]);
        });

        it('Sends edit project request', function()
        {
            manager.updateWorkTask(updateWorkTask);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Update-WorkTask');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            for(let i in updateWorkTask) expect(dummyComunicator.latestRequest.body[i]).to.equal(updateWorkTask[i]);
        });

        it('Sends add responsible request', function()
        {
            manager.addResponsibleToWorkTask(addResponsible);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Add-Responsible');
            expect(dummyComunicator.latestRequest.reqType).to.equal('post');
            for(let i in addResponsible) expect(dummyComunicator.latestRequest.body[i]).to.equal(addResponsible[i]);
        });

        it('Sends get users in project request', function()
        {
            manager.getWorkTasksOfProject(projectId);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/GetWorkTasksOfProject?projectId=3fa85f64-5717-4562-b3fc-2c963f66afa7');
            expect(dummyComunicator.latestRequest.reqType).to.equal('get');
        });

        it('Sends delete work task request', function()
        {
            manager.deleteWorkTask(deleteWorkTask);
            expect(dummyComunicator.latestRequest.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Delete-WorkTask');
            expect(dummyComunicator.latestRequest.reqType).to.equal('delete');
            for(let i in addResponsible) expect(dummyComunicator.latestRequest.body[i]).to.equal(deleteWorkTask[i]);
        });

        const createWorkTask: WorkTaskParameters =
        {
            workTaskName: "string",
            projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            description: "string",
            startDate: "2020-02-15T20:20:18.314Z",
            expectedConclusionDate: "2020-02-15T20:20:18.314Z",
            where: "string",
            why: "string",
            how: "string",
            howMuch: 0,
            observation: "string"
        }

        const updateWorkTask: WorkTaskParameters =
        {
            workTaskName: "string",
            projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            description: "string",
            startDate: "2020-02-15T20:20:18.314Z",
            expectedConclusionDate: "2020-02-15T20:20:18.314Z",
            where: "string",
            why: "string",
            how: "string",
            howMuch: 0,
            observation: "string"
        }
        
        const addResponsible: AddResponsibleParameters =
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
            responsibleUserId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        }

        const projectId = '3fa85f64-5717-4562-b3fc-2c963f66afa7';

        const deleteWorkTask: DeleteTaskParameters =
        {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
        };
    });
})