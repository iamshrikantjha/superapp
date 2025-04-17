import { sendMessageToBot } from '@/constants/apiService'
import React, { useState, useCallback, useEffect } from 'react'
import { ImageBackground, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

const WALLPAPER = 'https://w0.peakpx.com/wallpaper/522/552/HD-wallpaper-lionel-messi-football-illllustration-vector-art.jpg'
const BOT_AVATAR = 'https://www.freevector.com/uploads/vector/preview/91217/VecteezyLionel-MessiCharacterIllustration03RA0223_generated.jpg'

export function ChatBotComponent() {
  const [messages, setMessages] = useState([])


  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, I am Messi from Barcelona! Ask me your football questions!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Messi Bot',
          avatar: BOT_AVATAR,
        },
      },
    ])
  }, [])

  const onSend = useCallback(async (newMessages = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages))

    const userMessage = newMessages[0].text

    try {
      const botReplyText = await sendMessageToBot(userMessage)

      const botMessage = {
        _id: Math.random().toString(36).substring(7),
        text: botReplyText,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Messi Bot',
          avatar: BOT_AVATAR,
        },
      }

      setMessages(prevMessages => GiftedChat.append(prevMessages, [botMessage]))
    } catch (err) {
      console.error('Bot error:', err)
    }
  }, [])

  return (
    <ImageBackground
      source={{ uri: WALLPAPER }}
    style={{
      // backgroundColor: 'purple',
      flex: 1,
    }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'You',
        }}
      />
    </ImageBackground>
  )
}
