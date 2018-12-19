import * as React from 'react';
import { ImageSourcePropType, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { color } from '../theme';
import styled from 'styled-components/native';
import Spinner from 'react-native-spinkit';

export interface MyImagePickerProps {
	image: ImageSourcePropType;
	onSubmit(uri: string): any;
}

export interface MyImagePickerState {
	loading: boolean;
}

export default class MyImagePicker extends React.Component<MyImagePickerProps, MyImagePickerState> {
	constructor(props: MyImagePickerProps) {
		super(props);

		this.state = {
			loading: false,
		};
	}

	onSelect = () => {
		if (!this.state.loading) {
			this.setState({
				loading: true,
			});
			ImagePicker.showImagePicker(
				{
					title: '上传图片',
					cancelButtonTitle: '取消',
					takePhotoButtonTitle: '使用相机拍摄',
					chooseFromLibraryButtonTitle: '从相册选择',
				},
				(res) => {
					if (res.uri) {
						this.props.onSubmit('data:image/jpeg;base64,' + res.data);
					}
					this.setState({
						loading: false,
					});
				}
			);
		}
	};

	public render() {
		return (
			<Container onPress={this.onSelect}>
				{this.props.image && <FinalImage resizeMode="center" source={this.props.image} />}
				{this.state.loading && (
					<Spinner isVisible={this.state.loading} size={50} type="Bounce" color={color.primary} />
				)}
				{!this.props.image &&
				!this.state.loading && (
					<TapArea>
						<Image resizeMode="center" source={require('../assets/id-card.png')} />
					</TapArea>
				)}
			</Container>
		);
	}
}

const Container = styled.TouchableOpacity`
	position: relative;
	height: 200px;
	margin: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const FinalImage = styled.Image`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

const TapArea = styled.View`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
