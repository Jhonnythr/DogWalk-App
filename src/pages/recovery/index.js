import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "./style";
import firebase from "../../services/firebase";
import { Formik } from "formik";
import * as yup from "yup";

////////////////////
const recoveryValidationSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email inválido"),
});

export default function SignIn({navigation}) {
  

  function RecoveryFirebase(email) {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        // ..
        alert("Email de recuperação enviado");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
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
        <Text style={styles.message}>Recuperar senha</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Formik
          validateOnMount={true}
          validationSchema={recoveryValidationSchema}
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => RecoveryFirebase(values.email)}
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

              {/* botão para recuperar */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={!isValid || values.email === ""}
              >
                <Text style={styles.textButton}>Recuperar</Text>
              </TouchableOpacity>
              {/* botao para recuperar */}



              
              <TouchableOpacity
                style={styles.buttonRegister}
                 onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={styles.registerText}>Fazer Login</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </Animatable.View>
    </View>
  );
}
