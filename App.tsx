import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthDataSource from './src/1-AuthManager/interfaces/AuthDataSource';
import AxiosCommunicator from './src/2-AxiosCommunicator/AxiosCommunicator';
import AuthSubscriber from './src/1-AuthManager/interfaces/AuthSubscriber';
import AuthManagerComponents from './src/1-AuthManager/types/AuthManagerComponents';
import AuthManager from './src/1-AuthManager/AuthManager';

export default class App extends Component implements AuthSubscriber
{
  private manager: AuthManager;
  constructor(props)
  {
    super(props);
    const dataSource: AuthDataSource =
    {
      getToken()
      {
        return '';
      }
    }
    const communicator = new AxiosCommunicator();
    const components: AuthManagerComponents =
    {
      communicator: communicator,
      dataSource: dataSource,
      subscribers: [this]
    }

    this.manager = new AuthManager(components);
    communicator.setDelegate(this.manager);
  }

  notify(response)
  {
    console.log(response);
  }

  render()
  {
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Button
          title ={"Login"}
          onPress = {() =>
          {
            this.manager.login(
              {
                email: 'teste@unitario.com',
                password: 'Teste@123'
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
