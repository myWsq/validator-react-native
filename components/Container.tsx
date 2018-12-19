import * as React from 'react';
import { SafeAreaView } from 'react-native';

export interface ContainerProps {}

export interface ContainerState {}

export default class Container extends React.Component<ContainerProps, ContainerState> {
	constructor(props: ContainerProps) {
		super(props);

		this.state = {};
	}
	public render() {
		return <SafeAreaView style={styles.container}>{this.props.children}</SafeAreaView>;
	}
}

const styles = {
	container: {
		marginLeft: 20,
		marginRight: 20,
	},
};
