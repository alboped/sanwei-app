import { Image, StyleSheet, Platform, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { TabView, SceneMap } from 'react-native-pager-view';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
// });

const routes = [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  
  return (
    <ThemedView style={[styles.container, { paddingTop: top }]}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/user')}>
          <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}} style={styles.photoIcon} />
        </TouchableOpacity>
        <TextInput style={styles.searchInput} />
        <TouchableOpacity onPress={() => router.push('/message')}>
          <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/14808/14808921.png"}} style={styles.messageIcon} />
        </TouchableOpacity>
      </ThemedView>
      <ThemedText>1234</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f5f5f5',
    paddingHorizontal: 18,
  },
  photoIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  messageIcon: {
    height: 40,
    width: 32,
    resizeMode: 'contain'
  },
  searchInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 16,
    marginHorizontal: 15,
    borderRadius: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
