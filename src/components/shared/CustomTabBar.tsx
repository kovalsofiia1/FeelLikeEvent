// components/CustomTabBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const CustomTabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'Головна', path: '/home' as const },
    { name: 'Події', path: '/events' as const },
    { name: 'Рекомендації', path: '/recommendations' as const },
    { name: 'Профіль', path: '/profile' as const },

  ];
  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.path}
          style={[
            styles.tab,
            pathname === tab.path && styles.activeTab,
          ]}
          onPress={() => router.push(tab.path as never)}
        >
          <Text
            style={[
              styles.tabText,
              pathname === tab.path && styles.activeTabText,
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007BFF',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default CustomTabBar;
