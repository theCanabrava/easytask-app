import React, {Component, ReactNode} from 'react';
import {KeyboardAvoidingView, TextInput} from 'react-native';
import styles from '../Constants/styles';
import DefaultButton from '../Reusables/DefaultButton';
import texts from '../Constants/texts';

export default class ManageProjectScreen extends Component
{
    props;
    state;
    
    constructor(props)
    {
        super(props);
        this.state =
        {
            projectName: '',
            description: ''
        }
    }

    render(): ReactNode
    {
        const projectName = this.state.projectName;
        const description = this.state.description;

        const manageProjectScreen: ReactNode =
        (
            <KeyboardAvoidingView 
                style={styles.screen}
                behavior='padding'
            >
                <TextInput
                    style={styles.input}
                    value={projectName}
                    onChangeText={(projectName) => this.setState({projectName})}
                    placeholder={texts.PROJECT_NAME_LBL}
                />
                <TextInput
                    multiline
                    style={styles.input}
                    value={description}
                    onChangeText={(description) => this.setState({description})}
                    placeholder={texts.DESCRIPTION_LBL}
                />
                <DefaultButton
                    title={texts.CREATE_LBL}
                    onPress={() => {}}
                />
            </KeyboardAvoidingView>
        )
        return manageProjectScreen
    }
}