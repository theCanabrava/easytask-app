import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthDataSource from './src/1-AuthManager/interfaces/AuthDataSource';
import AxiosCommunicator from './src/2-AxiosCommunicator/AxiosCommunicator';
import AuthSubscriber from './src/1-AuthManager/interfaces/AuthSubscriber';
import AuthManagerComponents from './src/1-AuthManager/types/AuthManagerComponents';
import AuthManager from './src/1-AuthManager/AuthManager';
import Database from './src/2-Database/Database';
import ToolsetFactory from './src/3-ToolsetFactory/ToolsetFactory';
import UserStorage from './src/2-Database/interfaces/UserStorage';

export default class App extends Component implements AuthSubscriber
{
  private manager: AuthManager;
  private udb: UserStorage;

  constructor(props)
  {
    super(props);
    //this.udb = new Database();
  }

  notify(response)
  {
    console.log('done');
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
            this.manager = toolset.authManager;
            this.manager.subscribe(this);
            console.log("Inited");
          }}
        />
        <Button
          title ={"Login"}
          onPress = {async () =>
          {
            this.udb.updateUser({email: 'teste@unitario.com'})
            await this.manager.login({email: 'teste@unitario.com', password: 'Teste@123'})
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
