import React, {Component, ReactNode} from 'react';
import {FlatList} from 'react-native';
import styles from '../Constants/styles';
import WorkTaskData from '../../2-Database/types/WorkTaskData';
import WorkTaskCell from './components/WorkTaskCell';
import DefaultButton from '../Reusables/DefaultButton';
import texts from '../Constants/texts';

const dummyData: WorkTaskData[] =
[
    {
        id: '1',
        workTaskName: 'Work Task 1',
        description: 'Descrição 1',
        projectId: '1',
        responsibleUserId: 'MEEE',
        startDate: new Date().toISOString(),
        expectedConclusionDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        where: 'Aqui',
        why: 'Porque',
        how: 'Força',
        howMuch: 2,
        observation: 'Com gosto'
    },
    {
        id: '2',
        workTaskName: 'Work Task 2',
        description: 'Descrição 2',
        projectId: '1',
        responsibleUserId: 'MEEE',
        startDate: new Date().toISOString(),
        expectedConclusionDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        where: 'Aqui',
        why: 'Porque',
        how: 'Força',
        howMuch: 2,
        observation: 'Com gosto'
    },
    {
        id: '3',
        workTaskName: 'Work Task 3',
        description: 'Descrição 3',
        projectId: '1',
        responsibleUserId: 'MEEE',
        startDate: new Date().toISOString(),
        expectedConclusionDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        where: 'Aqui',
        why: 'Porque',
        how: 'Força',
        howMuch: 2,
        observation: 'Com gosto'
    },
    {
        id: '4',
        workTaskName: 'Work Task 4',
        description: 'Descrição 4',
        projectId: '1',
        responsibleUserId: 'MEEE',
        startDate: new Date().toISOString(),
        expectedConclusionDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        where: 'Aqui',
        why: 'Porque',
        how: 'Força',
        howMuch: 2,
        observation: 'Com gosto'
    },
    {
        id: '5',
        workTaskName: 'Work Task 5',
        description: 'Descrição 5',
        projectId: '1',
        responsibleUserId: 'MEEE',
        startDate: new Date().toISOString(),
        expectedConclusionDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        where: 'Aqui',
        why: 'Porque',
        how: 'Força',
        howMuch: 2,
        observation: 'Com gosto'
    },
    {
        id: '6',
        workTaskName: 'Work Task 6',
        description: 'Descrição 6',
        projectId: '1',
        responsibleUserId: 'MEEE',
        startDate: new Date().toISOString(),
        expectedConclusionDate: new Date().toISOString(),
        finishDate: new Date().toISOString(),
        where: 'Aqui',
        why: 'Porque',
        how: 'Força',
        howMuch: 2,
        observation: 'Com gosto'
    },
    {
        id: 'ADD'
    },
]

export default class WorkTaskListScreen extends Component
{
    props;
    state;

    constructor(props)
    {
        super(props);
    }

    render(): ReactNode
    {
        const workTaskListScreen: ReactNode =
        (
            <FlatList
                data = {dummyData}
                renderItem = {this.renderItem.bind(this)}
            />
        )
        return workTaskListScreen
    }

    renderItem(itemData): ReactNode
    {
        if(itemData.item.id === "ADD")
        {
            const addCell =
            (
                <DefaultButton
                    title = {texts.ADD_WORK_TASK}
                    onPress = {() => this.props.navigation.navigate('ManageWorkTask')}
                />
            )
            return addCell
        } 
        else
        {
            const projectCell =
            (
                <WorkTaskCell
                    workTaskData = {itemData.item}
                    onPressEdit = {() => this.props.navigation.navigate('ManageWorkTask')}
                />
            )
            return projectCell;
        }
    }
}