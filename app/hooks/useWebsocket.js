import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMessageFromWebSocket, fetchMessageById } from '../redux/slice/chatSlice';
import { URL } from '../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useWebsocket = (chatId) => {
  const socket = useRef(null);
  const dispatch = useDispatch();
  const reconnectInterval = useRef(null);

  useEffect(() => {
    if (!chatId) return;

    const connectWebSocket = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (!token) {
        console.error('Token not found!');
        return;
      }

      socket.current = new WebSocket(`ws://${URL}/ws/${chatId}?token=${token}`);

      socket.current.onmessage = async (event) => {
        try {
          const message_id = event.data;
          if (message_id) {
            const response = await dispatch(fetchMessageById(message_id));
            dispatch(addMessageFromWebSocket({ chatId, message: response.payload }));
          }
        } catch (error) {
          console.error('Error handling WebSocket message:', error);
        }
      };

      socket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socket.current.onclose = (event) => {
        console.warn('WebSocket closed:', event.reason);

        reconnectInterval.current = setTimeout(() => {
          console.log('Reconnecting WebSocket...');
          connectWebSocket();
        }, 5000);
      };
    };

    connectWebSocket();

    return () => {
      if (reconnectInterval.current) {
        clearTimeout(reconnectInterval.current);
      }
      if (socket.current && socket.current.readyState === WebSocket.OPEN) {
        socket.current.close();
      }
    };
  }, [chatId]);

  return socket.current;
};
