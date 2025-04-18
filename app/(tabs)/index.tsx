import { useState } from 'react';
import { Image, StyleSheet, Platform, Text, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MovieRoute from '@/components/screen/home/movie';
import AnimeRoute from '@/components/screen/home/anime';
import NovelRoute from '@/components/screen/home/novel';

const renderScene = SceneMap({
  movie: MovieRoute,
  anime: AnimeRoute,
  novel: NovelRoute,
});

const routes = [
  { key: 'movie', title: '电影' },
  { key: 'anime', title: '动漫' },
  { key: 'novel', title: '小说' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  
  return (
    <ThemedView style={[styles.container, { paddingTop: top }]}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/user')}>
          <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}} style={styles.photoIcon} />
        </TouchableOpacity>
        <TextInput style={styles.searchInput} />
        <TouchableOpacity onPress={() => router.push('/message')}>
          <Image source={require('@/assets/images/mail.png')} style={styles.messageIcon} />
        </TouchableOpacity>
      </ThemedView>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        animationEnabled={false}
        commonOptions={{
          label: ({ labelText, focused, color }) => (
            <Text style={{ color, fontSize: 14, fontWeight: focused ? 'bold' : '500' }}>{labelText}</Text>
          ),
        }}
        renderTabBar={props => <TabBar
          {...props}
          activeColor="#333"
          inactiveColor="#888"
          pressColor="transparent"
          gap={10}
          tabStyle={{ width: 50, height: 44}}
          indicatorStyle={{
            height: 3,
            backgroundColor: '#333',
            width: 30,
            marginLeft: 10,
            borderRadius: 2,
          }}
          indicatorContainerStyle={{
            padding: 20
          }}
          style={{
            backgroundColor: 'transparent',
            marginHorizontal: 16,
            elevation: 0,
          }}
        />}
      />
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
    paddingHorizontal: 18,
  },
  photoIcon: {
    height: 38,
    width: 38,
    borderRadius: 20,
  },
  messageIcon: {
    height: 30,
    width: 28,
    resizeMode: 'contain',
    opacity: 0.4,
  },
  searchInput: {
    height: 36,
    flex: 1,
    paddingHorizontal: 16,
    marginHorizontal: 15,
    borderRadius: 20,
    borderColor: '#ccc',
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
