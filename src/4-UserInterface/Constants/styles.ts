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
            flexDirection: 'row',
            alignItems: 'center'
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

        workTaskContainer:
        {
            backgroundColor: 'white',
            paddingTop: 40,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            top: -15,
            flex: 5,
            alignItems: 'center',
            width: '100%',
        },

        memberCellContainer:
        {
            backgroundColor: 'white',
            paddingTop: 40,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            top: -15,
            flex: 5,
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
            flex: 1,
            textAlign: 'center',
            color: 'white',
            marginTop: 5,
            fontSize: 20
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

        whiteButton:
        {
            height: 50,
            width: '80%',
            marginVertical: 8,
            borderColor: '#2EBDD8',
            backgroundColor: 'white',
            padding: 8,
            borderWidth: 1,
            borderRadius: 15
        },

        whiteButtonText: 
        {
            color: '#2EBDD8'
        },

        redButton:
        {
            height: 50,
            width: '80%',
            marginVertical: 8,
            borderColor: 'red',
            backgroundColor: 'white',
            padding: 8,
            borderWidth: 1,
            borderRadius: 15
        },

        redButtonText: 
        {
            color: 'red'
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
            
            backgroundColor: '#2EBDD8',
            padding: 8
        },

        addManagerButton:
        {
            height: 35,
            justifyContent: 'center',
            borderColor: '#2EBDD8',
            backgroundColor: '#2EBDD8',
            padding: 8
        },

        workTaskButton:
        {
            alignSelf: 'center',
            width: '100%'
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
            height: 48,
            width: '100%',
            marginVertical: 8,
            backgroundColor: '#f5f9fc',
            borderColor: '#f5f9fc',
            padding: 8,
            borderWidth: 1,
            borderRadius: 10
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

        delayedCell:
        {
            backgroundColor: '#ff6b6b'
        },

        defaultCellTitle:
        {
            fontSize: 17,
            color: "#a6a9ab"
        },

        delayedCellTitle:
        {
            fontSize: 17,
            color: "#a33229"
        },

        completedCellTitle:
        {
            fontSize: 17,
            color: "#0a7d4f"
        },

        completedCell:
        {
            backgroundColor: '#a1ffdb'
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

        labelAddMember:
        {
            color: '#5374a3'
        },

        addMemberCell:
        {
            margin: 10,
            overflow: 'hidden',
            borderColor: 'white',
            padding: 8,
            borderWidth: 1,
            borderRadius: 10
        },

        addMemberMemberCell:
        {
            overflow: 'hidden',
            borderColor: '#f5f9fc',
            backgroundColor: '#f5f9fc',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 10,
            padding: 10,
            borderWidth: 1,
            borderRadius: 10
        },

        memberCell:
        {
            overflow: 'hidden',
            borderColor: '#f5f9fc',
            backgroundColor: '#f5f9fc',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 10,
            padding: 10,
            borderWidth: 1,
            borderRadius: 10
        },

        memberInfo:
        {
            flex: 1, 
            flexDirection: 'column'
        },

        managerLabel:
        {
            color: '#bebebe'
        },

        datePickerCell:
        {
            margin: 10,
            width: '80%',
            overflow: 'hidden',
            borderColor: '#f0f0f0',
            backgroundColor: 'white',
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