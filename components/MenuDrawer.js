import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { logout, userImageUri } from '../actions/authActions';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


const UserName = ({ username }) => {
    return (
        <Text style={{ color: 'white', fontSize: (HEIGHT * 3) / 100 }}>{username}</Text>
    );
};
const Rating = ({ rating }) => {
    return (
        <Text style={{ color: 'white', fontSize: (HEIGHT * 3) / 100 }}>{rating}</Text>
    );
};

const options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class MenuDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageUri: ''
        }
    }

    // componentDidMount() {
    //     let userimage;
    //     AsyncStorage.getItem('images')
    //         .then(data => {
    //             userimage = JSON.parse(data);
    //             console.log(data);
    //             this.setState({
    //                 imageUri: userimage
    //             });
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });

    //         console.log("Async ka uri :" ,this.state.imageUri);
    // }



    navLink(nav, text) {
        return (
            <TouchableOpacity style={{ height: HEIGHT * 0.10 }}
                onPress={() => { this.props.navigation.navigate(nav); this.props.navigation.closeDrawer(); }}>

                <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }

    signOut = (text) => {
        return (
            <TouchableOpacity style={{ height: HEIGHT * 0.10 }}
                onPress={() => {
                    try {
                        AsyncStorage.removeItem('@number');
                        console.log('removed');
                    }
                    catch {

                    }
                    try {
                        AsyncStorage.removeItem('@userlogindata');
                        console.log("removed userlogindata");
                    }
                    catch{
                        
                    }
                    firebase.auth().signOut();
                    this.props.logout();
                    this.props.navigation.navigate('LoginPage');
                    console.log('user after logout', this.props.auth.user);
                    console.log("trips:::::::::", this.props.auth.ridehistory);
                    this.props.navigation.closeDrawer();
                }}>
                <Text style={styles.link} >{text}</Text>
            </TouchableOpacity>
        )
    }


    pickImage = () => {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log('You cancelled image picker 😟');
            } else if (response.error) {
                alert('And error occured: ', response.error);
            } else {
                // const source = { uri: response.uri };
                this.setState({
                    imageUri: response.uri,
                });
                this.uploadImage(response.uri);
            }
        });
    };

    uploadImage = (uri) => {
        console.log('chala bh h ya nh');
        if (uri !== null) {
            const filename = 'ibad';
            firebase
                .storage()
                .ref(`images/${filename}`)
                .putFile(this.state.imageUri)
                .on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    snapshot => {
                        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                            AsyncStorage.setItem('images', JSON.stringify(snapshot.downloadURL));

                            const data = {
                                id: this.props.auth.user._id,
                                url: snapshot.downloadURL
                            }
                            this.props.userImageUri(data);
                        }
                    },
                    error => {
                        unsubscribe();
                        alert('Sorry, Try again.');
                    }
                );
        }
        else {
            console.log("dont upload");
        }
    };

    userImage = () => {
        if (this.props.auth.image !== null && this.props.auth.image !== undefined) {
            return (
                <Image source={{ uri: this.props.auth.image }} resizeMode='cover' style={{ height: 100, width: 100, borderWidth: 0.5, borderColor: '#000', borderRadius: 50 }} />
            )
        }
        else {
            return (
                <Image source={{ uri: "https://image.shutterstock.com/image-vector/male-user-account-profile-circle-260nw-467503055.jpg" }} resizeMode='cover' style={{ height: 100, width: 100, borderWidth: 0.5, borderColor: '#000', borderRadius: 50 }} />
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.topLinks}>
                        <TouchableWithoutFeedback style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }} onPress={this.pickImage}>
                            {this.userImage()}
                        </TouchableWithoutFeedback>
                        <View>
                            <UserName username={this.props.auth.user.name} />
                            <View style={{ flexDirection: 'row', marginTop: (HEIGHT * 2) / 100 }}>
                                <Rating rating="4.0" />
                                <Icon name='star' color='#fff' size={(HEIGHT * 3) / 100} style={{ marginLeft: (HEIGHT * 2) / 100, marginTop: (HEIGHT * 0.5) / 100 }} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.bottomLinks}>
                        {this.navLink('MyTrips', 'My Trips')}
                        {this.navLink('Payments', 'Payments')}
                        {this.navLink('Settings', 'Settings')}
                        {this.signOut('Sign Out')}

                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Text style={styles.description}>Sawari</Text>
                    <Text style={styles.version}>v1.0</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },
    link: {
        flex: 1,
        fontSize: (HEIGHT * 3) / 100,
        padding: (HEIGHT * 1) / 100,
        paddingLeft: (WIDTH * 6) / 100,
        marginVertical: 10,
        color: '#000',
        textAlign: 'left',
    },
    topLinks: {
        flexDirection: 'row',
        height: HEIGHT * 0.25,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'darkviolet'
    },
    bottomLinks: {
        height: HEIGHT * 0.75,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 450,
    },
    footer: {
        height: HEIGHT * 0.075,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'lightgray'
    },
    version: {
        flex: 1,
        textAlign: 'right',
        marginRight: 20,
        color: 'gray'
    },
    description: {
        flex: 1,
        marginLeft: (HEIGHT * 5) / 100,
        color: '#824bdd',
        fontSize: (HEIGHT * 3.5) / 100,

    }
});

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout, userImageUri })(MenuDrawer);