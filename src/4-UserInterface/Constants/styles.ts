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
            backgroundColor: '#151724',
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
            backgroundColor: '#151724',
            alignItems: 'center',
            paddingTop: 40,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            top: -15,
            flex: 1.61803398875
        },

        loginText: 
        {
            textAlign: 'left',
            color: '#2EBDD8',
            right: '34%',
            fontSize: 17
        },

        defaultScreen:
        {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'stretch',
        },

        backgroundContainer:
        {
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
            paddingTop: 65
        },

        backImageContainer: {
            width: '90%',
            justifyContent: 'flex-start',
            flexDirection: 'row'  
        },

        defaultContainer:
        {
            backgroundColor: 'white',
            paddingTop: 40,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            top: -15,
            flex: 1.61803398875,
            alignItems: 'center',
            width: '100%',
        },

        flatList:
        {
            width: '90%'
        },

        defaultImage:
        {
            height: 110,
            width: 110,
            resizeMode: 'contain'
        },

        backImage:
        {
            height: 25,
            width: 25,
            resizeMode: 'contain'
        },

        screenTitle:
        {
            color: 'white',
            marginTop: 5,
            fontSize: 18
        },

        clickableText:
        {
            color: '#2EBDD8',
        },

        whiteText:
        {
            color: 'white',
        },

        sworkTaskScreen:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
        },

        button:
        {
            height: 50,
            width: '80%',
            marginVertical: 8,
            borderColor: '#2EBDD8',
            backgroundColor: '#2EBDD8',
            color: 'black',
            padding: 8,
            borderWidth: 1,
            borderRadius: 15
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
            height: 50,
            width: '80%',
            marginVertical: 8,
            borderColor: 'white',
            backgroundColor: 'white',
            color: 'black',
            padding: 8,
            borderWidth: 1,
            borderRadius: 15
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
            borderColor: '#f5f9fc',
            backgroundColor: '#f5f9fc',
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