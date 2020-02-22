import React, {Component, version} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthDataSource from './src/1-AuthManager/interfaces/AuthDataSource';
import AxiosCommunicator from './src/2-AxiosCommunicator/AxiosCommunicator';
import AuthSubscriber from './src/1-AuthManager/interfaces/AuthSubscriber';
import AuthManagerComponents from './src/1-AuthManager/types/AuthManagerComponents';
import AuthManager from './src/1-AuthManager/AuthManager';
import Database from './src/2-Database/Database';
import ToolsetFactory from './src/3-ToolsetFactory/ToolsetFactory';
import UserStorage from './src/2-Database/interfaces/UserStorage';
import ProjectData from './src/2-Database/types/ProjectData';
import ProjectManager from './src/1-ProjectManager/ProjectManager';
import ProjectStorage from './src/2-Database/interfaces/ProjectStorage';

export default class App extends Component implements AuthSubscriber
{
  private manager: AuthManager;
  private pManager: ProjectManager;
  private udb: UserStorage;
  private pdb: ProjectStorage;

  constructor(props)
  {
    super(props);
  }

  notify(response)
  {

    //console.log(response);
  }

  render()
  {


    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button
          title ={"Init"}
          onPress = {async () =>
          {
            const toolset = await ToolsetFactory.makeToolset();
            this.udb = toolset.userStorage
            this.pdb = toolset.projectStorage;
            this.manager = toolset.authManager;
            this.pManager = toolset.projectManager;
            this.manager.subscribe(this);
            this.pManager.subscribe(this);
            console.log('inited');
          }}
        />
        <Button
          title ={"Login"}
          onPress = {async () =>
          {
            //this.udb.updateUser({email: 'teste@unitario.com'})
            //await this.manager.login({email: 'teste@unitario.com', password: 'Teste@123'})
            const project: ProjectData = this.pdb.getProjects()[0];
            
            await this.pManager.deleteProject(
              {
                id: project.id,
                managerId: project.managerId
              }
            );
          }}
        />
         <Button
          title ={"False login"}
          onPress = {async () =>
          {
            this.udb.updateUser({email: 'teste@unitario.com'})
            await this.manager.login({email: 'teste@unitario.com', password: 'Teste@12'})
          }}
        />
        <Button
          title ={"CheckUser"}
          onPress = {async () =>
          {
            console.log(this.udb.getUser());
            console.log(this.pdb.getProjects());
          }}
        />
      </View>
    );
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
