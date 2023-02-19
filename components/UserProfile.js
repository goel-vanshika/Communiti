import {View, Text, Image, Button, Modal, TextInput, StyleSheet, Pressable} from 'react-native';
import {useContext, useState} from 'react';
import Context from '../Context';
import QRCode from 'react-native-qrcode-svg';

const UserProfile=()=>{
    const contextObj=useContext(Context);
    const [modalVisible,setModalVisibility]=useState(false);
    const [profile,setProfile]=contextObj.userProfile;
    var userInp={'name':profile['name'],'SRN':profile['SRN'],'sem':profile['sem'],'branch':profile['branch']};
    const setField=(key,val)=>{
        userInp[key]=val;
    };
    const handleSave=()=>{
        if(userInp['name']=='' || userInp['sem']=='' || userInp['branch']=='')
            alert('Do not leave any field blank');
        else if(userInp['sem']<0)
            alert('Semester cannot be negative');
        else if(userInp['sem']==0)
            alert('Semester cannot be zero');
        else if(userInp['sem']>8)
            alert('Semester cannot be greater than 8');
        else
        {
            setProfile({'name':userInp['name'],'SRN':userInp['SRN'],'sem':userInp['sem'],'branch':userInp['branch']});
            setModalVisibility(false);
        }
    };
    const handleCancel=()=>{
        userInp={};
        setModalVisibility(false);
    };  // Todo Handle cancel
    return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Modal animationType='slide' visible={modalVisible} onRequestClose={handleCancel}>
            <Text style={styles.inputName}>Name</Text>
            <TextInput style={styles.inputBox} defaultValue={profile['name']} onSubmitEditing={(event)=>setField('name',event.nativeEvent.text)}/>
            <Text style={styles.inputName}>SRN</Text>
            <TextInput style={styles.inputBox} defaultValue={profile['SRN']} maxLength={13} onSubmitEditing={(event)=>setField('SRN',event.nativeEvent.text)}/>
            <Text style={styles.inputName}>Semester</Text>
            <TextInput style={styles.inputBox} defaultValue={profile['sem']} keyboardType='numeric' onSubmitEditing={(event)=>setField('sem',event.nativeEvent.text)}/>
            <Text style={styles.inputName}>Branch</Text>
            <TextInput style={styles.inputBox} defaultValue={profile['branch']} autoCapitalize='characters' onSubmitEditing={(event)=>setField('branch',event.nativeEvent.text)}/>
            <Pressable style={styles.buttonStyle} onPress={handleSave}><Text style={styles.buttonName}>Save</Text></Pressable>
            <Pressable style={styles.buttonStyle} onPress={handleCancel}><Text style={styles.buttonName}>Cancel</Text></Pressable>
        </Modal>
        <Pressable style={styles.buttonStyle} onPress={()=>setModalVisibility(true)}><Text style={styles.buttonName}>Edit Profile</Text></Pressable>
        <Image source={{uri: 'https://reactjs.org/logo-og.png'}} style={{width: 200, height: 200, margin: 10}}/>
        <Text style={{margin:10, fontWeight:'bold', color:'#2999DB', fontSize:20}}>{profile['name'] || 'Add your name'}</Text>
        <Text style={{margin:10, fontWeight:'bold', color:'#2999DB', fontSize:20}}>SRN: {profile['SRN'] || 'Add your SRN'}</Text>
        <Text style={{margin:10, fontWeight:'bold', color:'#2999DB', fontSize:20}}>Semester: {profile['sem'] || 'Add your semester'}</Text>
        <Text style={{margin:10, fontWeight:'bold', color:'#2999DB', fontSize:20}}>Branch: {profile['branch'] || 'Add your branch'}</Text>
        <Pressable style={styles.buttonStyle} onPress={()=>contextObj.controlFlow[1](false)}><Text style={styles.buttonName}>Sign out</Text></Pressable>
        <View style={{margin:10}}>
            <QRCode value={JSON.stringify({name:profile['name'],srn:profile['SRN'],semester:profile['sem'],branch:profile['branch']})}/>
        </View>
    </View>
    );
}
const styles=StyleSheet.create({
    inputName:{
        fontWeight:"bold",
        fontSize:15,
        color:'black',
        textAlign:'center',
        top:20
    },
    inputBox:{
      height: 40,
      margin: 12,
      padding: 10,
      textAlign:"center",
      borderColor:'#2999DB',
      borderWidth:3,
      borderRadius:20,
      width:'50%',
      left:95,
      top:20
    },
    buttonStyle:{
      fontWeight:"bold",
      fontSize:18,
      textAlign:"center",
      borderRadius:20,
      borderWidth: 2,
      paddingVertical: 5,
      margin:10,
      paddingHorizontal: 10,
      backgroundColor: '#FF914D',
      borderColor:'#FF914D',
      width:'50%',
      left:5,
      top:10
    },
    buttonName:{
      fontWeight:"bold",
        fontSize:18,
        color:'white',
        textAlign:'center'
    }
  })

export default UserProfile;