import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, AlertButton, Animated, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import agent from '../api/agent';
import { CommonParams } from '../components/navigation';
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../constants';
import { RegisterRequest } from '../events/userActions';
import {
  RegisterFormInputFirstStep,
  RegisterFormInputSecondStep,
  RegisterFormInputThirdStep,
} from '../models/registerFormInputs';

export type WelcomeParams = RegisterFormInputFirstStep &
  RegisterFormInputSecondStep &
  RegisterFormInputThirdStep;

type WelcomeRouteProp = RouteProp<CommonParams, 'WelcomeScreen'>;
type WelcomeNavigationProp = StackNavigationProp<CommonParams, 'WelcomeScreen'>;

type WelcomeProps = {
  navigation: WelcomeNavigationProp;
  route: WelcomeRouteProp;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },

  centerContainer: {
    width: '100%',
    height: SCREEN_HEIGHT - STATUS_BAR_HEIGHT - 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  bottomInfo: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  btnNext: {
    width: SCREEN_WIDTH * 0.9,
    height: 46,
    backgroundColor: '#318bfb',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 5,
  },

  loadingWrapper: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 99,
  },

  loading: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  usernameInputWrapper: {
    height: 44,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: 'rgb(242,242,242)',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#ddd',
    borderWidth: 1,
    marginTop: 10,
  },

  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    paddingRight: 44 + 15,
  },

  validIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 44,
    top: 0,
    right: 0,
  },
});

const WelcomeScreen = ({ navigation, route }: WelcomeProps) => {
  const dispatch = useDispatch();
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [usernameChanging, setUsernameChanging] = useState<boolean>(false);
  const [username, setUsername] = useState(route.params.email.split('@')[0]);
  const _loadingDegree = new Animated.Value(0);
  const [loading, setLoading] = useState<boolean>(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const usernameFromEmail = route.params.email.split('@')[0];
    checkUsername(usernameFromEmail, setUsernameError, setUsernameChanging);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const _animationLoadingDegree = () => {
    Animated.timing(_loadingDegree, {
      useNativeDriver: true,
      toValue: 1,
      duration: 400,
    }).start(() => {
      _loadingDegree.setValue(0);

      if (loading) _animationLoadingDegree();
    });
  };

  const _validateUsername = (username: string) => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      checkUsername(username, setUsernameError);
    }, 200);
  };

  const _register = async () => {
    if (usernameError) return;

    setLoading(true);
    await dispatch(RegisterRequest({ ...route.params, username }));
    setLoading(false);
  };

  const _onChangeUsernameInput = (): void => setUsernameChanging(true);

  const checkUsername = async (
    username: string,
    setUsernameError: React.Dispatch<React.SetStateAction<boolean>>,
    setChagingUsername?: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const pattern = /^[a-zA-Z0-9._]{4,}$/g;
    if (!pattern.test(username)) return setUsernameError(true);

    const isUnique = await agent.Users.isUnique(username);

    if (!isUnique) {
      setUsernameError(true);

      if (setChagingUsername) {
        const buttonGroup: AlertButton[] = [
          { text: 'Choose another username', onPress: () => setChagingUsername(true) },
        ];

        Alert.alert('Username is already in use', 'Try to use another username', buttonGroup);
      } else {
        setUsernameError(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingWrapper}>
          <View style={styles.loading}>
            <Animated.Image
              onLayout={_animationLoadingDegree}
              style={{
                width: 30,
                height: 30,
                marginRight: 10,
                transform: [
                  {
                    rotate: _loadingDegree.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              }}
              source={require('../assets/icons/waiting.png')}
            />
            <Text style={{ fontWeight: '500' }}></Text>
          </View>
        </View>
      )}
      <View style={styles.centerContainer}>
        <View>
          <Text style={{ fontWeight: '600', textAlign: 'center' }}>
            {!usernameChanging ? 'CHANGE USERNAME' : 'WELCOME TO TREX'}
          </Text>
          {!usernameChanging && (
            <Text style={{ fontWeight: '600', textAlign: 'center' }}>@{username}</Text>
          )}
          <View style={{ marginVertical: 10, width: SCREEN_WIDTH * 0.8 }}>
            {!usernameChanging && (
              <Text style={{ color: '#666', textAlign: 'center' }}>
                Find people to follow and start sharing photos.
              </Text>
            )}
          </View>
        </View>
        {!usernameChanging && (
          <>
            {' '}
            <View style={styles.usernameInputWrapper}>
              <TextInput
                autoCapitalize="none"
                onChangeText={(input) => {
                  setUsername(input.toLowerCase());
                  _validateUsername(input.toLowerCase());
                }}
                value={username}
                style={styles.input}
              ></TextInput>
              <View style={styles.validIcon}>
                {usernameError ? (
                  <Text style={{ color: 'red' }}>x</Text>
                ) : (
                  <Text style={{ color: 'green' }}>✓</Text>
                )}
              </View>
            </View>
            {usernameError && (
              <Text
                style={{
                  width: SCREEN_WIDTH * 0.9,
                  color: 'red',
                  marginVertical: 3,
                }}
              >
                You can't not use this username.
              </Text>
            )}
          </>
        )}
        <TouchableOpacity onPress={_register} activeOpacity={0.8} style={styles.btnNext}>
          <Text style={{ fontWeight: '600', color: '#fff' }}>Next</Text>
        </TouchableOpacity>
        {!usernameChanging && (
          <TouchableOpacity onPress={_onChangeUsernameInput} activeOpacity={0.8}>
            <Text
              style={{
                fontWeight: '600',
                color: '#318bfb',
              }}
            >
              Change username
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.bottomInfo}>
        <Text style={{ fontSize: 12, fontWeight: '500', color: '#666' }}>
          By clicking Next, you agree to our{' '}
          <Text style={{ color: '#000' }}>Terms, Data Policy and Cookies Policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
