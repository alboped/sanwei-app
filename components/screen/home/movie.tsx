import { useMemo, useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getMovieHome, searchMovieList } from '@/service/movie';
import { movieItem, limitData } from '@/types';
import TopFun from './components/TopFun';

const topBarOptions = [{
  title: '找电影',
  icon: 'https://cdn-icons-png.flaticon.com/512/17692/17692304.png',
}, {
  title: '榜单',
  icon: 'https://cdn-icons-png.flaticon.com/512/17699/17699273.png',
}, {
  title: '即将上映',
  icon: 'https://cdn-icons-png.flaticon.com/512/17699/17699485.png',
}, {
  title: '片单',
  icon: 'https://cdn-icons-png.flaticon.com/512/17692/17692531.png',
}];

type movieDataType = {
  hot: movieItem[];
  cinemaHot: movieItem[];
}

export default function MovieScreen() {
  // 热门电影索引，0为影院热映，1为热门电影
  const [hotIndex, setHotIndex] = useState(0);
  // 热门电影
  const [movieData, setMovieData] = useState<movieDataType>({
    hot: [],
    cinemaHot: [],
  });
  const [movieList, setMovieList] = useState<movieItem[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getMovieHome();
      setMovieData(data.data);
    })();

    (async () => {
      const data = await searchMovieList();
      setMovieList(data.data.list);
    })();
  }, []);

  const renderHotList = useMemo(() => {
    const hotList = hotIndex === 0 ? movieData.hot : movieData.cinemaHot;
    return hotList.map((item, index) => (
      <TouchableOpacity key={`_${index}`} style={styles.hotItem}>
        <Image style={styles.hotItemPic} source={{ uri: item.poster }}/>
        <ThemedText style={styles.hotItemTitle} numberOfLines={1}>{item.title}</ThemedText>
        <ThemedText style={styles.hotItemScore}>豆（{item.score ?? '暂无'}）</ThemedText>
      </TouchableOpacity>
    ));
  }, [movieData, hotIndex]);

  const renderSearchMovieList = useMemo(() => {
    return movieList.map((item, index) => (
      <TouchableOpacity key={`_${index}`} style={styles.movieListItem}>
        <Image style={styles.movieItemPic} source={{ uri: item.poster }}/>
        <ThemedView style={styles.movieItemInfo}>
          <ThemedText style={styles.searchMovieTitle}>{item.title}</ThemedText>
          <ThemedText style={styles.searchMovieItemScore}>豆（{item.score ?? '暂无'}）</ThemedText>
          <ThemedText numberOfLines={2} style={styles.searchMovieItemSubtitle}>{item.subtitle}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
    ));
  }, [movieList]);

  return (
    <ScrollView>
      <TopFun options={topBarOptions} />
      <ThemedView style={styles.hotBar}>
        <ThemedText
          style={[styles.hotBarLabel, { color: hotIndex === 0 ? '#333' : '#999' }]}
          onPress={() => setHotIndex(0)}
        >
          影院热映
        </ThemedText>
        <ThemedView style={styles.labelDivide} />
        <ThemedText
          style={[styles.hotBarLabel, { color: hotIndex === 1 ? '#333' : '#999' }]}
          onPress={() => setHotIndex(1)}
        >
          热门电影
        </ThemedText>
        <ThemedView style={{ flex: 1 }} />
        <TouchableOpacity style={styles.hotMoreBtn}>
          <ThemedText style={styles.hotMoreText}>全部</ThemedText>
          <Entypo name="chevron-thin-right" />
        </TouchableOpacity>
      </ThemedView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hotView}
      >
        {renderHotList}
      </ScrollView>
      <ThemedText style={styles.searchMovieLabel}>找电影</ThemedText>
      {renderSearchMovieList}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hotBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 30,
  },
  hotBarLabel: {
    fontSize: 20,
    fontWeight: '500',
  },
  labelDivide: {
    width: 1,
    height: 16,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  hotView: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
  },
  hotItem: {
    marginRight: 10,
  },
  hotItemPic: {
    width: 118,
    height: 166,
    borderRadius: 6,
  },
  hotItemTitle: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    width: 118,
  },
  hotItemScore: {
    fontSize: 13,
    fontWeight: '500',
    color: '#f90',
    lineHeight: 22,
  },
  hotMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hotMoreText: {
    fontSize: 14,
  },
  searchMovieLabel: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30,
    marginLeft: 15,
  },
  movieListItem: {
    flexDirection: 'row',
    marginHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
  movieItemPic: {
    width: 80,
    height: 112,
    borderRadius: 6,
    marginRight: 15,
  },
  movieItemInfo: {
    flex: 1,
  },
  searchMovieTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  searchMovieItemScore: {
    fontSize: 14,
    fontWeight: '500',
    color: '#f90',
    lineHeight: 22,
  },
  searchMovieItemSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  }
});
