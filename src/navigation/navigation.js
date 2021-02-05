import React from 'react'
import { Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home, SignIn, SignUp, SplashScreen, UserDetail, Requests ,AllUsers, Account} from '../component'
import Icon from 'react-native-vector-icons/Ionicons'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerNav() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Requests" component={Requests} />
            <Drawer.Screen name="View All Users" component={AllUsers} />
            <Drawer.Screen name="Account" component={Account} />
        </Drawer.Navigator>
    )
}

export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" >
                <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
                <Stack.Screen name="SignIn" component={SignIn}
                    options={{
                        title: 'BrandName',
                        headerLeft: null,
                        headerShown: false,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen
                    name="Home"
                    component={DrawerNav}
                    options={{
                        title: 'BrandName',
                        headerLeft: null,
                        headerTitle: (props) => (
                            <Image
                                style={{ width: 250, height: 70 }}
                                source={require("../images/logo.png")}
                                resizeMode='contain'
                            />
                        ),
                        headerStyle: {
                            backgroundColor: '#541328',
                            // visible: false,
                        },
                        headerLeft: () => (
                            <Icon name="md-menu" size={40} style={{color:"#fff"}}/>
                            // <Button
                            //   onPress={() => <Spinner />}
                            //   title="LogOut"
                            //   color="#541328"
                            // />
                          ),
                    }}
                />
                <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
                <Stack.Screen name="Detail" component={UserDetail} />
                <Stack.Screen
                    name="*"
                    component={() => <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text style={{ fontSize: 20 }}>404 Not Found</Text></View>}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
