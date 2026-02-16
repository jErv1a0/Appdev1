import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

const LoginScreen = ({ navigation, onLogin, onNavigate } = {}) => {
  const [email, setEmail] = useState('jervinealvarico@gmail.com')
  const [password, setPassword] = useState('jerv123')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    setError(null)

    // Missing input
    if (!email || !password) {
      setError('Please type your password and email')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {

      await new Promise((resolve) => setTimeout(resolve, 800))

      if (onLogin && typeof onLogin === 'function') {
        const res = await onLogin({ email, password })

        if (res === false) {
          setError('Incorrect credentials')
          return
        }

        if (res && typeof res === 'object') {
          if (res.success === false) {
            setError(res.message || 'Incorrect credentials')
            return
          }
          if (res.error) {
            setError(res.error)
            return
          }
        }

        Alert.alert('Login Successful', `Welcome back, ${email}`)
        return
      }

      if (email === 'jervinealvarico@gmail.com' && password === 'jerv123') {
        Alert.alert('Login Successful', `Welcome back, ${email}`)
      } else {
        setError('Incorrect credentials')
      }
    } catch (e) {
      const message = (e && e.message) || 'Login failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = () => {
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('ForgotPassword')
      return
    }
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate('ForgotPassword')
    } else {
      Alert.alert('Forgot password', 'Forgot password tapped')
    }
  }

  const handleSignup = () => {
    if (navigation && typeof navigation.navigate === 'function') {
      navigation.navigate('SignUp')
      return
    }
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate('SignUp')
    } else {
      Alert.alert('Sign up', 'Sign up tapped')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in screen</Text>

      <View style={styles.preview}>
        <Text style={styles.previewLabel}>Preview</Text>
        <Text style={styles.previewText}>Email: {email || '(empty)'}</Text>
        <Text style={styles.previewText}>Password: {password ? '*'.repeat(password.length) : '(empty)'}</Text>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(t) => setEmail(t)}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(t) => setPassword(t)}
          editable={!loading}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((s) => !s)}
          disabled={loading}
          style={styles.eyeButton}
        >
          <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginBottom: 12 }}>
        <TouchableOpacity onPress={handleForgot} disabled={loading}>
          <Text style={{ color: '#007AFF' }}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={{ backgroundColor: '#007AFF', paddingVertical: 12, borderRadius: 6, alignItems: 'center' }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Log in</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
        <Text style={{ color: '#333' }}>Don’t have an account?</Text>
        <TouchableOpacity onPress={handleSignup} disabled={loading} style={{ marginLeft: 6 }}>
          <Text style={{ color: '#007AFF', fontWeight: '600' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12
  },
  button: {
    marginTop: 12
  }
  ,preview: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 12
  },
  previewLabel: {
    fontWeight: '600',
    marginBottom: 6
  },
  previewText: {
    color: '#333'
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  passwordInput: {
    flex: 1,
    marginRight: 8
  },
  eyeButton: {
    paddingVertical: 8,
    paddingHorizontal: 8
  },
  eyeText: {
    color: '#007AFF',
    fontWeight: '600'
  }
})

export default LoginScreen
