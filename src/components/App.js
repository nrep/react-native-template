import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Button, IconRegistry, } from '@ui-kitten/components';
import { default as purpleTheme } from '../assets/themes/purple-theme.json'; // <-- Import app theme
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation.component';
import { ThemeContext } from '../utils/theme-context';

export default () => {

	const [theme, setTheme] = React.useState('light');

	const toggleTheme = () => {
		const nextTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(nextTheme);
	}
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<ApplicationProvider {...eva} theme={{ ...eva[theme], ...purpleTheme }}>
					<AppNavigator />
				</ApplicationProvider>
			</ThemeContext.Provider>
		</>
	)
};