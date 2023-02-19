import {Text,View,TextInput,Pressable,Image,StyleSheet} from 'react-native';
import {useContext, useState} from 'react';
import Context from '../Context';

const AuthScreen=()=>{
    const contextObj=useContext(Context);
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const authorize=()=>{
        return (userName == contextObj.credentials[0]) && (password == contextObj.credentials[1]);
    };
    const handleSubmit=()=>{
        if(userName=='')
        {
            alert('Do not leave the username field blank');
            return;
        }
        else if(password=='')
        {
            alert('Do not leave the password field blank');
            return;
        }
        const verified=authorize();
        if(verified)
            contextObj.controlFlow[1](true);
        else
            alert('Invalid credentials... Please try again')
    };
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#2999db'}}>
            <Image source={require("../assets/Communitiv1_bluebg.png")} style={{width:200,height:200,margin:10}}/>
            <Text style={styles.inputName}>Username</Text>
            <TextInput style={styles.inputBox} placeholder="Enter your username here!" onChangeText={(newText)=>setUserName(newText)}/>
            <Text style={styles.inputName}>Password</Text>
            <TextInput style={styles.inputBox} placeholder="Enter your password here!" onChangeText={(newText)=>setPassword(newText)} secureTextEntry/>
            <Pressable style={styles.loginButton} onPress={handleSubmit}>
                <Text style={styles.loginName}>Sign In</Text>
            </Pressable>
        </View>
    );
};

const styles=StyleSheet.create({
    inputName:{
        fontWeight:"bold",
        fontSize:15,
        color:'white'
    },
    inputBox:{
      height: 40,
      margin: 12,
      padding: 10,
      textAlign:"center",
      color:'white'
    },
    loginButton:{
      fontWeight:"bold",
      fontSize:18,
      textAlign:"center",
      borderRadius:20,
      borderWidth: 2,
      paddingVertical: 5,
      margin:10,
      paddingHorizontal: 10,
      backgroundColor: '#FF914D',
      borderColor:'#FF914D'
    },
    loginName:{
      fontWeight:"bold",
        fontSize:18,
        color:'white'
    }
  })

export default AuthScreen;