import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, login, register, resetUserExists } from "../../redux/slice/authSlice";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import CheckUserForm from "../../ui/CheckUserForm";
import LoginForm from "../../ui/LoginForm";
import RegisterForm from "../../ui/RegisterForm";

const AuthScreen = () => {
  const emailOrUsername = useRef("");
  const emailLogin = useRef("");
  const passwordLogin = useRef("");
  const emailRegister = useRef("");
  const usernameRegister = useRef("");
  const passwordRegister = useRef("");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userExists = useSelector((state) => state.auth.userExists);
  const [currentForm, setCurrentForm] = useState("check");

  const handleSubmit = () => {
    dispatch(checkUser(emailOrUsername.current));
  };

  const handleLogin = async () => {
    try {
      const userData = {
        email_or_username: emailLogin.current,
        password: passwordLogin.current,
      };
      await dispatch(login(userData)).unwrap();
      navigation.navigate("MainTabs");
      setCurrentForm("check");
      dispatch(resetUserExists());
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const userData = {
        email: emailRegister.current,
        username: usernameRegister.current,
        password: passwordRegister.current,
      };
      await dispatch(register(userData)).unwrap();
      navigation.navigate("MainTabs");
      setCurrentForm("check");
      dispatch(resetUserExists());
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleBack = () => {
    setCurrentForm("check");
    dispatch(resetUserExists());
  };

  useEffect(() => {
    if (userExists !== null) {
      if (userExists) {
        setCurrentForm("login");
        emailLogin.current = emailOrUsername.current;
      } else {
        setCurrentForm("register");
        if (emailOrUsername.current.includes("@")) {
          emailRegister.current = emailOrUsername.current;
        } else {
          usernameRegister.current = emailOrUsername.current;
        }
      }
    }
  }, [userExists]);

  return (
    <View style={styles.container}>
      <FontAwesome name="telegram" size={100} style={styles.logo} />
      <Text style={styles.title}>Welcome to E-Chat!</Text>
      <Text style={styles.subtitle}>Please sign in or register to continue.</Text>

      {currentForm === "check" && (<CheckUserForm 
        onPress={handleSubmit} 
        inputRef={emailOrUsername} 
      />)}

      {currentForm === "login" && (<LoginForm
        onLogin={handleLogin} 
        onBack={handleBack}
        emailRef={emailLogin}
        passwordRef={passwordLogin}
      />)}

      {currentForm === "register" && (<RegisterForm
        onRegister={handleRegister}
        onBack={handleBack}
        emailRef={emailRegister}
        usernameRef={usernameRegister}
        passwordRef={passwordRegister}
      />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
});

export default AuthScreen;
