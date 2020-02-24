import React from 'react';
import '../App.css';
import App from '../App.js'

//creating the connection
import io from 'socket.io-client';
// const socket = io.connect('http://localhost:3000');


class Chat extends React.Component {
    constructor() {
        super()
        // const username = prompt('Enter your username')
        this.state = {
            messages: [],
            // from: []
            userName: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        // this.handleClick = this.handleClick.bind(this)
    }   

    componentDidMount() {
        
        // fetch('https://www.googleapis.com/youtube/v3/commentThreads?part=id%2Csnippet&videoId=XYBx__4iAUw&key=AIzaSyBdVut9QCzqAHBzfDEh30yUp4E529som6s')
        fetch('https://www.googleapis.com/youtube/v3/comments?key=AIzaSyBdVut9QCzqAHBzfDEh30yUp4E529som6s/youtube/v3/comments/?/maxResults=5')
        .then(results => {
            return results.json();
        })
        // const username = prompt('enter name here')
        this.socket = io('http://localhost:5000')
        this.socket.on('message', (message) => {
            this.setState({
                messages: [message, ...this.state.messages],
                // username : username
            });
        })
    }
    sendMessage(event) {
        // const from = event.target.value
        const body = event.target.value

        if (event.keyCode === 13 && body) {
            event.preventDefault();
            let message = {
                body,
                date: new Date().toLocaleString(),
                users: this.props.userinfo
                //we can put the username when the user logs into the account
                
            }
            event.currentTarget.value="";
            // console.log('here', message)
            this.setState({ 
                messages: [message, ...this.state.messages],
                users: this.props.userinfo
            })
            this.socket.emit('message', message)
        }
    }

    render() {
        return (
            <div className='Message-box'>
                
                <p id = 'greet'> <strong>Hi {this.props.userinfo} </strong></p>
                {console.log(this.props.userinfo)}
                {/* <input type ='button' id = 'userButton' value='Enter a username' onClick ={this.handleClick}></input> */}
                <input type='text' id='commentBox' placeholder='enter a message' onKeyUp={this.sendMessage} ></input>
                {this.state.messages.map((messages => {
                    return (<ul id='messages'><strong>{messages.users}</strong> : <small>{messages.date}</small> : <br />{messages.body}</ul>)
                }))}
            </div>
        )
    }
}

export default Chat;
