import {StyleSheet} from 'react-native'

export default StyleSheet.create(
    {
        screen:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
            marginLeft: 45,
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