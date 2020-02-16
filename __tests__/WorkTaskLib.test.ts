import {expect} from 'chai';
import WorkTaskLib from '../src/0-ApiLibrary/interfaces/WorkTaskLib';
import WorkTaskForm from '../src/0-ApiLibrary/types/WorkTaskForm';

describe('WorkTask methods', function()
    {
        it('knows create work tasks', function()
        {
            let req = WorkTaskLib.workTaskRequest(createWorkTaskForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Create-WorkTask');
            expect(req.reqType).to.equal('post');
            expect(req.body.workTaskName).to.equal('name');
            expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.description).to.equal('description');
            expect(req.body.expectedConclusionDate).to.equal('2020-02-15T00:45:10.006Z');
            expect(req.body.where).to.equal('where');
            expect(req.body.why).to.equal('why');
            expect(req.body.how).to.equal('how');
            expect(req.body.howMuch).to.equal(1);
            expect(req.body.observation).to.equal('obs');
        });

        it('knows update work tasks', function()
        {
            let req = WorkTaskLib.workTaskRequest(updateWorkTaskForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Update-WorkTask');
            expect(req.reqType).to.equal('post');
            expect(req.body.workTaskName).to.equal('nameUpd');
            expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.description).to.equal('descriptionUpd');
            expect(req.body.expectedConclusionDate).to.equal('2021-02-15T00:45:10.006Z');
            expect(req.body.where).to.equal('whereUpd');
            expect(req.body.why).to.equal('whyUpd');
            expect(req.body.how).to.equal('howUpd');
            expect(req.body.howMuch).to.equal(2);
            expect(req.body.observation).to.equal('obsUpd');
        });

        it('knows add responsible', function()
        {
            let req = WorkTaskLib.workTaskRequest(addResponsibleForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Add-Responsible');
            expect(req.reqType).to.equal('post');
            expect(req.body.workTaskId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.userEmail).to.equal('testeProjeto@unitario.com');
        });

        it('knows get worktask of project', function()
        {
            let req = WorkTaskLib.workTaskRequest(getWorkTasksOfProjectForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/GetWorkTasksOfProject?projectId=3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.reqType).to.equal('get');
        });

        it('kowns delete workTask', function()
        {
            let req = WorkTaskLib.workTaskRequest(deleteWorkTaskForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Delete-WorkTask');
            expect(req.reqType).to.equal('delete');
            expect(req.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        });

        const createWorkTaskForm: WorkTaskForm =
        {
            id: 'Create-WorkTask',
            parameters:
            {
                workTaskName: "name",
                projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                description: "description",
                expectedConclusionDate: "2020-02-15T00:45:10.006Z",
                where: "where",
                why: "why",
                how: "how",
                howMuch: 1,
                observation: "obs"
            }
        }

        const updateWorkTaskForm: WorkTaskForm =
        {
            id: 'Update-WorkTask',
            parameters:
            {
                workTaskName: "nameUpd",
                projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                description: "descriptionUpd",
                expectedConclusionDate: "2021-02-15T00:45:10.006Z",
                where: "whereUpd",
                why: "whyUpd",
                how: "howUpd",
                howMuch: 2,
                observation: "obsUpd"
            }
        }

        const addResponsibleForm: WorkTaskForm =
        {
            id: 'Add-Responsible',
            parameters:
            {
                workTaskId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                userEmail: "testeProjeto@unitario.com"
            }
        }

        const getWorkTasksOfProjectForm: WorkTaskForm =
        {
            id: 'GetWorkTasksOfProject',
            parameters:
            {
                projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
            }
        }

        const deleteWorkTaskForm: WorkTaskForm =
        {
            id: 'Delete-WorkTask',
            parameters:
            {
                id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                projectId: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
            }
        }
    });