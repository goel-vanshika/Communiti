import {View, Text, Linking, Image, Button} from 'react-native';

const Club=({route,navigation})=>{
    const props=route.params;
    return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={{uri: 'https://reactjs.org/logo-og.png'}} style={{width: 400, height: 400}}/>
        <Text>Name: {props.name}</Text>
        <Text>Tags/ Domains: {props.tags}</Text>
        <Text>Heads: {props.heads}</Text>
        <Button title="View Instagram page" onPress={()=>Linking.openURL('https://clubs.pes.edu/')}/>
        <Button title="Go back" onPress={()=>navigation.goBack()}/>
    </View>
    );
}

export default Club;