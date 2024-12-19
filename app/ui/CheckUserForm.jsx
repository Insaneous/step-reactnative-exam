import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const CheckUserForm = ({ onPress, inputRef }) => {

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Email or Username"
        onChangeText={(text) => (inputRef.current = text)}
      />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Next</Text>
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CheckUserForm;