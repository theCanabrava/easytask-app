import AppToolset from "../types/AppToolset";
import UserData from "../../2-Database/types/UserData";
import ProjectData from "../../2-Database/types/ProjectData";
import WorkTaskData from "../../2-Database/types/WorkTaskData";
import 
{
    SET_TOOLSET,
    UPDATE_USER,
    REMOVE_USER,
    UPDATE_PROJECT,
    RELOAD_PROJECTS,
    DELETE_PROJECT,
    UPDATE_WORKTASK,
    RELOAD_WORKTASK,
    DELETE_WORKTASK
} 
from "../actions/toolset";

interface AppState
{
    toolset: AppToolset,
    user: UserData,
    projects: ProjectData[],
    workTasks: WorkTaskData[],
}

const initialState: AppState =
{
    toolset: undefined,
    user: undefined,
    projects: [],
    workTasks: []
}

export default function(state = initialState, action)
{
    if(reducerFunctions[action.type])
    {
        return reducerFunctions[action.type](state, action);
    }
    return state;
}

const reducerFunctions =
{
    [SET_TOOLSET]: setToolset,
    [UPDATE_USER]: updateUser,
    [REMOVE_USER]: removeUser,
    [UPDATE_PROJECT]: updateProject,
    [RELOAD_PROJECTS]: reloadProjects,
    [DELETE_PROJECT]: deleteProjects,
    [UPDATE_WORKTASK]: updateWorkTask,
    [RELOAD_WORKTASK]: reloadWorkTask,
    [DELETE_WORKTASK]: deleteWorkTask
}

function setToolset(state, action)
{
    const toolset: AppToolset = action.toolset;
    const user = toolset.userStorage.getUser();
    const projects = toolset.projectStorage.getProjects();
    const workTasks = toolset.workTaskStorage.getWorkTasks();
    console.log("TOOLSET SET");
    return {...state, toolset: toolset, user: user, projects: projects, workTasks: workTasks };
}

function updateUser(state, action)
{
    const user = action.user;
    return {...state, user: user};
}

function removeUser(state, action)
{
    const user: UserData =
    {
        email: '',
        uuid: '',
        webtoken: ''
    }
    return {...state, user: user};
}

function updateProject(state, action)
{
    const project: ProjectData = action.project;
    const projects: ProjectData[] = state.projects;
    const index = projects.findIndex(proj => proj.id === project.id);
    if(index !== -1)
    {
        if(project.id) projects[index].id = project.id;
        if(project.projectName) projects[index].projectName = project.projectName;
        if(project.description) projects[index].description = project.description;
        if(project.startDate) projects[index].startDate = project.startDate;
        if(project.finishDate) projects[index].finishDate = project.finishDate;
        if(project.managerId) projects[index].managerId = project.managerId;
        if(typeof project.completed !== 'undefined') projects[index].completed = project.completed;
    }
    else projects.push(project);
    return {...state, projects: projects};
}

function reloadProjects(state, action)
{
    const projects = action.projects;
    return {...state, projects: projects};
}

function deleteProjects(state, action)
{
    const projects: ProjectData[] = state.projects;
    const index = projects.findIndex(proj => proj.id === action.projectId);
    delete projects[index];
    return {...state, projects: projects};
}

function updateWorkTask(state, action)
{
    const workTask: WorkTaskData = action.workTask;
    const workTasks: WorkTaskData[] = state.workTasks;
    const index = workTasks.findIndex(work => work.id === workTask.id);
    if(index !== -1)
    {
        if(workTask.workTaskName) workTasks[index].workTaskName = workTask.workTaskName;
        if(workTask.description) workTasks[index].description = workTask.description;
        if(workTask.projectId) workTasks[index].projectId = workTask.projectId;
        if(workTask.responsibleUserId) workTasks[index].responsibleUserId = workTask.responsibleUserId;
        if(workTask.startDate) workTasks[index].startDate = workTask.startDate;
        if(workTask.expectedConclusionDate) workTasks[index].expectedConclusionDate = workTask.expectedConclusionDate;
        if(workTask.finishDate) workTasks[index].finishDate = workTask.finishDate;
        if(workTask.where) workTasks[index].where = workTask.where;
        if(workTask.why) workTasks[index].why = workTask.why;
        if(workTask.how) workTasks[index].how = workTask.how;
        if(workTask.howMuch) workTasks[index].howMuch = workTask.howMuch;
        if(workTask.observation) workTasks[index].observation = workTask.observation;
    }
    else workTasks.push(workTask);
    return { ...state, workTasks: workTasks };
}

function reloadWorkTask(state, action)
{
    const addedWorkTasks: WorkTaskData[] = action.workTasks;
    const oldWorkTasks: WorkTaskData[] = state.workTasks;
    const newWorkTasks: WorkTaskData[] = oldWorkTasks.filter(work => work.projectId !== addedWorkTasks[0].projectId);
    for(const i in addedWorkTasks)newWorkTasks.push(addedWorkTasks[i]);
    return { ...state, workTasks: newWorkTasks };
}

function deleteWorkTask(state, action)
{
    const workTasks: WorkTaskData[] = state.workTasks;
    const index = workTasks.findIndex(work => work.id === action.workTaskId);
    delete workTasks[index];
    return {...state, workTasks: workTasks};
}