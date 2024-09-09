import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot,Stack } from 'expo-router'
import CustomButton from '../../components/CustomButton'

const CreateLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="create" 
        options={{
          headerStyle: { backgroundColor: '#1E1E1E'},
          headerTintColor:'#BEBEBE',
          headerTitleAlign:'center',
          title:'Create Habit',
        }}/>
    </Stack>
  )
}

export default CreateLayout
