import React, {Component, ReactNode} from 'react';
import {FlatList} from 'react-native';
import AddMemberForm from './components/AddMemberFrom';
import MemberCell from './components/MemberCell'

const dummyData =
[
    {id: 'user1@mail.com'},
    {id: 'user2@mail.com'},
    {id: 'user3@mail.com'},
    {id: 'user4@mail.com'},
    {id: 'user5@mail.com'},
    {id: 'user6@mail.com'},
    {id: 'user7@mail.com'},
    {id: 'user8@mail.com'},
    {id: 'user9@mail.com'},
    {id: 'user10@mail.com'},
    {id: 'ADD'}
]

export default class ManageMembersScreen extends Component
{
    props;
    state;

    constructor(props)
    {
        super(props);
    }

    render(): ReactNode
    {
        const manageMembersScreen: ReactNode =
        (
            <FlatList
                data = {dummyData}
                renderItem = {this.renderItem.bind(this)}
            />
        )
        return manageMembersScreen
    }

    renderItem(itemData)
    {
        if(itemData.item.id === "ADD")
        {
            const addMember =
            (
                <AddMemberForm
                    onPressAdd = {email => console.log(email)}
                />
            )

            return addMember
        }
        else
        {
            const memberCell =
            (
                <MemberCell
                    email = {itemData.item.id}
                    onPressRemove = {() => {}}
                />
            )

            return memberCell;
        }
    }
}