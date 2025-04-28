import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpense from './screens/ManageExpense';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expense_context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => <IconButton iconName='add' size={24} color={tintColor}
          onPress={() => {
            navigation.navigate('ManageExpense');
          }}
        />
      })}>
      <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses}
        options={
          {
            tabBarLabel: 'Recent',
            title: 'Recent Expenses',
            tabBarIcon: ({ color, size }) => <Ionicons name='timer' size={size} color={color} />,
          }
        }></BottomTabs.Screen>
      <BottomTabs.Screen name='AllExpenses' component={AllExpenses}
        options={{
          tabBarLabel: 'All Expenses',
          title: 'All Expenses',
          tabBarIcon: ({ color, size }) => <Ionicons name='wallet' size={size} color={color} />,
        }}></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style='inverted' />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={
              {
                headerStyle: { backgroundColor: GlobalStyles.colors.primary700, },
                headerTintColor: 'white',
              }
            }>
            <Stack.Screen name='ExpensesOverview' component={ExpensesOverview}
              options={{ headerShown: false, }}
            ></Stack.Screen>
            <Stack.Screen name='ManageExpense' component={ManageExpense}
              options={
                {
                  presentation: 'modal',
                }
              }></Stack.Screen>

          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
