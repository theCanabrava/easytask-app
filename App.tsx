import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import toolsetReducer from './src/3-ToolsetFactory/reducer/toolset';
import ToolsetFactory from './src/3-ToolsetFactory/ToolsetFactory';
import AppToolset from './src/3-ToolsetFactory/types/AppToolset';
import * as toolsetActions from './src/3-ToolsetFactory/actions/toolset';
import ProjectData from './src/2-Database/types/ProjectData';
import WorkTaskData from './src/2-Database/types/WorkTaskData';

const rootReducer = combineReducers(
  {
    toolset: toolsetReducer
  }
);

const store = createStore(rootReducer);



export default class App extends Component
{
  private toolset: AppToolset;
  state

  constructor(props)
  {
    super(props);
    this.state = {isLoading: true};
    this.loadApp = this.loadApp.bind(this);
    this.loaded = this.loaded.bind(this);
  }

  async loadApp()
  {
    this.toolset = await ToolsetFactory.makeToolset();
  }

  render()
  {
    const isLoading = this.state.isLoading;
    let app
    if(isLoading)
    {
      app = (
        <Provider store={store}>
          <AppLoading
            startAsync={this.loadApp}
            onFinish={this.loaded}/>
        </Provider>
      )
    }
    else
    {
      app = (
        <Provider store={store}>
          <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
          </View>
        </Provider>
      );
    }

    return app;
  }
  
  async loaded()
  {
    this.setState({isLoading: false});
    store.dispatch(toolsetActions.setToolset(this.toolset));
    const workTask: WorkTaskData =
    {
      id: 'NUUL ID',
      workTaskName: 'This is a check',
      projectId: 'NUUL ID',
      description: 'To see if redux can store a project',
    }
    store.dispatch(toolsetActions.updateWorkTask(workTask));
    const workTask2: WorkTaskData =
    {
      id: 'NUUL ID2',
      projectId: 'Sup, bro',
      responsibleUserId: 'NUUL ID',
      description: 'Actualy, a work task',
      startDate: new Date().toISOString(),
      finishDate: new Date().toISOString(),
      expectedConclusionDate: new Date().toISOString(),
      howMuch: 4,
      observation: 'Today'
    }
    store.dispatch(toolsetActions.updateWorkTask(workTask2));
    const workTasks: WorkTaskData[] = [];
    for(let i=0; i<10; i++) workTasks.push({id: `Project ${i}`, projectId: `NUUL ID`})
    store.dispatch(toolsetActions.reloadWorkTasks(workTasks));
    console.log(store.getState().toolset.workTasks);
    store.dispatch(toolsetActions.removeWorkTask('Project 5'));
    console.log(store.getState().toolset.workTasks);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});