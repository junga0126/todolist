import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'
import Main from './Screens/Main';
import Make from './Screens/makeItem';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Main'
        screenOptions={{
          headerStyle:{backgroundColor:"#e1c657"},
          geaderTitleStyle:{fontWeight:"bold", color:'black'}
        }}
      >
        <Stack.Screen 
          name ="Main"
          component={Main}
          options = {{title:"Main Screen"}}
        />
        <Stack.Screen 
          name='Make'
          component={Make}
          options = {{title:"New Item"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}