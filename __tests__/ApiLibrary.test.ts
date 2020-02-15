import { expect } from 'chai';
import ApiLibrary from '../src/0-ApiLibrary/ApiLibrary';
import AuthForm from '../src/0-ApiLibrary/types/AuthForm';
import ProjectForm from '../src/0-ApiLibrary/types/ProjectForm';
import WorkTaskForm from '../src/0-ApiLibrary/types/WorkTaskForm';

describe('API Library', function()
{
    describe('Auth methods', function()
    {

        it('knows new user', function()
        {
            let req = ApiLibrary.authRequest(NewUserForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/New-User');
            expect(req.reqType).to.equal('post');
            expect(req.body.email).to.equal('user@example.com');
            expect(req.body.password).to.equal('123456');
            expect(req.body.confirmPassword).to.equal('123456');
        });

        it('knows login', function()
        {
            let req = ApiLibrary.authRequest(LoginForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Login');
            expect(req.reqType).to.equal('post');
            expect(req.body.email).to.equal('user@example.com');
            expect(req.body.password).to.equal('123456');
        });

        it('knows refresh token', function()
        {
            let req = ApiLibrary.authRequest(RefreshTokenForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Refresh-Token');
            expect(req.reqType).to.equal('post');
            expect(req.body.email).to.equal('user@example.com');
        });

        const NewUserForm: AuthForm =
        {
            id: 'New-User',
            parameters:
            {
                email: 'user@example.com',
                password: '123456',
                confirmPassword: '123456'
            }
        }

        const LoginForm: AuthForm =
        {
            id: 'Login',
            parameters:
            {
                email: 'user@example.com',
                password: '123456',
            }
        }

        const RefreshTokenForm: AuthForm =
        {
            id: 'Refresh-Token',
            parameters:
            {
                email: 'user@example.com',
            }
        }

    });

    describe('Project methods', function()
    {
        it('knows create project', function()
        {
            let req = ApiLibrary.projectRequest(CreateProjectForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Create-Project');
            expect(req.reqType).to.equal('post');
            expect(req.body.projectName).to.equal('New Project');
            expect(req.body.managerId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.description).to.equal('This is a new project');
        });

        it('knows edit project', function()
        {
            let req = ApiLibrary.projectRequest(EditProjectForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Edit-Project');
            expect(req.reqType).to.equal('post');
            expect(req.body.projectName).to.equal('New Project');
            expect(req.body.managerId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.description).to.equal('This is a new project');
        });

        it('knows delete project', function()
        {
            let req = ApiLibrary.projectRequest(DeleteProjectForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Delete-Project');
            expect(req.reqType).to.equal('post');
            expect(req.body.projectName).to.equal('New Project');
            expect(req.body.managerId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.description).to.equal('This is a new project');
        });

        it('knows add user to project', function()
        {
            let req = ApiLibrary.projectRequest(AddUserToProjectForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Add-User-To-Project');
            expect(req.reqType).to.equal('post');
            expect(req.body.userId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        });

        it('knows remove user to project', function()
        {
            let req = ApiLibrary.projectRequest(RemoveUserFromProjectForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Remove-User-From-Project');
            expect(req.reqType).to.equal('post');
            expect(req.body.userId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        });

        it('knows get project list', function()
        {
            let req = ApiLibrary.projectRequest(GetProjectListForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Get-Projects-List?UserId=3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.reqType).to.equal('get');
        });

        it('knows get users in projects', function()
        {
            let req = ApiLibrary.projectRequest(GetUsersInProjectForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Get-Users-In-Project?ProjectId=3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.reqType).to.equal('get');
        });


        const CreateProjectForm: ProjectForm =
        {
            id: 'Create-Project',
            parameters:
            {
                projectName: "New Project",
                managerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                description: "This is a new project"
            }
        }

        const EditProjectForm: ProjectForm =
        {
            id: 'Edit-Project',
            parameters:
            {
                projectName: "New Project",
                managerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                description: "This is a new project"
            }
        }

        const DeleteProjectForm: ProjectForm =
        {
            id: 'Delete-Project',
            parameters:
            {
                projectName: "New Project",
                managerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                description: "This is a new project"
            }
        }

        const AddUserToProjectForm: ProjectForm =
        {
            id: 'Add-User-To-Project',
            parameters:
            {
                userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }

        const RemoveUserFromProjectForm: ProjectForm =
        {
            id: 'Remove-User-From-Project',
            parameters:
            {
                userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }

        const GetProjectListForm: ProjectForm =
        {
            id: 'Get-Projects-List',
            parameters:
            {
                userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }

        const GetUsersInProjectForm: ProjectForm =
        {
            id: 'Get-Users-In-Project',
            parameters:
            {
                projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
            }
        }
    });

    describe('WorkTask methods', function()
    {
        it('knows create work tasks', function()
        {
            let req = ApiLibrary.workTaskRequest(createWorkTaskForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Create-WorkTask');
            expect(req.reqType).to.equal('post');
            expect(req.body.workTaskName).to.equal('name');
            expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.description).to.equal('description');
            expect(req.body.startDate).to.equal('2020-02-15T00:45:09.996Z');
            expect(req.body.expectedConclusionDate).to.equal('2020-02-15T00:45:10.006Z');
            expect(req.body.where).to.equal('where');
            expect(req.body.why).to.equal('why');
            expect(req.body.how).to.equal('how');
            expect(req.body.howMuch).to.equal(1);
            expect(req.body.observation).to.equal('obs');
        });

        it('knows update work tasks', function()
        {
            let req = ApiLibrary.workTaskRequest(updateWorkTaskForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Update-WorkTask');
            expect(req.reqType).to.equal('post');
            expect(req.body.workTaskName).to.equal('nameUpd');
            expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.description).to.equal('descriptionUpd');
            expect(req.body.startDate).to.equal('2021-02-15T00:45:09.996Z');
            expect(req.body.expectedConclusionDate).to.equal('2021-02-15T00:45:10.006Z');
            expect(req.body.where).to.equal('whereUpd');
            expect(req.body.why).to.equal('whyUpd');
            expect(req.body.how).to.equal('howUpd');
            expect(req.body.howMuch).to.equal(2);
            expect(req.body.observation).to.equal('obsUpd');
        });

        it('knows add responsible', function()
        {
            let req = ApiLibrary.workTaskRequest(addResponsibleForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/Add-Responsible');
            expect(req.reqType).to.equal('post');
            expect(req.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.body.responsibleUserId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        });

        it('knows get worktask of project', function()
        {
            let req = ApiLibrary.workTaskRequest(getWorkTasksOfProjectForm);
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/WorkTask/GetWorkTasksOfProject?projectId=3fa85f64-5717-4562-b3fc-2c963f66afa6');
            expect(req.reqType).to.equal('get');
        });

        it('kowns delete workTask', function()
        {
            let req = ApiLibrary.workTaskRequest(deleteWorkTaskForm);
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
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                description: "description",
                startDate: "2020-02-15T00:45:09.996Z",
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
                startDate: "2021-02-15T00:45:09.996Z",
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
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                responsibleUserId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
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
})