import React, { useState } from 'react';
import { StyleSheet, Text,TextInput, View, Button,Pressable } from 'react-native';

const Home = () => {
    const [name, setName] = useState({
        firstname: '',
        lastname: ''
    });
    return (
        <View style={styles.container}>
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
    }
});