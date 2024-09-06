import { View, Text, Modal,TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import CustomButton from '../../components/CustomButton';


const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (

    <SafeAreaView className= "bg-primary h-full">
    <Modal
      visible={isModalVisible}
      onRequestClose={()=>setIsModalVisible(false)}
      transparent={true}
      animationType='fade'
      className="w-full justify-center items-center h-full px-4"
      >
      <View>
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={()=>setIsModalVisible(false)}
      className="w-full h-full justify-center items-center bg-black opacity-50"
      >
        
      </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback>
        <View className="absolute inset-y-1/4 inset-x-5 justify-evenly items-center w-auto h-auto">
     
        <CustomButton title = "Yes or No"
            handlePress={()=>{setIsModalVisible(false); router.push('/create')}}
          containerStyles="w-2/3 mt-7"  
          />
          <CustomButton title = "Measurable"
            handlePress={()=>{setIsModalVisible(false); router.push('/create')}}
          containerStyles="w-2/3 mt-7"  
          />
        </View>

      </TouchableWithoutFeedback>
      
      
      </Modal>
        <View className="absolute bottom-4 right-4">
      
        <AntDesign.Button name="pluscircle" size={48} color="#444444" backgroundColor="#1e1e1e"
        className="justify-right" onPress={()=>setIsModalVisible(true)} />
      
      
      </View>
    </SafeAreaView>
    
  )
}

export default Home