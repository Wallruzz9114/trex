import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT } from '../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: SCREEN_HEIGHT,
  },

  languageChooser: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnCurLanguage: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  curLanguage: {
    color: '#333',
  },

  centerContainer: {
    height: SCREEN_HEIGHT - 50 - 40 - STATUS_BAR_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoWrapper: {
    marginBottom: 20,
  },

  logo: {
    height: 64,
    overflow: 'hidden',
  },

  loginForm: {
    width: SCREEN_WIDTH * 0.9,
  },

  textInputWrapper: {
    position: 'relative',
    width: '100%',
    height: 44,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 7.5,
  },

  hidePasswordIcon: {
    position: 'absolute',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 5,
    top: (44 - 30) / 2,
  },

  input: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
  },

  btnLogin: {
    marginTop: 7.5,
    width: '100%',
    height: 44,
    borderRadius: 5,
    backgroundColor: '#318bfb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  otherOptionsWrapper: {
    width: SCREEN_WIDTH * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },

  forgotPassword: {
    width: SCREEN_WIDTH * 0.8,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  divideLine: {
    marginVertical: 10,
    position: 'relative',
    height: 2,
    width: '100%',
    backgroundColor: '#ddd',
  },

  ORtextWrapper: {
    width: 40,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    top: (2 - 20) / 2,
    left: (SCREEN_WIDTH * 0.9 - 40) / 2,
    position: 'absolute',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },

  btnLoginWithFacebook: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  registerWrapper: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
});

const setLoginPermission = (
  username: string,
  password: string,
  canLogin: React.Dispatch<React.SetStateAction<boolean>>
) => (username.length > 0 && password.length > 0 ? canLogin(true) : canLogin(false));

const LoginScreen = (): JSX.Element => {
  const [hidePassword, setHidePassword] = useState(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [allowLogin, setAllowLogin] = useState(false);

  const _togglePasswordVisibility = (): void => setHidePassword(!hidePassword);

  const _onChangeUsername = (input: string): void => {
    setLoginPermission(input, password, setAllowLogin);
    setUsername(input);
  };

  const _onChangePassword = (input: string): void => {
    setLoginPermission(username, input, setAllowLogin);
    setPassword(input);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.languageChooser}>
        <TouchableOpacity style={styles.btnCurLanguage}>
          <Text style={styles.curLanguage}>French (Canada)</Text>
          <Icon name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.logoWrapper}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
          />
        </View>
        <View style={styles.loginForm}>
          <View style={styles.textInputWrapper}>
            <TextInput
              value={username}
              onChangeText={_onChangeUsername}
              placeholder="Username"
              style={styles.input}
            />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              value={password}
              onChangeText={_onChangePassword}
              secureTextEntry={hidePassword}
              placeholder="Password"
              style={styles.input}
            />
            <TouchableOpacity style={styles.hidePasswordIcon} onPress={_togglePasswordVisibility}>
              {hidePassword ? (
                <Icon name="eye-off-outline" size={20} color="#333" />
              ) : (
                <Icon name="eye-outline" color="#318bfb" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={!allowLogin}
            activeOpacity={0.6}
            style={{
              ...styles.btnLogin,
              opacity: allowLogin ? 1 : 0.6,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                fontWeight: '500',
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherOptionsWrapper}>
          <TouchableOpacity style={styles.forgotPassword} activeOpacity={1}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '600',
              }}
            >
              <Text
                style={{
                  fontWeight: '500',
                  color: '#333',
                }}
              >
                Did your forget your login information?
              </Text>{' '}
              Get helping to login.
            </Text>
          </TouchableOpacity>
          <View style={styles.divideLine}>
            <View style={styles.ORtextWrapper}>
              <Text
                style={{
                  color: '#333',
                  fontWeight: '600',
                }}
              >
                OR
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.btnLoginWithFacebook}>
            <Icon name="facebook" color="#318bfb" size={20} />
            <Text
              style={{
                color: '#318bfb',
                fontWeight: 'bold',
              }}
            >
              Login with Facebook
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.registerWrapper}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 12,
            fontWeight: '600',
          }}
        >
          <Text
            style={{
              fontWeight: '500',
              color: '#333',
            }}
          >
            Don't have account?
          </Text>{' '}
          Register now.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
