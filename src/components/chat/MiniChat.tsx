import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  text: string;
  time: string;
  sender: string;
  isOwn?: boolean;
}

interface PrivateChat {
  id: string;
  participantName: string;
  messages: Message[];
  lastMessage: string;
  time: string;
}

const MiniChat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'private'>('global');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  // Моковые данные для глобального чата
  const globalMessages: Message[] = [
    {
      id: '1',
      text: 'Гурман: куплю рубины 500/2, лед 100/5, желтовласт 1/2, алогон 1/1, воркето 100/40',
      time: '18:17',
      sender: 'Гурман'
    },
    {
      id: '2',
      text: 'Гурман: куплю рубины 500/2, лед 100/5, желтовласт 1/2, алогон 1/1, воркето 100/35',
      time: '18:16',
      sender: 'Гурман'
    }
  ];

  // Моковые данные для приватных чатов
  const privateChats: PrivateChat[] = [
    {
      id: '1',
      participantName: 'Игрок123',
      lastMessage: 'Привет! Как дела?',
      time: '18:15',
      messages: [
        { id: '1', text: 'Привет!', time: '18:10', sender: 'Игрок123' },
        { id: '2', text: 'Привет! Как дела?', time: '18:11', sender: 'Игрок123' },
        { id: '3', text: 'Все отлично, спасибо!', time: '18:12', sender: 'Ты', isOwn: true }
      ]
    },
    {
      id: '2',
      participantName: 'Торговец',
      lastMessage: 'Есть рубины?',
      time: '18:05',
      messages: [
        { id: '1', text: 'Есть рубины?', time: '18:05', sender: 'Торговец' },
        { id: '2', text: 'Да, есть 200 штук', time: '18:06', sender: 'Ты', isOwn: true }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Здесь будет логика отправки сообщения
      console.log('Отправка сообщения:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
        {/* Вкладки */}
        <div className="flex border-b border-gray-200 dark:border-slate-700">
          <Button
            variant={activeTab === 'global' ? 'default' : 'ghost'}
            className={`flex-1 rounded-none rounded-tl-md ${
              activeTab === 'global' 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('global')}
          >
            Глобальный
          </Button>
          <Button
            variant={activeTab === 'private' ? 'default' : 'ghost'}
            className={`flex-1 rounded-none rounded-tr-md ${
              activeTab === 'private' 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('private')}
          >
            Приватный
          </Button>
        </div>

        {/* Контент чата */}
        <div className="h-64 overflow-y-auto p-3 bg-gray-50 dark:bg-slate-900">
          {activeTab === 'global' && (
            <div className="space-y-3">
              {globalMessages.map((message) => (
                <div key={message.id} className="text-sm">
                  <div className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                    {message.time}
                  </div>
                  <div className="text-gray-900 dark:text-gray-100">
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'private' && !selectedChat && (
            <div className="space-y-2">
              {privateChats.map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        {chat.participantName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {chat.lastMessage}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {chat.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'private' && selectedChat && (
            <div>
              <div className="flex items-center mb-3 pb-2 border-b border-gray-200 dark:border-slate-700">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedChat(null)}
                  className="p-1 h-auto"
                >
                  <Icon name="ArrowLeft" size={16} />
                </Button>
                <span className="ml-2 font-medium text-sm text-gray-900 dark:text-gray-100">
                  {privateChats.find(c => c.id === selectedChat)?.participantName}
                </span>
              </div>
              <div className="space-y-3">
                {privateChats
                  .find(c => c.id === selectedChat)
                  ?.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-2 rounded-lg text-sm ${
                          message.isOwn
                            ? 'bg-green-600 text-white'
                            : 'bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-slate-700'
                        }`}
                      >
                        <div>{message.text}</div>
                        <div className={`text-xs mt-1 ${
                          message.isOwn 
                            ? 'text-green-100' 
                            : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Поле ввода */}
        <div className="p-3 border-t border-gray-200 dark:border-slate-700">
          <div className="flex gap-2">
            <Input
              placeholder="Сообщение... (@ для упоминаний)"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-sm"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MiniChat;