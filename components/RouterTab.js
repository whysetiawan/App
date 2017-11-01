import React, {Component} from 'react';
import {TabNavigator, TabView, TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Create from '../src/home_screen/Add Studio';
import Rented from '../src/home_screen/Rented';
import Explore from '../src/home_screen/Explore';
import Profile from '../src/home_screen/Profile';
import Saved from '../src/home_screen/Saved';
import Message from '../src/home_screen/Message';
import {Stack} from './Router';

export const Tabs = TabNavigator({
	Create: { screen: Create,
	navigationOptions: {
		tabBarLabel: 'STUDIO',
		tabBarIcon: ({ tintColor}) =>  <Icon name="ios-musical-notes-outline" size={35} />
	},
},
	Explore: { screen: Explore,
	navigationOptions: {
		tabBarLabel: 'EXPLORE',
		tabBarIcon: ({ tintColor}) =>  <Icon name="ios-search-outline" size={35} />
	},
},
	Saved: { screen: Saved,
	navigationOptions: {
		tabBarLabel: 'WISHLIST',
		tabBarIcon: ({ tintColor }) =>  <Icon name="ios-heart-outline" size={35} />
	},
},
	Rented: { screen: Rented,
	navigationOptions: {
		tabBarLabel: 'RENTED',
		tabBarIcon: ({ tintColor}) =>  <Icon name="md-list" size={35} />
	},
},
	Message: { screen: Message,
	navigationOptions: {
		tabBarLabel: 'EXPLORE',
		tabBarIcon: ({ tintColor}) =>  <Icon name="ios-chatbubbles-outline" size={35} />
	},
},
	Profile: { screen: Profile,
	navigationOptions: {
		tabBarLabel: 'PROFILE',
		tabBarIcon: ({ tintColor}) =>  <Icon name="ios-person-outline" size={35} color={tintColor}/>
	},
},

},
{
	tabBarOptions: {
		 activeTintColor: 'dodgerblue',
		 pressColor: 'dodgerblue'
	},
	tabBarComponent: TabBarBottom,
	tabBarPosition: 'bottom',
	swipeEnabled: false,
})