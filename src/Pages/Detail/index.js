import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import logoImg from '../../assets/logo.png';


import styles from './styles';


export default function Incidents() {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;
    const message = 'Olá APAD, estou entrando em contatopois gostaria de ajudar no "Cadelinha atropeladada" com o valor de 120,00';

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: 'Heroi do caso: Cadelinha atropelada',
            recipients : ['luizclaudiosiqueira2@gmail.com'],
            body: message,

        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=5581999404451&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}}</Text>

                <Text style={styles.incidentProperty}>Valor</Text>

                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                    }).format(incident.value)}
                </Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                       <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}