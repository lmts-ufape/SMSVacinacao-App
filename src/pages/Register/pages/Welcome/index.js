import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, TouchableHighlight, Alert } from "react-native";
import LottieView from 'lottie-react-native';
import { Color } from '@common';
import { Api } from "@services";

class Welcome extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            nome: ''
        }
    }

    componentDidMount() {
        this._sendSolicitacao(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this._sendSolicitacao(nextProps);
    }

    _sendSolicitacao(props) {
        const { data } = props.route.params;
        this.setState({ nome: data.nome });

        if (props.campanhaIdadePublico != null) {
            const { campanhaIdadePublico } = props;
            Api.createSolicitacao(data.cns, campanhaIdadePublico).then(resposta => {
                console.log("estou:", resposta);
                setTimeout(() => {
                    return props.onDataFilled({ cns: data.cns, nome: data.nome, request: resposta });
                }, 200);
            }).catch(e => {
                if (e.name === 409) {
                    Alert.alert(
                        'Alert',
                        e.message,
                        [
                            {
                                text: 'Ok',
                                onPress: () => props.onDataFilled({ cns: data.cns, nome: data.nome })
                            },
                        ]
                    );
                } else if (e.name === 409) {
                    Alert.alert(
                        'Alert',
                        e.message,
                        [
                            {
                                text: 'Ok',
                                onPress: () => this.props.navigation.goBack()
                            },
                        ]
                    );
                } else {
                    Alert.alert(
                        'Alert',
                        e.message,
                        [
                            {
                                text: 'Ok',
                                onPress: () => this.props.navigation.goBack()
                            },
                        ]
                    );
                }
            });
        } else {
            const { campanhaIdadePublico } = props;

        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.2, alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 23, fontWeight: 'bold' }}> Bem vindo {this.state.nome}. Estamos realizando sua solicitação...</Text>
                </View>
                <View style={{ flex: 0.4, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <LottieView
                        source={require('@assets/progress.json')}
                        autoPlay
                        loop={true}
                        hardwareAccelerationAndroid={true}
                    />
                </View>
                <View style={{ flex: 0.4, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <TouchableHighlight
                            activeOpacity={0.3}
                            underlayColor="#1111"
                            style={{ borderRadius: 10 }}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <View style={{
                                height: 60,
                                width: 200,
                                backgroundColor: Color.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                borderWidth: 2.5,
                                borderColor: '#fff',
                                elevation: 5
                            }}>
                                <Text style={{
                                    marginVertical: 10,
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: '#fff'
                                }}>Cancelar</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

export default Welcome;