import { View, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TextInput } from 'react-native-paper';


export const QuestContainerBool = ({title,id, handlePress, isLoading}) => {
  return (
    <TouchableOpacity className="flex-row justify-between items-center bg-[#262424] p-3 rounded-lg">

      <Text className="text-white text-base">{title}</Text>
      
      <View className="flex-row">

        <TouchableOpacity>
          <Ionicons name="close" size={24} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity className="ml-10">
          <Ionicons name="checkmark" size={24} color="#00CFFF"/>
        </TouchableOpacity>

        <TouchableOpacity className="ml-10 mr-1.5">
          <Ionicons name="close" size={24} color="#777"/>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  )
}

export const QuestContainerNum = ({title, id, number='0', unit=''}) => {

  const [state, setState] = useState(0)

  const getColor = () => {
    switch (state){
      case 0:
      return 'black'
  
      case 1:
      return 'textcolor'
  
      case 2:
      return 'blue'
  
      default:
        return ''
    }
  }

  return (
    <TouchableOpacity className="flex-row justify-between items-center bg-[#262424] px-3 py-3 ">

      <Text className="text-white text-base">{title}</Text>
      
      <View className="flex-column justify-center">

          <TextInput
            className="items-center text-center bg-transparent text-textcolor w-8 h-12 max-h-12 px-1"
            placeholder={number}
            keyboardType='numeric'
            textColor='#BEBEBE'
            underlineColor='transparent'       
          />
          <Text className="text-center text-textcolor -mt-4">{unit}</Text>

        {/* <TouchableOpacity className="ml-5">
          <TextInput name="checkmark" size={24} color="#00CFFF"/>
        </TouchableOpacity>

        <TouchableOpacity className="ml-5 mr-1.5">
          <TextInput name="close" size={24} color="#777"/>
        </TouchableOpacity> */}

      </View>
    </TouchableOpacity>
  )
}