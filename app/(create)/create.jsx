import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, Platform, PermissionsAndroid } from 'react-native'
import { TextInput, Checkbox} from 'react-native-paper'
import React, {useRef} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import CustomButton from '../../components/CustomButton';
import { Stack, useLocalSearchParams } from 'expo-router';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import {SQLiteProvider, useSQLiteContext} from 'expo-sqlite'


const checkPermissions = async () => {
  const { status: foregroundStatus } = await Location.getForegroundPermissionsAsync();
  if (foregroundStatus !== 'granted') {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Foreground location permission denied');
      return;
    }
  }

  if (Platform.OS === 'android') {
    const { status: bgStatus } = await Location.getBackgroundPermissionsAsync();
    if (bgStatus !== 'granted') {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Background location permission denied');
        return;
      }
    }
  }
};

const InputField = ({ name, max,setter, handleFocus, keyboard=true, edit=true, textInput, inputStyle='flex-1 bg-tertiary', viewStyle='flex-row items-center mb-5 bg-tertiary'}) => {

  const [input, setInput] = useState('')

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
        value={`${textInput? textInput : input}`}
        onChangeText={(text)=>{textInput? '':setInput(text)}}
        onBlur={()=>{setter(input)}}
      />
    </View>
  )
}

const inputData= (inData, setter) => {
  setter(+inData)
}


const create = () => {
  const {item}=useLocalSearchParams()

  const [FreqModalVisible, setFreqModalVisible] = useState(false)
  const [MapModalVisible, setMapModalVisible] = useState(false)
  const [trackOption,setOption]=useState(0)
  const [trackData1,setData1]=useState(1)
  const [trackData2,setData2]=useState(3)
  const [trackData3,setData3]=useState(3)
  const [isSaving, setSaving] = useState(false)


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [target, setTarget] = useState('');
  const [freq, setFreq] = useState('1/1');

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

  function convertFreq(){
    switch (trackOption){
      case 0:
      return setFreq(`${trackData1}/1`)
  
      case 1:
      return setFreq(`${trackData2}/7`)
  
      case 2:
      return setFreq(`${trackData3}/30`)
  
      default:
        return ''
    }
  }
  async function handleCreate(db){
    try{
      await db.execAsync('INSERT INTO quests (title,description,frequency,unit,target) VALUES (?,?,?,?,?)',[title,description,freq,unit,target]);
        console.log(title,description,freq,unit,target)
      } catch(error){
        console.log('error data',error)
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

  checkPermissions();

  return (
    
    <SafeAreaView className= "bg-tertiary h-full px-4">
      <InputField name="Title" setter={setTitle} max={40}/>
      <InputField name="Description" setter={setDescription} max={300}/>
      <InputField name = "Frequency"
      textInput={getText()}
      keyboard={false}
      edit={!FreqModalVisible}
        handleFocus={()=>setFreqModalVisible(true)}
      />
      <Modal
      visible={FreqModalVisible}
      onRequestClose={()=>{setFreqModalVisible(false) 
        convertFreq()}}
      transparent={true}
      animationType='fade'
      className="w-full justify-center items-center h-full px-4"
      >
      <View>
      <TouchableOpacity
      activeOpacity={0.5}
      onPress={()=>{setFreqModalVisible(false)
        convertFreq()}}

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
      {item == 1? 
        <View className="flex-row items-center self-start ">
      <InputField name="Target" max={5} style='' setter={setTarget} viewStyle='flex-row items-center mb-10 bg-tertiary w-1/2 pr-4'/>
      <InputField name="Unit" max={5} style='' setter={setUnit} viewStyle='flex-row items-center mb-10 bg-tertiary w-1/2 pl-4'/>
      </View>:<CustomButton
        title='Set Location'
        containerStyles='min-h-[48px] min-w-[64px] rounded-md'
        handlePress={()=>setMapModalVisible(true)}

      />}
      <Modal
      visible={MapModalVisible}
      onRequestClose={()=>setMapModalVisible(false)}
      transparent={true}
      animationType='slide'
      className="w-full justify-center items-center h-full px-4"
      >
      <MapView
        className="w-full h-full"
        provider='google'
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={this.state}
      />
      </Modal>
      
      <CustomButton
              title='save'
              containerStyles='min-h-[48px] min-w-[64px] rounded-md'
              handlePress={()=>setSaving(true)}
            />
      {/* {isSaving? <SQLiteProvider databaseName='quests.db' onInit={handleCreate} />:''} */}

    </SafeAreaView>
  )
}

export default create