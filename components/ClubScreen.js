import {View, Text, TextInput, Image, FlatList, Pressable, Button, StyleSheet} from 'react-native';
import {useState,useEffect,useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import ClubModal from './ClubModal';
import { Dimensions } from 'react-native';
import Context from '../Context';

const ClubScreen=({navigation})=>{
    const contextObj=useContext(Context);
    const getData=async()=>{
        const url='http://'+contextObj.netDetails[0]+':'+contextObj.netDetails[1]+'/clubs';
        const response=await fetch(url);
        const data=await response.json();
        setClubs(data);
        setFilteredData(data);
    };
    const [clubs,setClubs]=useState([]);
    const [clubName,setClubName]=useState('');
    const [filteredData,setFilteredData]=useState(clubs);
    const handleSearch=()=>{
        var updatedClubs=[];
        isDomain=clubName.match(/#/gi);
        if(isDomain==null){
            console.log(clubName)
            updatedClubs=(clubName!='')?clubs.filter((club)=>club.name.toUpperCase()==clubName.toUpperCase()):clubs;
        }
        else{
            tags=clubName.replace('#','').toUpperCase();
            updatedClubs=(clubName!='#')?clubs.filter((club)=>club.tags.toUpperCase().includes(tags)):clubs;
        }
        setFilteredData(updatedClubs);
    };
    useEffect(()=>{getData()},[])
    return(
        <View style={styles.mainView}>
            <View style={styles.searchBar}>
                <TextInput style={{alignText:'center'}} onSubmitEditing={(event)=>setClubName(event.nativeEvent.text)} defaultValue={clubName}/>
                <Pressable onPress={handleSearch}><Text style={styles.searchText}>Search</Text></Pressable>
            </View>
            <FlatList data={filteredData} renderItem={({item})=><Club data={item}/>} keyExtractor={(item)=>item.club_id} numColumns={2}/>
        </View>
    );
}

const Club=(props)=>{
    // TODO Check the number of times this component is being called
    const [modalVisible,setModalVisibility]=useState(false);
    const navigation=useNavigation();
    return(
        <View style={styles.clubView}>
            <Pressable onPress={()=>setModalVisibility(true)}>
                <ClubModal modalVisible={modalVisible} setModalVisibility={setModalVisibility} data={props.data}/>
                <Image source={{uri: props.data.logo}} style={{width: 130, height: 130}}/>
                <Text style={styles.textView}>{props.data.name}</Text>
                <Text style={{alignText:'center'}}>{props.data.tags}</Text>
            </Pressable>
        </View>
    );
};

const styles=StyleSheet.create({
    mainView:{
        flex: 1,
        padding: 6,
        justifyContent:'center',
        alignContent:'center',
    },
    clubView:{
        padding: 10,
        margin: 10,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderColor: '#2999DB',
        borderRadius:20,
        width:180,
        height:180,
        marginTop:20
    },
    searchBar:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 2,
    },
    textView:{
        textAlign: 'center',
        color:'black',
        fontWeight: 'bold',
        fontSize:15
    },
    searchText:{
        fontWeight:"bold",
        fontSize:18,
        color:'orange',
        bottom: 8,
    },
})

export default ClubScreen;