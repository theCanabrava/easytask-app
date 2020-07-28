import {StyleSheet} from 'react-native'

export default StyleSheet.create(
    {
        screen:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },

        loginScreen:
        {
            flex: 1,
            backgroundColor: 'midnightblue',
            justifyContent: 'center',
            alignItems: 'stretch',
        },

        loginLogoContainer:
        {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },

        loginLogo:
        {
            height: 85,
            width: 250,
            resizeMode: 'contain'
        },

        loginContainer:
        {
            backgroundColor: 'midnightblue',
            alignItems: 'center',
            paddingTop: 40,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            top: -15,
            flex: 1.61803398875
        },

        sworkTaskScreen:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
        },

        button:
        {
            height: 30,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'stretch',
            
            backgroundColor: 'black',
            marginVertical: 8,
        },

        buttonContent:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },

        buttonText:
        {
            color: 'white'
        },

        shortButton:
        {
            height: 30,
            justifyContent: 'center',
            
            backgroundColor: 'black',
            padding: 8
        },

        input:
        {
            height: 32,
            width: '80%',
            marginVertical: 8,
            borderColor: 'black',
            padding: 8,
            borderWidth: 1
        },

        addUserInput:
        {
            height: 32,
            width: '100%',
            marginVertical: 8,

            borderColor: 'black',
            padding: 8,
            borderWidth: 1
        },

        projectCell:
        {
            margin: 10,
            overflow: 'hidden',
            borderColor: 'black',
            padding: 8,
            borderWidth: 1,
            borderRadius: 10
        },

        label:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
            padding: 8
        },

        labelText:
        {
            color: 'black',
            textAlign: 'left'
        },

        memberCell:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            margin: 10,
            borderColor: 'black',
            padding: 8,
            borderWidth: 1,
            borderRadius: 10
        },

        datePickerCell:
        {
            margin: 10,
            width: '80%',
            overflow: 'hidden',
            borderColor: 'black',
            padding: 8,
            borderWidth: 1,
            borderRadius: 10
        },
        
        datePicker:
        {
            width: '100%'
        }
    }
)