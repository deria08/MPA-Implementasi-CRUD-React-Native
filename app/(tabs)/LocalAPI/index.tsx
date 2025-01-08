import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Item = ({name, email, alamat, onPress, onDelete}) => {
    return (
        <View style={styles.itemContainer} >
            <TouchableOpacity onPress={onPress}>
            <Image source={{uri: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Easton'}} style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.desc}>
                <Text style={styles.descName}>{name}</Text>
            <Text style={styles.descEmail}>{email}</Text>
                <Text style={styles.descAlamat}>{alamat}</Text>
            </View>
            <TouchableOpacity onPress={onDelete}>
                <Text style={styles.delete}>X</Text>
            </TouchableOpacity>
        </View>
    )
}

const LocalAPI = () => {    
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [alamat, setAlamat] = useState("");
    const [users, setUsers] = useState([]);
    const [button, setButton] = useState("Simpan");
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        getData();
    }, []);

    const submit = () => {
        console.log("Submitting data...");
        const data = {
            name,
            email,
            alamat,
        }
    if(button === 'Simpan'){
        axios.post('http://127.0.0.1:3004/users', data)
        .then(res => {
        console.log('res: ', res);
            setName('');
            setEmail('');
            setAlamat('');
            getData();
    })
    .catch(err => {
        console.error('Error:', err.message); // Log error
    });
    } else if(button === 'Update'){
        axios.put(`http://127.0.0.1:3004/users/${selectedUser.id}`, data)
        .then(res => {
            console.log('res update: ', res);
            setName('');
            setEmail('');
            setAlamat('');
            getData();
            setButton('Simpan');
        })
    }

    }
    const getData =() => {
        axios.get('http://127.0.0.1:3004/users')
        .then(res => {
            console.log('res get dat a: ', res)
            setUsers(res.data);
        })
    }

    const selectItem = (item) => {
        console.log('selected item: ', item);
        setSelectedUser(item);
        setName(item.name);
        setEmail(item.email);
        setAlamat(item.alamat);
        setButton('Update');
    }

    const deleteItem = (Item) => {
        console.log(Item);
        axios.delete(`http://127.0.0.1:3004/users/${Item.id}`)
        .then(res => {
            console.log('res delete: ', res)
            getData();
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Local API (JSON Server)</Text>
            <Text>Masukkan Anggota Kingdom</Text>
            <TextInput placeholder="Nama Lengkap" style={styles.input} value={name} onChangeText={(value) => setName(value)} />
            <TextInput placeholder='Email' style={styles.input} value={email} onChangeText={(value) => setEmail(value)} />
            <TextInput placeholder='Alamat' style={styles.input} value={alamat} onChangeText={(value) => setAlamat(value)}    />
            <Button title={button} onPress={submit} />
            <View  style={styles.line} />
            {users.map(user => {
                return(
                    <Item 
                    key={user.id} 
                    name={user.name} 
                    email={user.email} 
                    alamat={user.alamat} 
                    onPress={() => selectItem(user)} 
                    onDelete={() => {
                        const alert = window.confirm('Anda yaking ingin menghapus user ini?');
                        if (alert) {
                            console.log('User berhasil dihapus');
                            deleteItem(user);
                        } else {
                            console.log('anda tidak bisa menghapus user ini. Silahkan coba lagi');
                        }
                    }}/>
                ) 
            })}
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