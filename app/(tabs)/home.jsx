import { View, Text, Modal,TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import {QuestContainerBool, QuestContainerNum} from '../../components/Quests';
import {SQLiteProvider, useSQLiteContext} from 'expo-sqlite'



const getMonthName = (date) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  return monthNames[date.getMonth()]
}

const getDayName = (date) =>{
  const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return daysOfWeek[date.getDay()]
}

const getDate = (days) =>{
  const today = new Date();
  const date=[];
  const pastDate = new Date()
  pastDate.setDate(today.getDate() - days + 1)
  const day = pastDate.getDate()
  const month = pastDate.getMonth() + 1
  
  return getDayName(pastDate)+"\n"+day+"\n"+getMonthName(pastDate)
}

async function initDatabase(db){
  try{
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS quests (
              quest_id INTEGER PRIMARY KEY AUTOINCREMENT, 
              title VARCHAR(255), 
              description VARCHAR(255), 
              frequency VARCHAR(255), 
              unit VARCHAR(255), 
              target FLOAT
              );
      CREATE TABLE IF NOT EXISTS data (
              data_id INTEGER PRIMARY KEY AUTOINCREMENT, 
              quest_id INTEGER REFERENCES quests(quest_id), 
              data VARCHAR(255), 
              value VARCHAR(255)
              );
      INSERT INTO quests (title) VALUES ('test2');
      `);
      console.log('Database initialised')
    } catch(error){
      console.log('error database init',error)
    }
}

const Content = () => {
  const db = useSQLiteContext();
  const [quests, setQuests] = useState([]);
  console.log(quests)

  const getQuests = async () => {
    try {
      const allRows = await db.getAllAsync('SELECT * FROM quests');
      setQuests(allRows)
    } catch (error){
      console.log('Error loading quests', error)
    }
  }

  useEffect(()=>{
    getQuests();
  }, []);

  return (
    <View>
      {quests.length === 0? 
        '':(
        <View>
          {quests.map((quest,index) => (
            <View key={index}>
            {quest.unit == null ?
              (<QuestContainerBool title={quest.title} handlePress={()=>{title='weird'}}></QuestContainerBool>)
              :
              (<QuestContainerNum title={quest.title} unit={quest.unit}></QuestContainerNum>)
            }
            </View>
          ))}
        </View>
          )

      }
      </View>

  )
}

function setData(quest_id,db,value){

  const getData = async () => {
    try {
      date = new DATE()
      currDate=date.getData()
      const allRows = await db.getAllAsync(`SELECT * FROM data WHERE data = ${currDate}`)
      for(var i=0; i <allRows.length; i++){
        if(allRows[i].quest_id == quest_id){
          await db.execAsync(`
            PRAGMA journal_mode = WAL;
            DELETE FROM data WHERE quest_id = ${quest_id} AND
            data= ${currDate}
                    );`)
            return true;
        }
      }
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        INSERT INTO data (quest_id, data, value)
        VALUES (${quest_id},${currDate},${value})
                );`)
    } catch (error){
      console.log('Error loading quests', error)
      return false;
    }
    return false;
  }

  useEffect(()=>{
    getQuests();
  }, []);
}
// const firstRow = await db.getFirstAsync('SELECT * FROM test');
// console.log(firstRow.id, firstRow.value, firstRow.intValue);

  
const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView className= "bg-primary h-full">
    <View className="flex-row justify-end pr-4">
    {/* <Text className="text-center text-textcolor ml-10"> {getDate(3)}</Text>
    <Text className="text-center text-textcolor ml-10"> {getDate(2)}</Text> */}
    <Text className="text-center text-textcolor ml-10"> {getDate(1)}</Text>
    </View>
    <SQLiteProvider databaseName='quests.db' onInit={initDatabase}>
    <Content></Content>
    </SQLiteProvider>

    <View>
    </View>

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
            handlePress={()=>{setIsModalVisible(false); router.navigate({pathname:'/create', params:{item:0}})}}
          containerStyles="w-2/3 rounded-xl min-h-[62px] mt-7"  
          />
          <CustomButton title = "Measurable"
            handlePress={()=>{setIsModalVisible(false); router.navigate({pathname:'/create', params:{item:1}})}}
          containerStyles="w-2/3 rounded-xl min-h-[62px] mt-7"  
          />
        </View>

      </TouchableWithoutFeedback>
      
      
      </Modal>
        <View className="absolute bottom-4 right-4">
      
        <AntDesign.Button name="pluscircle" size={48} color="#444444" backgroundColor="#1e1e1e"
        className="justify-right" onPress={()=>setIsModalVisible(true)} />
      
      
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>

  )
}

export default Home