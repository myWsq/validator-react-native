import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { fontFamily, color } from '../theme';

export interface TitleProps {}

export interface TitleState {}

export default class Title extends React.Component<TitleProps, TitleState> {
	constructor(props: TitleProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<View>
				<Text style={styles.title}>{this.props.children}</Text>
				<View style={styles.line} />
			</View>
		);
	}
}

const styles = {
	title: {
		fontFamily: fontFamily,
		fontSize: 30,
        marginTop: 50,
	},
	line: {
		height: 3,
		width: 40,
		marginTop: 10,
		marginBottom: 20,
		backgroundColor: color.primary,
	},
};
