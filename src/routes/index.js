import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import MyAccount from "../pages/MyAccount";
import SignUp from "../pages/SignUp";
import Recovery from "../pages/recovery";
import firebase from "../services/firebase";
import showAvaible from "../pages/showAvaible";
import { AuthContext } from "./context";



const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Welcome"
      component={Welcome}
      options={{ headerShown: false }}
    />

    <AuthStack.Screen
      name="SignIn"
      component={SignIn}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUp}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Recovery"
      component={Recovery}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <HomeStack.Screen
      name="showAvaible"
      component={showAvaible}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator>
    <SearchStack.Screen
      name="MyAccount"
      component={MyAccount}
      options={{ headerShown: false }}
    />
  </SearchStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    {/* home que vem de HomeStackScreen */}
    <Tabs.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="blind" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
    {/* MyAccount que vem de SearchStackScreen */}
    <Tabs.Screen
      name="MyAccount"
      component={SearchStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="paw" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
  </Tabs.Navigator>
);

const RootStack = createStackNavigator();

const RootStackScreen = ({ userAuth }) => (
  <RootStack.Navigator  options={{ headerShown: false }}>
    {userAuth ? (
      <RootStack.Screen
        name="App"
        component={TabsScreen}
        options={{ animationEnabled: false,headerShown: false }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{ animationEnabled: false, headerShown: false }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [userToken, setUserToken] = React.useState(null);
  const [userAuth, setUserAuth] = React.useState(null);
  const [userUid, setUserUid] = React.useState(null);

  function observer() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log(`user esta logado:${uid}`);
        setUserAuth(true);
        setUserUid(uid)
        // ...
      } else {
        // User is signed out
        // ...
        console.log(`deslogado`);
      }
    });
  }

  const authContext = React.useMemo(() => {
    return {
      signIn: () => {
        setUserToken("asdf");
      },
      signUp: () => {
        setUserToken("asdf");
      },
      signOut: () => {
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    observer();
  }, []);

  return (

    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      <RootStackScreen userAuth={userAuth} userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const HomeStack = createStackNavigator();

// const HomeStackScreen = () => (
//   <HomeStack.Navigator>
//     <HomeStack.Screen
//       name="Walker"
//       component={Home}
//       options={{ headerShown: false }}
//     />
//     <HomeStack.Screen name="MyAccount" component={MyAccount} />
//   </HomeStack.Navigator>
// );

// const TabsScreen = () => (
//   <Tab.Navigator>
//     <Tab.Screen
//       name="Walkers"
//       component={HomeStackScreen}
//       options={{
//         tabBarIcon: ({ color, size }) => (
//           <Icon name="blind" color={color} size={size} />
//         ),
//         headerShown: false,
//       }}
//     />
//     <Tab.Screen
//       name="MyAccount"
//       component={MyAccount}
//       options={{
//         tabBarIcon: ({ color, size }) => (
//           <Icon name="paw" color={color} size={size} />
//         ),
//         headerShown: false,
//       }}
//     />
//   </Tab.Navigator>
// );

// const AuthStackScreen = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Welcome"
//       component={Welcome}
//       options={{ headerShown: false }}
//     />

//     <Stack.Screen
//       name="SignIn"
//       component={SignIn}
//       options={{ headerShown: false }}
//     />

//     <Stack.Screen
//       name="Home"
//       component={Home}
//       options={{ headerShown: false }}
//     />

//     <Stack.Screen
//       name="SignUp"
//       component={SignUp}
//       options={{ headerShown: false }}
//     />
//     <Stack.Screen
//       name="Recovery"
//       component={Recovery}
//       options={{ headerShown: false }}
//     />
//   </Stack.Navigator>
// );

// const RootStack = createStackNavigator();

// const RootStackScreen = ({ userAuth }) => (
//   <RootStack.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}
//   >
//     {userAuth ? (
//       <RootStack.Screen
//         name="App"
//         component={TabsScreen}
//         options={{
//           animationEnabled: false,
//         }}
//       />
//     ) : (
//       <RootStack.Screen
//         name="Auth"
//         component={AuthStackScreen}
//         options={{
//           animationEnabled: false,
//         }}
//       />
//     )}
//   </RootStack.Navigator>
// );

// export default () => {
//   const [userAuth, setUserAuth] = React.useState(null);
//   const [userToken, setUserToken] = React.useState(null);

//   function observer() {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/firebase.User
//         var uid = user.uid;
//         console.log(`user esta logado:${uid}`);
//         setUserAuth(true);
//         // ...
//       } else {
//         // User is signed out
//         // ...
//         console.log(`deslogado`);
//       }
//     });
//   }
//   const authContext = React.useMemo(() => {
//     return {
//       signIn: () => {
//         setUserToken("asdf");
//       },
//       signUp: () => {
//         setUserToken("asdf");
//       },
//       signOut: () => {
//         setUserToken(null);
//       },
//     };
//   }, []);
//   React.useEffect(() => {
//     observer();
//   }, []);

//   return (
//     <AuthContext.Provider value={authContext}>
//       <RootStackScreen userAuth={userAuth} userToken={userToken} />
//     </AuthContext.Provider>
//   );
// };
