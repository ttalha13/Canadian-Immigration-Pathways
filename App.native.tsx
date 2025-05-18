import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import HomePage from './src/pages/HomePage.native';
import LoginPage from './src/pages/LoginPage.native';
import ProvincePage from './src/pages/ProvincePage.native';
import ContactPage from './src/pages/ContactPage.native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <AuthProvider>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#ef4444',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen 
              name="Login" 
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Home" 
              component={HomePage}
              options={{ title: 'MyCIP' }}
            />
            <Stack.Screen 
              name="Province" 
              component={ProvincePage}
              options={({ route }) => ({ title: route.params?.name || 'Province' })}
            />
            <Stack.Screen 
              name="Contact" 
              component={ContactPage}
              options={{ title: 'Contact Us' }}
            />
          </Stack.Navigator>
        </AuthProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}