import * as React from 'react';
import { SafeAreaView } from 'react-native';

export interface FormProps {}

export interface FormState {}

export default class Form extends React.Component<FormProps, FormState> {
	constructor(props: FormProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return <SafeAreaView style={style.container}>
            {this.props.children}
        </SafeAreaView>
	}
}

const style = {
	container: {
		marginLeft: -20,
		marginRight: -20,
	},
};
