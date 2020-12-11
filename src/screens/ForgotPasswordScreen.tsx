import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },

  navigationBar: {
    height: 44,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },

  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 44 - 50,
  },
});

const ForgotPasswordScreen = () => (
  <SafeAreaView style={styles.container}>
    <View>
      <View style={styles.navigationBar}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          Login Help
        </Text>
      </View>
    </View>
    <View style={styles.centerContainer}>
      <View>
        <Text style={{ fontSize: 24 }}>Find your Account</Text>
      </View>
    </View>
  </SafeAreaView>
);

export default ForgotPasswordScreen;
