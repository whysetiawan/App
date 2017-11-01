import {StackNavigator} from 'react-navigation';
import {Tabs} from './RouterTab';
import index from '../src/';
import Login from '../src/Login';
import Forgot from '../src/Forgot';
import Register from '../src/Register';
import Register2 from '../src/Register2';
import Register3 from '../src/Register3';
import EditProfile from '../src/home_screen/Edit Profile';

export const Stack = StackNavigator({
	index: { screen: index },
	Login: { screen: Login },
	Forgot: { screen: Forgot },
	Register: { screen: Register },
	Register2: { screen: Register2 },
	Register3: { screen: Register3 },
	Tabs: { screen: Tabs},
	EditProfile: { screen: EditProfile },
})
