import {Button, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AnnounceModal from './AnnounceModal';
import Announcement from './Announcement';

const NavStack=createStackNavigator();

export default HomeScreen=()=>{
    return(
    <NavStack.Navigator initialRouteName='Announcement'>
        <NavStack.Screen name='Announcement' component={Announcement} options={{title: 'Announcements'}}/>
    </NavStack.Navigator>
    );
}