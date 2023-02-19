import {View, Text, TextInput, Image, FlatList, Pressable, Modal, Button, StyleSheet} from 'react-native';
import {useState,useContext,useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AnnounceModal from './AnnounceModal';
import { Dimensions } from 'react-native';
import Context from '../Context';

const AnnounceScreen=({navigation})=>{
    const contextObj=useContext(Context);
    const getData=async()=>{
            const url='http://'+contextObj.netDetails[0]+':'+contextObj.netDetails[1]+'/announcements';
            const response=await fetch(url);
            const data=await response.json();
            setAnnouncement(data);
            setFilteredData(data);
    };
    useEffect(()=>{getData()},[]);
    const [announcements,setAnnouncement]=useState([]);
    const [announcementName,setAnnouncementName]=useState('');
    const [filteredData,setFilteredData]=useState(announcements);
    const [modalVisible,setModalVisibility]=useState(true);
    const handleSearch=()=>{
            var updatedAnnouncements=[];
            isDomain=announcementName.match(/#/gi);
            if(isDomain==null){
                updatedAnnouncements=(announcementName!='')?announcements.filter((announcement)=>announcement.announcement_name.toUpperCase()==announcementName.toUpperCase()):announcements;
            }
            else{
                tags=announcementName.replace('#','').toUpperCase();
                updatedAnnouncements=(announcementName!='#')?announcements.filter((announcement)=>announcement.club_name.toUpperCase().includes(tags)):announcements;
            }
            setFilteredData(updatedAnnouncements);
    };
    return(
    <View style={styles.mainView}>
        <View style={styles.searchBar}>
            <TextInput style={{alignText:'center'}} onSubmitEditing={(event)=>setAnnouncementName(event.nativeEvent.text)} defaultValue={announcementName}/>
            <Pressable onPress={handleSearch}><Text style={styles.searchText}>Search</Text></Pressable>
        </View>
        <Pressable onPress={()=>{getData()}} style={{margin:10,top:5,right:10}}>
            <Image source={require('../assets/refresh.png')} style={{width:20,height:20}}/>
        </Pressable>
        <FlatList data={filteredData} renderItem={({item})=><Event data={item}/>} keyExtractor={(item)=>item.announcement_id}/>
        <Modal visible={modalVisible} animationType='slide' onRequestExit={()=>setModalVisibility(false)}>
             <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontWeight:'bold', margin:10, fontSize:30}}>Welcome to Communiti!</Text>
                <Text style={{fontSize:15, padding:10, color:"#2999DB", fontWeight:'bold',margin:20}}>Hi, {contextObj.credentials[0]}</Text>
                <Text style={{fontSize:15, padding:10, color:"#2999DB",alignSelf:'flex-start',marginLeft:30}}>Are you experiencing FOMO at PESU??</Text>
                <Text style={{fontSize:15, padding:10,color:"#2999DB",alignSelf:'flex-start',marginLeft:30}}>{'Don\'t worry. We will make life easier for you!'}</Text>
                <Pressable style={styles.exploreButton} onPress={()=>setModalVisibility(false)}><Text style={styles.exploreText}>Explore</Text></Pressable>
            </View>
        </Modal>
    </View>
    );
}

export default AnnounceScreen;

const Event=(props)=>{
    // TODO Check the number of times this component is being called
    //const navigation=useNavigation();
    const [modalVisible,setModalVisibility]=useState(false);
    return(
        <View style={styles.announcementView}>
            <Pressable onPress={()=>setModalVisibility(true)}>
                <Image source={{uri:props.data.image}} style={{width: 100, height: 100}}/>
                <Text style={{textAlign: 'center', color:'black', fontSize:15, fontWeight:'bold'}}>{props.data.announcement_name}</Text>
            </Pressable>
            <Modal visible={modalVisible} animationType='slide' onRequestExit={()=>setModalVisibility(true)}>
                <AnnounceModal data={props.data} setModalVisibility={setModalVisibility}/>
            </Modal>
        </View>
    );
};

const SearchAnnouncement=()=>{
    const [announceName,setAnnounceName]=useState('');
    return(
        <View style={{width: '100%',padding: 10,alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 2}}>
            <TextInput style={{alignText:'center'}} placeholder="Type the announcement's name!" onChangeText={(newText)=>setAnnounceName(newText)} defaultValue={announceName}/>
        </View>
    );
};

const styles=StyleSheet.create({
    mainView:{
        flex: 2,
        padding: 10,
        justifyContent:'center',
        alignContent:'center'
    },
    searchBar:{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderWidth: 2,
    },
    searchText:{
            fontWeight:"bold",
            fontSize:18,
            color:'orange',
            bottom: 8,
    },
    announcementView:{
      padding: 5,
      margin: 5,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:3,
      borderColor: '#2999DB',
      borderRadius:20,
      width:'90%',
      height:150,
      left:18
  },
    title2View:{
      color:"black",
      fontSize: 25,
      fontWeight:"bold",
      textAlign:"left"
    },
    contentView:{
        color:'black',
        textAlign: "left",
        fontSize: 20
    },
    membersView:{
      color:"black",
      fontSize: 25,
      textAlign: "center",
      fontWeight: "bold"
    },
    infoView:{
      color:"black",
      textAlign:"center",
      fontSize: 20
    },
    imageView:{
      height: 200,
      width: 200,
      alignSelf: "center"
    },
    eventsUp:{
      textAlign: "left",
      fontWeight: "bold",
      alignSelf:'stretch',
      fontSize: 20
    },
    linkView:{
      textAlign: "right",
      alignSelf: 'stretch',
      fontSize: 20
    },
    flexContainer:{
      margin: 10,
      flexDirection: 'row',
      justifyContent: "space-around",
      padding: 10
    },
    exploreButton:{
      fontWeight:"bold",
      fontSize:18,
      textAlign:"center",
      borderRadius:20,
      borderWidth: 2,
      paddingVertical: 5,
      margin:10,
      position:'absolute',
      bottom:185,
      paddingHorizontal: 10,
      backgroundColor: '#FF914D',
      borderColor:'#FF914D'
    },
    exploreText:{
        fontWeight:"bold",
        fontSize:18,
        color:'white'
    }
  })