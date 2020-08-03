import React, {Component} from 'react';
import {TextInput, View, Text} from 'react-native';
import styles from '../../Constants/styles';
import DefaultButton from '../../Reusables/DefaultButton';
import texts from '../../Constants/texts';

export default class AddMemberFrom extends Component
{
    props;
    state;

    constructor(props)
    {
        super(props);
        this.state =
        {
            email: ''
        };
    }

    render()
    {
        const email = this.state.email;
        let addMemberForm =
        (
            <View style={styles.addMemberCell}>
                <Text style={styles.labelAddMember}>{texts.EMAIL_MEMBER_LBL}</Text>
                <TextInput
                    style={styles.addUserInput}
                    value={email}
                    onChangeText={(email) => this.setState({email})}
                    placeholder={texts.EMAIL_LBL}
                />
                <DefaultButton
                    style = {{width: '100%'}}
                    title={texts.ADD_MEMBER_LBL}
                    onPress={this.props.onPressAdd.bind(this, email)}
                />
            </View>
        )

        return addMemberForm;
    }
}