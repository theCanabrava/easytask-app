import AppToolset from "../types/AppToolset"
import UserData from "../../2-Database/types/UserData"
import ProjectData from "../../2-Database/types/ProjectData"
import WorkTaskData from "../../2-Database/types/WorkTaskData"

export const SET_TOOLSET = "SET_TOOLSET"
export const UPDATE_USER = "UPDATE_USER"
export const REMOVE_USER = "REMOVE_USER"
export const UPDATE_PROJECT = "UPDATE_PROJECT"
export const RELOAD_PROJECTS = "RELOAD_PROJECTS"
export const DELETE_PROJECT = "DELETE_PROJECT"
export const SET_PROJECT_MANAGER = "SET_PROJECT_MANAGER"
export const UPDATE_WORKTASK = "UPDATE_WORKTASK"
export const RELOAD_WORKTASK = "RELOAD_WORKTASK"
export const FILTER_WORKTASK = "FILTER_WORKTASK"
export const DELETE_WORKTASK = "DELETE_WORKTASK"

export function setToolset(toolset: AppToolset)
{
    const action =
    {
        type: SET_TOOLSET,
        toolset: toolset
    };
    
    return action;
}

export function updateUser(user: UserData)
{
    const action =
    {
        type: UPDATE_USER,
        user: user
    };

    return action;
}

export function removeUser()
{
    const action =
    {
        type: REMOVE_USER,
    };

    return action;
}

export function updateProject(project: ProjectData)
{
    const action =
    {
        type: UPDATE_PROJECT,
        project: project
    }

    return action;
}

export function reloadProjects(projects: ProjectData[])
{
    const action =
    {
        type: RELOAD_PROJECTS,
        projects: projects
    }

    return action;
}

export function removeProject(projectId: string)
{
    const action =
    {
        type: DELETE_PROJECT,
        projectId: projectId
    }

    return action;
}

export function setProjectManager(projectsIds: string[]){


    const action =
    {
        type: SET_PROJECT_MANAGER,
        projectsIds: projectsIds
    }

    return action;
}

export function updateWorkTask(workTask: WorkTaskData)
{
    const action =
    {
        type: UPDATE_WORKTASK,
        workTask: workTask
    }

    return action;
}

export function reloadWorkTasks(workTasks: WorkTaskData[])
{
    const action =
    {
        type: RELOAD_WORKTASK,
        workTasks: workTasks
    }

    return action;
}

export function filterWorkTask(workTasks: WorkTaskData[])
{
    const action =
    {
        type: FILTER_WORKTASK,
        workTasks: workTasks
    }

    return action;
}

export function removeWorkTask(workTaskId: string)
{
    const action =
    {
        type: DELETE_WORKTASK,
        workTaskId: workTaskId
    }

    return action;
}