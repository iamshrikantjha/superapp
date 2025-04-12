import { ChatBotComponent } from '@/components/ChatBotComponent';
import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white'
    }}>
      <ChatBotComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  
});
