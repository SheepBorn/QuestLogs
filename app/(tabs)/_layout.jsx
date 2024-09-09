import { StyleSheet, Text, View } from 'react-native'
import {Tabs, Redirect} from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

const TabIcon = ({ icon, color, name, focused, size}) => {
    return (
        <View className="items-center justify-center">
            <Ionicons
                name={icon}
                color= {color}
                focused={focused}
                adjustsFontSizeToFit={true}
                size={size}
            />
            <Text style={{color:color}}>
            {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
      <Tabs
         screenOptions={{
          headerStyle: { backgroundColor: '#1E1E1E'},
          headerTintColor:'#BEBEBE',
          headerTitleAlign:'center',
          title:'Quest Logs',
            tabBarShowLabel:false,
            tabBarActiveTintColor:'#F5F5F5',
            tabBarInactiveTintColor:'grey',
            tabBarStyle: {
                backgroundColor:'#262424'
                }
         }}
         >
        <Tabs.Screen
          name= 'home'
          options={{
            tabBarIcon:({color, focused}) => (
                <TabIcon
                icon="home"
                name="Home"
                size={28}
                color= {color}
                focused={focused}
                />
            )
          }}
        />
        <Tabs.Screen
          name= 'settings'
          options={{
            title:'Settings',
            headerShown:false,
            tabBarIcon:({color, focused}) => (
                <TabIcon
                icon="settings"
                name="Settings"
                size={28}
                color= {color}
                focused={focused}
                />
            )
          }}
        />
       </Tabs>
  )
}

export default TabsLayout

