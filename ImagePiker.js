import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';


const url = 'http://192.168.0.69:8000/api/video';

export default class ImagePickerMobile extends React.Component {
    state = {
        image: null,
        video: null
    };

    render() {
        let { image, video } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                />
                {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                {video &&
                    <Video
                        source={{ uri: video }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={true}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        style={{ width: 300, height: 300 }}
                    />}
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);


            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
        

            this.setState({ video: result.uri });
        

        this._upoladVideo(result.uri);

    };
    _upoladVideo = async (uri) => {

        let formData = new FormData();

        console.log("In side uploading video-->>" + uri);
        
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        
        formData.append('video', {
            uri,
            name: `photo.${fileType}`,
            type: `video/${fileType}`,
        });

        formData.append('user_id', 1)
        formData.append('video_for', "satyam")

        // formData.append("id", "1234567");
        const DATA = formData;

        console.log( "hi  this is formdata" , formData);

        return fetch(url, {
                method: 'post',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: DATA
            })
            .then(async (response) => console.log( " hi this is response" + await response.json()))
            .catch((error) => {
                console.log("inside error")
                console.log('error : ' + error);
                return error;
             })
        }
}