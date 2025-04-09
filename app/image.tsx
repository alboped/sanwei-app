import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import PagerView from 'react-native-pager-view';

// export default function ImageScreen() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen name="settings" options={{ title: 'Settings' }} />
//       <Text>234</Text>
//       <View style={{flex: 1}}>
//         <PagerView style={styles.container} initialPage={0}>
//           <View style={styles.page} key="1">
//             <Text>First page</Text>
//             <Text>Swipe ➡️</Text>
//           </View>
//           <View style={styles.page} key="2">
//             <Text>Second page</Text>
//           </View>
//           <View style={styles.page} key="3">
//             <Text>Third page</Text>
//           </View>
//         </PagerView>
//       </View>
//     </Stack>
//   );
// }


export default function ImageScreen() {
  return (
    <View style={{flex: 1}}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <PagerView style={styles.container} initialPage={0}>
        <View style={styles.page} key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
