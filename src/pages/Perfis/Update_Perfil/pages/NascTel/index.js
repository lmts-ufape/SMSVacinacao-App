import React, { PureComponent } from "react";
import { SubTitle, ErrorMessage, ListItens, Footer, Button, ItemInput } from '../../../../Register/pages/components';
import { TextInputMask } from 'react-native-masked-text';
import { View, TextInput } from "react-native";
import { Color } from '@common';


class NascTel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            haveInvalidData: false,
            showErrorMessege: false,
            errorMessege: '',
            nome: '',
            nasc: '',
            tel: '',
        }

        this.textInput = []
    }

    componentDidMount() {
        if(this.props.paciente){
            const dados = this.props.paciente;
            //console.log('teste3', dados);
            if(dados !== null){
                this.setState({ nome: dados.nome });
                this.setState({ nasc: dados.nasc });
                this.setState({ tel: dados.tel });
            }
        }
    }

    _handleValidValue(ref) {
        clearTimeout(ref.timer);
        ref.timer = setTimeout(() => {
            if (ref.isValid) {
                if (!ref.isValid()) {
                    ref.getElement().setNativeProps({ style: { color: '#FF4000', borderWidth: 1.5, borderColor: '#FF4000' } });
                    this.setState({ haveInvalidData: true })
                } else {
                    ref.getElement().setNativeProps({ style: { color: '#111', borderColor: '#fff' } });
                    this.setState({ haveInvalidData: false })
                }
            }
        }, 800)
    }

    _handlePressCancelar() {
        this.props.navigation.navigate('Welcome');
    }

    _handlePressUpdate() {
        if (this.state.haveInvalidData === true) {
            this.setState({ showErrorMessege: true, errorMessege: 'Alguns dados estão incorreto ou faltando!' });
        } else if (this.state.nome === '') {
            this.setState({ showErrorMessege: true, errorMessege: 'Preencha os campos obrigatorios!' });
        } else if (this.state.nasc === '') {
            this.setState({ showErrorMessege: true, errorMessege: 'Preencha os campos obrigatorios!' });
        } else if (this.state.tel === '') {
            this.setState({ showErrorMessege: true, errorMessege: 'Preencha os campos obrigatorios!' });
        } else {
            const data = new Date(this.textInput[1].getRawValue());
            const dados = {
                nome: this.state.nome,
                nasc: `${data.getFullYear()}-${data.getMonth()}-${data.getDay()}`,
                tel: this.textInput[2].getRawValue(),
            };
            this.props.onDataFilled(dados);
            this.props.onPressFinish();
            this.props.navigation.navigate('Welcome');
        }

    }

    render() {
        
        return (
            <View style={{ flex: 1 }}>
                <SubTitle>Modifique os dados</SubTitle>
                <ErrorMessage
                    show={this.state.showErrorMessege}
                    message={this.state.errorMessege}
                />
                <ListItens>
                    <ItemInput name={'Nome*'}>
                        <TextInput
                            ref={ref => this.textInput[0] = ref}
                            onSubmitEditing={() => this.textInput[1].getElement().focus()}
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='fulano'
                            value={this.state.nome}
                            onChangeText={(value) => this.setState({ nome: value })}
                        />
                    </ItemInput>

                    <ItemInput name={'Data de Nascimento*'}>
                        <TextInputMask
                            ref={ref => this.textInput[1] = ref}
                            onSubmitEditing={() => this.textInput[2].getElement().focus()}
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY'
                            }}
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='00/00/0000'
                            value={this.state.nasc}
                            onChangeText={(value) => {
                                this.setState({ nasc: value });
                                this._handleValidValue(this.textInput[1]);
                            }}
                        />
                    </ItemInput>

                    <ItemInput name={'Telefone*'}>
                        <TextInputMask
                            ref={ref => { this.textInput[2] = ref }}
                            onSubmitEditing={() => this._handlePressProximo()}
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) '
                            }}
                            style={{ backgroundColor: '#fff', borderRadius: 6 }}
                            placeholder='(00) 00000-0000'
                            value={this.state.tel}
                            onChangeText={(value) => {
                                this.setState({ tel: value });
                                this._handleValidValue(this.textInput[2]);
                            }}
                        />
                    </ItemInput>
                </ListItens>

                <Footer>
                    <Button onPress={() => this._handlePressCancelar()} text={'Cancelar'} />
                    <Button onPress={() => this._handlePressUpdate()} text={'Atualizar'} />
                </Footer>
            </View>
        );
    }
}

export default NascTel;