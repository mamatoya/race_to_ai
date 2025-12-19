import { useState, useCallback } from 'react';
import type { Message } from '../types';

const mockResponses = [
  "Hi there! I'm Dreamy, your friendly robot companion. How can I help you today?",
  "That's a great question! Let me think about it... *whirring sounds*",
  "Oh, that sounds fun! I love learning new things!",
  "Did you know I can explore the dream world? Click 'Let me explore!' to see me walk around!",
  "I'm always here to chat! What's on your mind?",
  "Beep boop! That's robot for 'I understand!' Just kidding, I speak human too!",
  "The dream world is full of magical orbs to collect. Want to see me find some?",
  "I've been practicing my dance moves. Maybe I'll show you sometime!",
  "*waves excitedly* Thanks for chatting with me!",
  "Every day is a new adventure in the dream realm!",
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Dreamy, your friendly robot companion. Ask me anything, or let me explore the dream world!",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Hi! I'm Dreamy, your friendly robot companion. Ask me anything, or let me explore the dream world!",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
}
