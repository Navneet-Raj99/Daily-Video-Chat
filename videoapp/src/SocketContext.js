import React, { createContext, useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const socketcontext = createContext();
const socket = io('http://localhost:5000')

const ContextProvider = ({ children }) => {
    const [stream, setstream] = useState(null)
    const [me, setme] = useState("")
    const [call, setcall] = useState({})
    const [callaccepted, setcallaccepted] = useState(false)
    const [callended, setcallended] = useState(false)
    const [name, setname] = useState("")
    const videoReference = useRef()
    const uservideoReference = useRef()
    const connectionReference = useRef()
    useEffect(() => {
       
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })//promise
            .then((currentStream) => {
                setstream(currentStream)
                videoReference.current.srcObject=currentStream 
            })
          
        socket.on('me', (id) => {
            setme(id)
        })
        socket.on('calluser', ({ from, name: callerName, signal }) => {
            setcall({ isRecieved: true, from, name: callerName, signal })
        })
    }, [])

    const answercall = () => {
        setcallaccepted(true)
        const peer = new Peer({ initiator: false, trickle: false, stream })
        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from })
        })
        peer.on('stream', (currentStream) => {
            uservideoReference.current.srcObject = currentStream;
        })
        peer.signal(call.signal);
        connectionReference.current = peer
    }
    const calluser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream })
        peer.on('signal', (data) => {
            socket.emit('calluser', { usertocall: id, signaldata: data, from: me, name })
        })
        peer.on('stream', (currentStream) => {
            uservideoReference.current.srcObject = currentStream;
        })
        socket.on('callaccepted', (signal) => {
            setcallaccepted(true)
            peer.signal(signal)
        })
        connectionReference.current = peer
    }
    const leavecall = () => {
        setcallended(true)
        connectionReference.current.destroy()
        window.location.reload()

    }
    return (
        <socketcontext.Provider value={{
            call, callaccepted, videoReference, uservideoReference, connectionReference,
            stream, name, setname, callended, me, setme, calluser, leavecall, answercall
        }}>
            {children}
        </socketcontext.Provider>
    )
}
export { ContextProvider, socketcontext }