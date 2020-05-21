import React, { Component } from "react";
import { View, Picker, StyleSheet } from "react-native";
import DefaultButton from "../../Reusables/DefaultButton";

export default class StatusFilterPicker extends Component
{
    props;
    state;

    constructor(props)
    {
        super(props);
        this.state = {selectedValue: 5};
    }

    render()
    {
        const selectedValue = this.state.selectedValue;

        return (
            <View style={styles.container}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={this.onValueChange.bind(this)}
              >
                 <Picker.Item label="Todas" value="5" />
                <Picker.Item label="Em progresso" value="2" />
                <Picker.Item label="Atrasada" value="3" />
                <Picker.Item label="Concluida" value="4" />
              </Picker>
            </View>
          );
    }

    componentDidMount(){
      this.setState({selectedValue: 5})

      const pickedFilter = this.props.pickedFilter;
      pickedFilter(5);
    }

    onValueChange(itemValue, _)
    {
      console.log(itemValue)
        this.setState({selectedValue: itemValue});

        const pickedFilter = this.props.pickedFilter;
        pickedFilter(itemValue);
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  }
});
