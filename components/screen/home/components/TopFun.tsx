import { useMemo, useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type option = {
  icon: string;
  title: string;
  onPress?: () => void;
}

type propsTypes = {
  options: option[] | [];
}

export default function TopFun(props: propsTypes) {
  const renderTopBar = useMemo(() => {
    return props.options.map((item, index) => {
      return (
        <TouchableOpacity key={index} style={styles.topBarItem}>
          <Image source={{ uri: item.icon }} style={styles.topBarIcon} />
          <ThemedText style={[styles.topBarLabel]}>{item.title}</ThemedText>
        </TouchableOpacity>
      );
    });
  }, []);

  return (
    <ThemedView style={styles.topBar}>
      {renderTopBar}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    gap: 15,
  },
  topBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    paddingTop: 4,
    borderColor: '#f1f1f1',
    borderWidth: 1,
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0,0,0,.06)',
  },
  topBarIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  topBarLabel: {
    fontSize: 10,
    color: '#666',
  },
});
