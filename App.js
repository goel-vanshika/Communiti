/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,createContext} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Context from './Context'

import HomeScreen from './components/HomeScreen';
import UserProfile from './components/UserProfile';
import ClubScreen from './components/ClubScreen';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';

const NavTab=createBottomTabNavigator();

const App=()=>{
    const [isStarting, setStart]=useState(true);
    const [isSignedIn, setSignedIn]=useState(false);
    const [profile,setProfile]=useState({'name':'','SRN':'','sem':'','branch':''});
    const [subscriptions,setSubscriptions]=useState({});
    const [user,password]=['Agile','manifesto']
    const ip='10.20.207.234';
    const port='8080';
    contextObject={
        userProfile:[profile,setProfile],
        subscriptions:[subscriptions,setSubscriptions],
        controlFlow:[setStart,setSignedIn],
        credentials:[user,password],
        netDetails:[ip,port],
    };
    return(
    <Context.Provider value={contextObject}>
        <NavigationContainer>
            <NavTab.Navigator screenOptions={{headerShown: false,tabBarActiveTintColor:'#fda168'}}>
                {isStarting
                ?<NavTab.Screen name='SplashScreen' component={SplashScreen} options={{tabBarStyle: {display: 'none'}}}/>
                :isSignedIn
                ?<>
                    <NavTab.Screen name='HomeScreen' component={HomeScreen} options={{tabBarLabel:'Home',tabBarIcon:({focused,color,size})=><View style={focused?{borderColor:color,borderWidth:2,padding:2,borderRadius:size}:{}}><Image source={require('./assets/home.png')} style={{width:size,height:size}}/></View>}}/>
                    <NavTab.Screen name='ClubScreen' component={ClubScreen} options={{tabBarLabel:'Clubs',tabBarIcon:({focused,color,size})=><View style={focused?{borderColor:color,borderWidth:2,padding:2,borderRadius:size}:{}}><Image source={require('./assets/clubs.png')} style={{width:size,height:size,borderRadius:size,borderColor:color}}/></View>}}/>
                    <NavTab.Screen name='UserProfile' component={UserProfile} options={{tabBarLabel:'My Profile',tabBarIcon:({focused,color,size})=><View style={focused?{borderColor:color,borderWidth:2,padding:2,borderRadius:size}:{}}><Image source={require('./assets/profile.png')} style={{width:size,height:size,borderRadius:size,borderColor:color}}/></View>}}/>
                </>
                :<NavTab.Screen name='AuthorizationScreen' component={AuthScreen} options={{tabBarStyle: {display: 'none'}}}/>}
            </NavTab.Navigator>
        </NavigationContainer>
    </Context.Provider>
    );
};

export default App;
