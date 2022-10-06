import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "./style";
import firebase from "../../services/firebase";
import { Formik } from "formik";
import * as yup from "yup";

////////////////////

const signUpValidationSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email inválido"),
  password: yup
    .string()
    .min(6, ({ min }) => `Mínimo de ${min} caracteres`)
    .required("Senha inválida"),
});

export default function SignIn({ navigation }) {
  function SignUp(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("criei no banco");
        navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        // ..
      });
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Cadastro</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        {/* FORMIK */}

        <Formik
          validateOnMount={true}
          validationSchema={signUpValidationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => SignUp(values.email, values.password)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              {/* Input para email */}
              <Text style={styles.title}>Email</Text>
              <TextInput
                name="email"
                placeholder="Digite um email"
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              {/* Input para email */}

              {/* Input para senha */}
              <Text style={styles.title}>Senha</Text>
              <TextInput
                name="password"
                placeholder="Digite sua senha"
                style={styles.input}
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              {/* Input para senha */}

              {/* botão para cadastro */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={!isValid || values.email === ""}
              >
                <Text style={styles.textButton}>Cadastrar</Text>
              </TouchableOpacity>
              {/* botão para cadastro */}
              <TouchableOpacity
                style={styles.buttonRegister}
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={styles.registerText}>Fazer Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        {/* FORMIK */}
      </Animatable.View>
    </View>
  );
}
