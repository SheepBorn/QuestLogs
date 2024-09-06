import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native'
import { TextInput, Checkbox} from 'react-native-paper'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';


const InputField = ({ name, max, handleFocus, keyboard=true, edit=true, text, inputStyle='flex-1 bg-tertiary', viewStyle='flex-row items-center mb-5 bg-tertiary'}) => {
  return (
    <View className={`${viewStyle}`}>
      <TextInput
        theme={{roundness: 10}} 
        placeholder={name} 
        textColor='#BEBEBE'
        className={`${inputStyle}`}
        mode='outlined'
        activeOutlineColor='#FAFAFA'
        outlineColor ='#BBBBBB'
        label={name}
        multiline={true}
        maxLength={max}
        onFocus={handleFocus}
        showSoftInputOnFocus={keyboard}
        editable= {edit}
        value={text}
      />
    </View>
  )
}

const inputData= (inData, setter) => {
  setter(+inData)
}





const create = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [trackOption,setOption]=useState(0)
  const [trackData1,setData1]=useState(1)
  const [trackData2,setData2]=useState(3)
  const [trackData3,setData3]=useState(3)

  const getText = () => {
    switch (trackOption){
      case 0:
      return `Every ${trackData1} day`
  
      case 1:
      return `${trackData2} times a week`
  
      case 2:
      return `${trackData1} times a month`
  
      default:
        return ''
    }
  }
  const CheckBoxes = ({id,data,setter,text1,text2}) => {

    const [tempData,setTemp]=useState(0)
  
    return(
      <View className="flex-row items-center self-start pl-5 ">
        <Checkbox
          status={trackOption == id ? 'checked' : 'unchecked'}
          onPress={()=>setOption(id)}
        />
        {text1 ? <Text className="pr-2 text-textcolor">{text1} </Text> :''}
        <TextInput
        maxLength={2}
        defaultValue={`${data}`}
        keyboardType='numeric'
        onChangeText={text=>{setTemp(+text)}}
        onBlur={()=>inputData(tempData,setter)}
        textColor='#BEBEBE'
        className="text-center bg-primary"  
        />
        <Text className="pl-2 text-textcolor"> {text2}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView className= "bg-tertiary h-full px-4">
      <InputField name="Title" max={40}/>
      <InputField name="Description" max={300}/>
      <InputField name = "Frequency"
      text={getText()}
      keyboard={false}
      edit={!isModalVisible}
        handleFocus={()=>setIsModalVisible(true)}
      />
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
        <View className="absolute bg-tertiary inset-y-1/4 inset-x-5 justify-evenly items-center w-auto h-auto">
        <CheckBoxes
          id={0}
          data={trackData1}
          setter={setData1}
          text1="Every"
          text2="day"
        />
        <CheckBoxes
          id={1}
          data={trackData2}
          setter={setData2}
          text1=""
          text2="times a week"
        />
        <CheckBoxes
          id={2}
          data={trackData3}
          setter={setData3}
          text1=""
          text2="times a month"
        />
        </View>

      </TouchableWithoutFeedback>
      </Modal>
      <View className="flex-row items-center self-start ">
      <InputField name="Target" max={5} style='' viewStyle='flex-row items-center mb-5 bg-tertiary w-1/2 pr-4'/>
      <InputField name="Unit" max={5} style='' viewStyle='flex-row items-center mb-5 bg-tertiary w-1/2 pl-4'/>
      </View>
    </SafeAreaView>
  )
}

export default create