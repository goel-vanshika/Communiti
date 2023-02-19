import { StyleSheet, Text, View, Image, Alert, Linking, Modal, Pressable, TouchableHighlight } from "react-native";
import Context from '../Context';
import {useState,useContext} from 'react';

const ClubModal = (props) =>{
  const [subscriptions,setSubscriptions]=useContext(Context).subscriptions;
  const [following,setFollow]=useState(false);
  const handleFollow=()=>{
    setFollow(prev=>!prev);
    setSubscriptions(prev=>({...prev, [props.data.name]:following}));
    Alert.alert('',!following?'Yayy, you are following '+props.data.name+'!':'Sad to see you go :(');
  };
  const handleLink=()=>{
    const url=props.data.social_links;
    Linking.openURL(url);
  };
  return(
  <Modal animationType='slide' visible={props.modalVisible} onRequestClose={()=>props.setModalVisibility(false)}>
    <Pressable style={styles.backButton} onPress={()=>props.setModalVisibility(false)}>
        <Text style={styles.backText}>Go back</Text>
    </Pressable>
    <TouchableHighlight onPress={handleFollow}>
        <View style={styles.button}>
          <Text style={{color:'white'}}>{following?'Unfollow':'Follow Us'}</Text>
        </View>
      </TouchableHighlight>
    <View style={styles.mainView}>
        <Image source={{uri: props.data.logo}} style={styles.imageView}></Image>
        <Text style={styles.titleView}>{props.data.name}</Text>
        <Text style={styles.title2View}>{props.data.tags}</Text>
        <Text style={styles.contentView}>{'About the Club'}</Text>
        <Text>{props.data.description}</Text>
        <View>
            <Text style={styles.membersView}>Club Head(s)</Text>
            <Text style={styles.infoView}>Name 1</Text>
            <Text style={styles.infoView}>Name 2</Text>
        </View>
        <Pressable onPress={handleLink} style={styles.linkButton}>
            <Text style={styles.linkText}>View Instagram Page</Text>
        </Pressable>
    </View>
   </Modal>
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
    fontSize: 20
  },
  membersView:{
    color:"#2999DB",
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
  },
  linkButton:{
    fontWeight:"bold",
    fontSize:18,
    borderRadius:20,
    borderWidth: 2,
    paddingVertical: 5,
    margin:10,
    paddingHorizontal: 10,
    backgroundColor: '#FF914D',
    borderColor:'#FF914D'
  },
  linkText:{
    fontWeight:"bold",
    fontSize:18,
    color:'white',
    alignSelf:'center'
  },
  button:{
    fontWeight:"bold",
    fontSize:30,
    borderRadius:20,
    borderWidth: 2,
    marginVertical:10,
    right: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#2999DB',
    borderColor:'#2999DB',
    position: 'absolute',
    top: 10,
    color:'white'
  }     
})

export default ClubModal;