import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar backgroundColor='#262424' style='light' />
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className="w-full justify-center items-center h-full px-4">
          <CustomButton title = "Continue as Guest"
            handlePress={()=>router.replace('/home')}
          containerStyles="w-full mt-7"  
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}