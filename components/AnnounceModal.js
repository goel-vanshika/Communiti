import { StyleSheet, Text, View, Image, Linking, Pressable } from "react-native";
import {useContext} from 'react';
import Context from '../Context';

const AnnounceModal = (props) =>{
    const contextObj=useContext(Context);
    const url='http://'+contextObj.netDetails[0]+':'+contextObj.netDetails[1]+'/register';
    const handleRegistration=()=>{
        contextObj.userProfile[0]['announcement_id']=props.data.announcement_id;
        contextObj.userProfile[0]['club_id']=props.data.club_id;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contextObj.userProfile[0])
        })
        .then(response => response.json())
        .then(response => {console.log(JSON.stringify(response));alert('Registration for \''+props.data.announcement_name+'\' successful!')})
    };
  return(
  <View style={styles.mainView}>
          <Pressable style={styles.backButton} onPress={()=>props.setModalVisibility(false)}>
            <Text style={styles.backText}>Close me</Text>
          </Pressable>
          <Image source={{uri:props.data.image}} style={styles.imageView}></Image>
          <Text style={styles.titleView}>{props.data.announcement_name}</Text>
          <Text style={styles.title2View}>{props.data.club_name}</Text>
          <Text style={styles.contentView}>About</Text>
          <Text style={styles.content2View}>{props.data.description}</Text>
          <Text style={styles.linkView} onPress={handleRegistration}>Register here</Text>
          <View>
            <Text style={styles.membersView}>Contact Us</Text>
            <Text style={styles.infoView}>Name: Phone Number</Text>
            <Text style={styles.infoView}>Name: Phone Number</Text>
          </View>
  </View>    
  );
}

const styles=StyleSheet.create({
  mainView:{
    flex: 2,
    padding: 40,
    top:25
},
titleView:{
  color: "#2999DB",
  fontWeight: "bold",
  textAlign: "left",
  fontSize: 35
},
title2View:{
  color:"#FF914D",
  fontSize: 25,
  fontWeight:"bold",
  textAlign:"left"
},
contentView:{
  color:'black',
  textAlign: "left",
  fontSize: 20,
  fontWeight:'bold',
  marginTop:10,
},
content2View:{
  color:'black',
  textAlign: "left",
  fontSize: 20,
  marginBottom:15,
},
membersView:{
  color:"#2999DB",
  fontSize: 20,
  textAlign: "center",
  fontWeight: "bold",
  marginTop: 20,
  marginBottom:10,
},
infoView:{
  color:"black",
  textAlign:"center",
  fontSize: 20,
  margin:5,
},
imageView:{
  height: 200,
  width: 200,
  alignSelf: "center",
  marginTop:40,
  marginBottom:10,
},
  linkView:{
    fontSize: 20,
  },
  backButton:{
    fontWeight:"bold",
    fontSize:30,
    borderRadius:20,
    borderWidth: 2,
    marginVertical:10,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#FF914D',
    borderColor:'#FF914D',
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    top: 10
  },
  backText:{
      fontSize:15,
      color:'white'
  }
})

export default AnnounceModal;