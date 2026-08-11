import { View, Text, TextInput, Button, StyleSheet, Pressable, StatusBar   } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { supabase } from '../lib/supabase';

import { useState } from 'react';
import { router } from 'expo-router';

export default function Create() {
    const [form, setForm] = useState({
        fname : '',
        lname : '',
        mname: '',
        birthday: null,
    });

    const [showPicker, setShowPicker] = useState(false);

    const handleBirthdayChange = (event, selectedDate) => {
        setShowPicker(false);

        if (selectedDate) {
            setForm({
                ...form,
                birthday: selectedDate,
            });
        }
    };
    

    const handleSubmit = async () => {
        if (!form.fname || !form.lname) {
            alert('First name and last name are required.');
            return;
        }

        // if (!form.birthday) {
        //     alert('Please select a birthday.');
        //     return;
        // }

        const { data, error } = await supabase
            .from('client')
            .insert([
                {
                    fname: form.fname,
                    lname: form.lname,
                    mname: form.mname,
                    // birthday: form.birthday.toISOString().split('T')[0],
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            alert(error.message);
            return;
        }

        console.log('Client created:', data);

        alert('Client successfully created!');

        setForm({
            fname: '',
            lname: '',
            mname: '',
            birthday: null,
        });

        router.push('/');
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Text>Create Client</Text>

            {/* first name */}
            <View style={{ marginTop: 10 }}>
                <Text>First Name</Text>
                <TextInput
                    placeholder="First Name..."
                    style={styles.input}
                    onChangeText={(text) => {
                        setForm({
                            ...form,
                            fname: text
                        })
                    }}
                ></TextInput>
            </View>
            
            {/* last name */}
            <View style={{ marginTop: 10 }}>
                <Text>Last Name</Text>
                <TextInput
                    placeholder="Last Name..."
                    style={styles.input}
                    onChangeText={(text) => {
                        setForm({
                            ...form,
                            lname: text
                        })
                    }}
                ></TextInput>
            </View>

            {/* middle name */}
            <View style={{ marginTop: 10 }}>
                <Text>Middle Name</Text>
                <TextInput
                    placeholder="Middle Name..."
                    style={styles.input}
                    onChangeText={(text) => {
                        setForm({
                            ...form,
                            mname: text
                        })
                    }}
                ></TextInput>
            </View>

            {/* birthday */}
            <View>
                <Text>Birthday</Text>

                <Pressable
                    onPress={() => setShowPicker(true)}
                    style={styles.dateInput}
                >
                    <Text>
                        {form.birthday
                            ? form.birthday.toLocaleDateString()
                            : 'Select birthday'}
                    </Text>
                </Pressable>

                {showPicker && (
                    <DateTimePicker
                        value={form.birthday || new Date()}
                        mode="date"
                        display="default"
                        maximumDate={new Date()}
                        onChange={handleBirthdayChange}
                    />
                )}
            </View>

            <Pressable
                onPress={handleSubmit}
                style={styles.submitButton}
            >
                <Text style={styles.submitButtonText}>
                    Submit New Client
                </Text>
            </Pressable>

            
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
    },
    dateInput: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginTop: 5,
    },
    submitButton: {
        marginTop: 15,
        height: 45,
        backgroundColor: '#03A9F4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})

