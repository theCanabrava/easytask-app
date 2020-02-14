import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthDataSource from './src/1-AuthManager/interfaces/AuthDataSource';
import AxiosCommunicator from './src/2-AxiosCommunicator/AxiosCommunicator';
import AuthSubscriber from './src/1-AuthManager/interfaces/AuthSubscriber';
import AuthManagerComponents from './src/1-AuthManager/types/AuthManagerComponents';
import AuthManager from './src/1-AuthManager/AuthManager';
import Database from './src/2-Database/Database';
import ToolsetFactory from './src/3-ToolsetFactory/ToolsetFactory';

export default class App extends Component implements AuthSubscriber
{
  private manager: AuthManager;
  private udb: Database;

  constructor(props)
  {
    super(props);
    this.udb = new Database();
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
          title ={"Login"}
          onPress = {async () =>
          {
            const toolset = await ToolsetFactory.makeToolset();
            console.log(toolset.userStorage.getUser());
            toolset.userStorage.updateUser({email: "teste@unitario.com"})
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
