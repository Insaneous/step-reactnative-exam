import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const RegisterForm = ({ onRegister, onBack, emailRef, usernameRef, passwordRef }) => {

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        defaultValue={emailRef.current}
        onChangeText={(text) => (emailRef.current = text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        defaultValue={usernameRef.current}
        onChangeText={(text) => (usernameRef.current = text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => (passwordRef.current = text)}
      />
      <TouchableOpacity style={styles.button} onPress={onRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#007bff",
    borderRadius: 8,
    marginBottom: 10,
  },
  backButton: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    backgroundColor: "#666",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegisterForm;