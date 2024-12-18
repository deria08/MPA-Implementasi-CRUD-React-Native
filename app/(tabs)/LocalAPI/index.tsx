import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'

const Item = () => {
    return (
        <View style={styles.itemContainer} >
            <Image source={{uri: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Easton'}} style={styles.avatar} />
            <View style={styles.desc}>
                <Text style={styles.descName}>Nama Lengkap</Text>
                <Text style={styles.descEmail}>Email</Text>
                <Text style={styles.descAlamat}>Alamat</Text>
            </View>
            <Text style={styles.delete}>X</Text>
        </View>
    )
}

const LocalAPI = () => {    
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [alamat, setAlamat] = useState("");

    const submit = () => {
        console.log("Submitting data...");
        const data = {
            name,
            email,
            alamat,
        }
    axios.post('http://127.0.0.1:3004/users', data)
    .then(res => {
    console.log('res: ', res);
        setName('');
        setEmail('');
        setAlamat('');
  })
  .catch(err => {
    console.error('Error:', err.message); // Log error
  });

    }
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Local API (JSON Server)</Text>
            <Text>Masukkan Anggota Kingdom</Text>
            <TextInput placeholder="Nama Lengkap" style={styles.input} value={name} onChangeText={(value) => setName(value)} />
            <TextInput placeholder='Email' style={styles.input} value={email} onChangeText={(value) => setEmail(value)} />
            <TextInput placeholder='Alamat' style={styles.input} value={alamat} onChangeText={(value) => setAlamat(value)}    />
            <Button title='Simpan' onPress={submit} />
            <View  style={styles.line} />
            <Item />
            <Item />
            <Item />
        </View>
  )
}

export default LocalAPI

const styles = StyleSheet.create({
    container: {padding:20},
    textTitle: {textAlign: 'center', marginBottom:20},
    line: {height: 2, backgroundColor: 'black', marginVertical: 20},
    input: {borderWidth: 1, marginBottom: 12, borderRadius:25, padding:10},
    avatar: {width: 80, height:80, borderRadius: 80},
    itemContainer: {flexDirection:'row', marginBottom: 20},
    desc: {marginLeft: 18, flex: 1},
    descName: {fontSize: 20, fontWeight:'bold'},
    descEmail: {fontSize:16},
    descAlamat: {fontSize:12, marginTop: 8},
    delete: {fontSize: 20, fontWeight:"bold", color: 'red'}
})