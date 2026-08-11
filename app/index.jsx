import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text,TextInput, View, Button,Pressable } from 'react-native';

import { supabase } from './lib/supabase';
import { router } from 'expo-router';


const Home = () => {
    const [name, setName] = useState({
        firstname: '',
        lastname: ''
    });

    const [clients, setInstruments] = useState([])
    useEffect(() => {
        getClients()
    }, [])

    async function getClients() {
        const { data } = await supabase.from('client').select()
        setInstruments(data)
    }

    return (
        <View style={styles.container}>
            <View style={styles.clientList}>
                <View>
                    <Text style={styles.listTitle}>Clients</Text>
                    <Button
                        title="New Clients"
                        onPress={() => router.push('/clients/create')}
                    ></Button>
                </View>

                <FlatList
                    data={clients}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Pressable style={styles.clientCard}>
                            
                            {/* Avatar */}
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {item.fname?.charAt(0)}
                                    {item.lname?.charAt(0)}
                                </Text>
                            </View>

                            {/* Client Information */}
                            <View style={styles.clientInfo}>
                                <Text style={styles.clientName}>
                                    {item.fname} {item.lname}
                                </Text>

                                <Text style={styles.clientDetails}>
                                    Client #{item.id}
                                </Text>
                            </View>

                            {/* Arrow */}
                            <Text style={styles.arrow}>›</Text>

                        </Pressable>
                    )}
                />
            </View>

            <Text>Your Name is:</Text>
            
            <TextInput
                placeholder="Enter firstname"
                onChangeText={(text) => {
                    setName({
                        ...name,
                        firstname:text
                    })
                }}
                style={styles.input}
                value={name.firstname}
            ></TextInput>
            <Text>Last Name</Text>
            <TextInput
                placeholder="Enter lastname"
                onChangeText={(text) => {
                    setName({
                        ...name,
                        lastname:text
                    })
                }}
                style={styles.input}
                value={name.lastname}
            ></TextInput>

            <Text>First Name :{name.firstname}</Text>
            <Text>Last Name: {name.lastname}</Text>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Press Me!"
                    onPress={() => setName({
                        firstname: 'Halk',
                        lastname: 'Hogan'
                    })}
                ></Button>
                <Button
                    title="Reset"
                    onPress={() => setName({
                        firstname: 'Diego',
                        lastname: 'Silang'
                    })}
                ></Button>
            </View>
        </View>        
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button : {
        backgroundColor: '#03A9F4',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 2
    },
    input : {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5
    },
    clientList: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
    },

    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 15,
    },

    clientCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,

        // Shadow - iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,

        // Shadow - Android
        elevation: 2,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#03A9F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    avatarText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

    clientInfo: {
        flex: 1,
    },

    clientName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#222',
    },

    clientDetails: {
        fontSize: 13,
        color: '#888',
        marginTop: 3,
    },

    arrow: {
        fontSize: 28,
        color: '#aaa',
    },
});