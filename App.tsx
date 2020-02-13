import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthDataSource from './src/1-AuthManager/interfaces/AuthDataSource';
import AxiosCommunicator from './src/2-AxiosCommunicator/AxiosCommunicator';
import AuthSubscriber from './src/1-AuthManager/interfaces/AuthSubscriber';
import AuthManagerComponents from './src/1-AuthManager/types/AuthManagerComponents';
import AuthManager from './src/1-AuthManager/AuthManager';
import Database from './src/2-Database/Database';

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
            await this.udb.initDatabase();
            console.log(this.udb.getUser());
            this.udb.notify(
              {
                status: 200,
                path: '/api/New-User',
                data:
                {
                  success: true,
                  data: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlMjU1M2E1NC00YjQ2LTQyYWUtYTBiNi1lMWY1NGNkY2M5YWQiLCJuYmYiOjE1ODE1NTM3NDcsImV4cCI6MTU4MTU2MDk0NywiaWF0IjoxNTgxNTUzNzQ3LCJpc3MiOiJFYXN5VGFza0FwaSIsImF1ZCI6Imh0dHBzOi8vZWFzeXRhc2thcGkuYXp1cmV3ZWJzaXRlcy5uZXQifQ.sjpDYcl2zHFfiHCtpaHh1C9AlKIqhftwtx-98AnRoXc`
                }
              }
            )
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
