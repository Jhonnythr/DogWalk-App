import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "./styles";
import firebase from "../../services/firebase";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";

////////////////////

const loginValidationSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email inválido"),
  password: yup
    .string()
    .min(6, ({ min }) => `Mínimo de ${min} caracteres`)
    .required("Senha inválida"),
});

export default function SignIn({ navigation }) {
  

  function SignIn(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
       
      });
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem vindo(a)</Text>
      </Animatable.View>
      
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        {/* FORMIK */}

        <Formik
          validateOnMount={true}
          validationSchema={loginValidationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => SignIn(values.email, values.password)}
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



              {/* botão para login */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={!isValid || values.email === ""}
              >
                <Text style={styles.textButton}>Login</Text>
              </TouchableOpacity>
              
              {/* botão para login */}






              {/* botao para cadastro */}
              <TouchableOpacity
                style={styles.buttonRegister}
                onPress={() => navigation.push("SignUp")}
              >
                
                <Text style={styles.registerText}>Não tenho conta</Text>
              </TouchableOpacity>

              {/* botao para recuperar senha */}
              <TouchableOpacity
                style={styles.buttonRegister}
                onPress={() => navigation.push("Recovery")}
              >
                <Text style={styles.registerText}>Recuperar senha</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        {/* FORMIK */}
      </Animatable.View>
    </View>
  );
}
