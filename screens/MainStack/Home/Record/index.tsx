import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import Container from '../../../../components/Container';
import styled from 'styled-components/native';
import { Divider, Text } from 'react-native-elements';
import { color } from '../../../../theme';
import { ScrollView } from 'react-native';

export interface RecordScreenProps extends NavigationScreenProps {}

export interface RecordScreenState {}

export default class RecordScreen extends React.Component<RecordScreenProps, RecordScreenState> {
	constructor(props: RecordScreenProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<Container style={{}}>
				<ScrollView style={{ paddingLeft: 20, paddingRight: 20 }}>
					<MyTitle>出示身份二维码</MyTitle>
					<MyText>时间: 2018/8/21 上午 9:40:50 </MyText>
					<Divider />
					<MyTitle>来自 12306 的授权请求</MyTitle>
					<MyText>原因: 购买 G83 北京西 9∶00 长沙南 14∶40 二等座车票 </MyText>
					<MyText>时间: 2018/9/18 下午 5:13:45 </MyText>
					<Divider />
					<MyTitle>出示身份二维码</MyTitle>
					<MyText>时间: 2018/9/20 上午 10:50:18 </MyText>
					<Divider />
					<MyTitle>来自 12306 的授权请求</MyTitle>
					<MyText>原因: 购买 G86 北京西 14∶00 长沙南 21∶30 二等座车票 </MyText>
					<MyText>时间: 2018/10/1 下午 6:20:57 </MyText>
					<Divider />
					<MyTitle>出示身份二维码</MyTitle>
					<MyText>时间: 2018/10/2 下午 1:35:40 </MyText>
					<Divider />
					<Text style={{ color: color.info, textAlign: 'center', marginTop: 30, marginBottom: 30 }}>
						没有更多记录了
					</Text>
				</ScrollView>
			</Container>
		);
	}
}

const MyTitle = styled.Text`
	font-size: 20;
	font-weight: 500;
	margin-top: 20;
	margin-bottom: 20;
`;

const MyText = styled.Text`
	font-size: 16;
	line-height: 25;
	margin-bottom: 20;
	color: #555;
`;
