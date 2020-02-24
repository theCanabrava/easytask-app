import React, {Component, ReactNode} from 'react';
import {View, Text, KeyboardAvoidingView, TextInput} from 'react-native';
import styles from '../Constants/styles';
import DefaultButton from '../Reusables/DefaultButton';
import texts from '../Constants/texts';

export default class ManageWorkTaskScreen extends Component
{
    props;
    state;
    
    constructor(props)
    {
        super(props);
        this.state =
        {
            workTaskName: '',
            description: '',
            expectedConclusionDate: '',
            where: '',
            why: '',
            how: '',
            howMuch: '',
            observation: '',
        }
    }

    render(): ReactNode
    {
        const workTaskName = this.state.workTaskName;
        const description = this.state.description;
        const expectedConclusionDate = this.state.expectedConclusionDate;
        const where = this.state.where;
        const why = this.state.why;
        const how = this.state.how;
        const howMuch = this.state.howMuch;
        const observation = this.state.observation;

        const manageWorkTaskScreen: ReactNode =
        (
            <KeyboardAvoidingView 
            style={styles.screen}
            behavior='padding'
            >
                <TextInput
                    style={styles.input}
                    value={workTaskName}
                    onChangeText={(workTaskName) => this.setState({workTaskName})}
                    placeholder={texts.WORK_TASK_LBL}
                />
                <TextInput
                    multiline
                    style={styles.input}
                    value={description}
                    onChangeText={(description) => this.setState({description})}
                    placeholder={texts.DESCRIPTION_LBL}
                />
                <TextInput
                    multiline
                    style={styles.input}
                    value={expectedConclusionDate}
                    onChangeText={(expectedConclusionDate) => this.setState({expectedConclusionDate})}
                    placeholder={texts.EXPECTED_CONCLUSION_LBL}
                />
                <TextInput
                    multiline
                    style={styles.input}
                    value={where}
                    onChangeText={(where) => this.setState({where})}
                    placeholder={texts.WHERE_LBL}
                />
                <TextInput
                    multiline
                    style={styles.input}
                    value={why}
                    onChangeText={(why) => this.setState({why})}
                    placeholder={texts.WHY_LBL}
                />
                <TextInput
                    multiline
                    style={styles.input}
                    value={how}
                    onChangeText={(how) => this.setState({how})}
                    placeholder={texts.HOW_LBL}
                />
                <TextInput
                    multiline
                    style={styles.input}
                    value={howMuch}
                    onChangeText={(howMuch) => this.setState({howMuch})}
                    placeholder={texts.HOW_MUCH_LBL}
                />
                <TextInput
                    multiline
                    style={styles.input}
                    value={observation}
                    onChangeText={(observation) => this.setState({observation})}
                    placeholder={texts.OBSERVATION_LBL}
                />
                <DefaultButton
                    title={texts.CREATE_LBL}
                    onPress={() => {}}
                />
            </KeyboardAvoidingView>
        )
        return manageWorkTaskScreen
    }
}