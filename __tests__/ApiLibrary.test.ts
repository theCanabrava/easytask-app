import { expect } from 'chai';
import AuthForm from '../src/0-ApiLibrary/types/AuthForm';
import ApiLibrary from '../src/0-ApiLibrary/ApiLibrary';
import ProjectForm from '../src/0-ApiLibrary/types/ProjectForm';


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
            expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Get-Projects-List?ProjectId=3fa85f64-5717-4562-b3fc-2c963f66afa6');
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
    })
})