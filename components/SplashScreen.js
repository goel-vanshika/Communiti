import {View, Text, Pressable} from 'react-native';
import Video from 'react-native-video';
import {useContext} from 'react';
import Context from '../Context'

import video from '../assets/Communiti.mp4';

const SplashScreen=({route,navigation})=>{
    const contextObj=useContext(Context);
    return(
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff'}}>
            <Video source={video} paused={false} resizeMode="contain"
            style={{width: 350, height: 350}}
            onEnd={()=>contextObj.controlFlow[0](false)}/>
        </View>
    );
}

export default SplashScreen;