import React, { useState }  from 'react';
import { ChannelList } from './ChannelList';
import { MessagesPanel } from './MessagesPanel';
import io from "socket.io-client";
import { Button } from '@mui/material';

import axios from "axios";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "https://cse-416-jart.herokuapp.com/play",
});

export default function Chat() {

    // let state = {
    //     channels: null,
    //     socket: null,
    //     channel: null
    // }
    //let socket;
    // componentDidMount() {
    //     console.log('mounted!')
    //     this.loadChannels();
    //     this.configureSocket();
    // }
    const [state, setState] = useState({
        channels: null,
        socket: null,
        channel: null
    })

    const configureSocket = () => {
        var socket = io.connect('/');
        socket.on('connection', () => {
            if (state.channel) {
                handleChannelSelect(state.channel.id);
            }
        });
        socket.on('channel', channel => {
            let channels = state.channels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                }
            });
            setState({ channels: channels, socket: socket, channel: state.channel });
        });
        socket.on('message', message => {
            
            let channels = state.channels
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            setState({ channels: channels, socket: socket, channel: state.channel });
        });
        //socket = socket;
        setState({ channels: state.channels, socket: socket, channel: state.channel });
        console.log(state.socket)
    }

    const getChannels = (username, password) => {
        return api.get(`/getChannels`);
    };

    const loadChannels = async () => {
        try{
            let response = await getChannels() ;
            console.log('response from getChannels: ' + response)
            console.log(response)
            setState({ channels: response.data.channels, socket:state.socket, channel:state.channel });
        }catch(err){
            console.log(err)
        }
    }

    const handleChannelSelect = id => {
        let channel = state.channels.find(c => {
            return c.id === id;
        });
        setState({ channels: state.channels, socket: state.socket, channel: channel });
        state.socket.emit('channel-join', id, ack => {
        });
    }

    const handleSendMessage = (channel_id, text) => {
        state.socket.emit('send-message', { channel_id, text, senderName: state.socket.id, id: Date.now() });
    }

    // render() {
    // loadChannels();
    // configureSocket();

    return (
        <div className='chat-app'>
            <Button onClick={loadChannels}>load channels</Button>
            <Button onClick={configureSocket}>configureSocket</Button>
            <ChannelList channels={state.channels} onSelectChannel={handleChannelSelect} />
            <MessagesPanel onSendMessage={handleSendMessage} channel={state.channel} />
        </div>
    );
    // }
}