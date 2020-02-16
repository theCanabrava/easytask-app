import {expect} from 'chai';
import ProjectLib from '../src/0-ApiLibrary/interfaces/ProjectLib';
import ProjectForm from '../src/0-ApiLibrary/types/ProjectForm';


describe('Project methods', function()
{
    it('knows create project', function()
    {
        let req = ProjectLib.projectRequest(CreateProjectForm);
        expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Create-Project');
        expect(req.reqType).to.equal('post');
        expect(req.body.projectName).to.equal('New Project');
        expect(req.body.managerId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        expect(req.body.description).to.equal('This is a new project');
    });

    it('knows edit project', function()
    {
        let req = ProjectLib.projectRequest(EditProjectForm);
        expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Edit-Project');
        expect(req.reqType).to.equal('post');
        expect(req.body.projectName).to.equal('New Project');
        expect(req.body.managerId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        expect(req.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        expect(req.body.description).to.equal('This is a new project');
    });

    it('knows delete project', function()
    {
        let req = ProjectLib.projectRequest(DeleteProjectForm);
        expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Delete-Project');
        expect(req.reqType).to.equal('post');
        expect(req.body.id).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
        expect(req.body.managerId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    });

    it('knows add user to project', function()
    {
        let req = ProjectLib.projectRequest(AddUserToProjectForm);
        expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Add-User-To-Project');
        expect(req.reqType).to.equal('post');
        expect(req.body.userEmail).to.equal('testeProjeto@unitario.com');
        expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    });

    it('knows remove user to project', function()
    {
        let req = ProjectLib.projectRequest(RemoveUserFromProjectForm);
        expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Remove-User-From-Project');
        expect(req.reqType).to.equal('post');
        expect(req.body.userEmail).to.equal('testeProjeto@unitario.com');
        expect(req.body.projectId).to.equal('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    });

    it('knows get project list', function()
    {
        let req = ProjectLib.projectRequest(GetProjectListForm);
        expect(req.url).to.equal('http://ec2-18-229-140-144.sa-east-1.compute.amazonaws.com:8080/api/Project/Get-Projects-List?UserId=3fa85f64-5717-4562-b3fc-2c963f66afa6');
        expect(req.reqType).to.equal('get');
    });

    it('knows get users in projects', function()
    {
        let req = ProjectLib.projectRequest(GetUsersInProjectForm);
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
            projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            userEmail: "testeProjeto@unitario.com"
        }
    }

    const RemoveUserFromProjectForm: ProjectForm =
    {
        id: 'Remove-User-From-Project',
        parameters:
        {
            projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            userEmail: "testeProjeto@unitario.com",
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