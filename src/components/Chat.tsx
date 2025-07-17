import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface ChatMessage {
  id: number;
  user: string;
  message: string;
  type: string;
  time: string;
  chatId: string;
}

interface ChatProps {
  isVisible: boolean;
  onClose: () => void;
  chatMessages: ChatMessage[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  privateChats: Map<string, any>;
  isPrivateChatOpen: boolean;
  onSendMessage: () => void;
  onUserMention: (username: string) => void;
  onChatSelect: (chatId: string) => void;
  onBackToChats: () => void;
  cooldownRemaining: number;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const Chat = ({
  isVisible,
  onClose,
  chatMessages,
  activeTab,
  setActiveTab,
  activeChatId,
  setActiveChatId,
  newMessage,
  setNewMessage,
  privateChats,
  isPrivateChatOpen,
  onSendMessage,
  onUserMention,
  onChatSelect,
  onBackToChats,
  cooldownRemaining,
  isFullscreen = false,
  onToggleFullscreen
}: ChatProps) => {
  if (!isVisible) return null;

  const filteredMessages = activeTab === 'global' 
    ? chatMessages.filter(msg => msg.type === 'global')
    : chatMessages.filter(msg => msg.chatId === activeChatId);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 hidden lg:block">
        <Card className="bg-slate-800 border-slate-700 h-full flex flex-col rounded-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {isPrivateChatOpen && activeTab === 'private' && activeChatId !== 'global' 
                  ? `Чат с ${activeChatId.replace('private-', '')}`
                  : 'Чат (Полноэкранный режим)'
                }
              </CardTitle>
              <div className="flex items-center space-x-2">
                {isPrivateChatOpen && activeTab === 'private' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onBackToChats}
                    className="text-slate-400 hover:text-white"
                  >
                    <Icon name="ArrowLeft" size={16} className="mr-1" />
                    Все чаты
                  </Button>
                )}
                {onToggleFullscreen && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleFullscreen}
                    className="text-slate-400 hover:text-white"
                  >
                    <Icon name="Minimize2" size={16} />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <div className="px-6 pb-3">
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value);
              if (value === 'global') {
                setActiveChatId('global');
              } else if (privateChats.size > 0) {
                const firstPrivateChat = Array.from(privateChats.keys())[0];
                setActiveChatId(`private-${firstPrivateChat}`);
              }
            }}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                <TabsTrigger value="global" className="data-[state=active]:bg-green-600">
                  Глобальный
                </TabsTrigger>
                <TabsTrigger value="private" className="data-[state=active]:bg-blue-600">
                  Приватный
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {activeTab === 'private' && !isPrivateChatOpen && (
              <div className="mt-3 space-y-1">
                {Array.from(privateChats.entries()).map(([username, chatInfo]) => (
                  <button
                    key={username}
                    onClick={() => onChatSelect(`private-${username}`)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeChatId === `private-${username}` 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-slate-600 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {username.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{username}</span>
                    </div>
                  </button>
                ))}
                {privateChats.size === 0 && (
                  <p className="text-sm text-slate-400 text-center py-4">
                    Нет приватных чатов
                  </p>
                )}
              </div>
            )}
          </div>
          
          <CardContent className="flex-1 flex flex-col p-0 min-h-0">
            <div className="flex-1 overflow-y-auto px-3 md:px-6 py-2 scroll-smooth min-h-0">
              {(activeTab === 'global' || (activeTab === 'private' && isPrivateChatOpen)) && filteredMessages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3 max-w-full mb-3 last:mb-0">
                  <Avatar className="w-6 h-6 md:w-8 md:h-8 mt-1 flex-shrink-0">
                    <AvatarFallback className="text-xs bg-slate-700">
                      {msg.user.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 max-w-full">
                    <div className="flex items-center space-x-2 mb-1">
                      <span 
                        className="font-semibold text-sm cursor-pointer hover:text-blue-400 transition-colors"
                        onClick={() => onUserMention(msg.user)}
                      >
                        {msg.user}
                      </span>
                      <span className="text-xs text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-sm text-slate-300 break-words word-wrap break-all whitespace-pre-wrap overflow-hidden max-w-full hyphens-auto">
                      {msg.message.split(/(@\w+)/g).map((part, index) => {
                        if (part.startsWith('@')) {
                          return (
                            <span key={index} className="text-blue-400 font-medium">
                              {part}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-2 md:p-4 border-t border-slate-700">
              <div className="flex space-x-1 md:space-x-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Сообщение... (@ для упоминаний)"
                    value={newMessage}
                    onChange={(e) => {
                      if (e.target.value.length <= 500) {
                        setNewMessage(e.target.value);
                      }
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && onSendMessage()}
                    className="bg-slate-700 border-slate-600 focus:border-blue-500 pr-12"
                    disabled={cooldownRemaining > 0}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">
                    {newMessage.length}/500
                  </div>
                </div>
                <Button 
                  onClick={onSendMessage} 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={cooldownRemaining > 0 || newMessage.length > 500 || !newMessage.trim()}
                >
                  {cooldownRemaining > 0 ? (
                    <span className="text-sm">{cooldownRemaining}s</span>
                  ) : (
                    <Icon name="Send" size={16} />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1">
      <Card className="bg-slate-800 border-slate-700 h-[400px] md:h-[600px] flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {isPrivateChatOpen && activeTab === 'private' && activeChatId !== 'global' 
                ? `Чат с ${activeChatId.replace('private-', '')}`
                : 'Чат'
              }
            </CardTitle>
            <div className="flex items-center space-x-2">
              {isPrivateChatOpen && activeTab === 'private' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBackToChats}
                  className="text-slate-400 hover:text-white"
                >
                  <Icon name="ArrowLeft" size={16} className="mr-1" />
                  Все чаты
                </Button>
              )}
              {onToggleFullscreen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleFullscreen}
                  className="text-slate-400 hover:text-white hidden lg:flex"
                >
                  <Icon name="Maximize2" size={16} />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <div className="px-6 pb-3">
          <Tabs value={activeTab} onValueChange={(value) => {
            setActiveTab(value);
            if (value === 'global') {
              setActiveChatId('global');
            } else if (privateChats.size > 0) {
              const firstPrivateChat = Array.from(privateChats.keys())[0];
              setActiveChatId(`private-${firstPrivateChat}`);
            }
          }}>
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger value="global" className="data-[state=active]:bg-green-600">
                Глобальный
              </TabsTrigger>
              <TabsTrigger value="private" className="data-[state=active]:bg-blue-600">
                Приватный
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          {activeTab === 'private' && !isPrivateChatOpen && (
            <div className="mt-3 space-y-1">
              {Array.from(privateChats.entries()).map(([username, chatInfo]) => (
                <button
                  key={username}
                  onClick={() => onChatSelect(`private-${username}`)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeChatId === `private-${username}` 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {username.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{username}</span>
                  </div>
                </button>
              ))}
              {privateChats.size === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">
                  Нет приватных чатов
                </p>
              )}
            </div>
          )}
        </div>
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          <div className="flex-1 overflow-y-auto px-3 md:px-6 py-2 scroll-smooth min-h-0">
            {(activeTab === 'global' || (activeTab === 'private' && isPrivateChatOpen)) && filteredMessages.map((msg) => (
              <div key={msg.id} className="flex items-start space-x-3 max-w-full mb-3 last:mb-0">
                <Avatar className="w-6 h-6 md:w-8 md:h-8 mt-1 flex-shrink-0">
                  <AvatarFallback className="text-xs bg-slate-700">
                    {msg.user.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 max-w-full">
                  <div className="flex items-center space-x-2 mb-1">
                    <span 
                      className="font-semibold text-sm cursor-pointer hover:text-blue-400 transition-colors"
                      onClick={() => onUserMention(msg.user)}
                    >
                      {msg.user}
                    </span>
                    <span className="text-xs text-slate-400">{msg.time}</span>
                  </div>
                  <p className="text-sm text-slate-300 break-words word-wrap break-all whitespace-pre-wrap overflow-hidden max-w-full hyphens-auto">
                    {msg.message.split(/(@\w+)/g).map((part, index) => {
                      if (part.startsWith('@')) {
                        return (
                          <span key={index} className="text-blue-400 font-medium">
                            {part}
                          </span>
                        );
                      }
                      return part;
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-2 md:p-4 border-t border-slate-700">
            <div className="flex space-x-1 md:space-x-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Сообщение... (@ для упоминаний)"
                  value={newMessage}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) {
                      setNewMessage(e.target.value);
                    }
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && onSendMessage()}
                  className="bg-slate-700 border-slate-600 focus:border-blue-500 pr-12"
                  disabled={cooldownRemaining > 0}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">
                  {newMessage.length}/500
                </div>
              </div>
              <Button 
                onClick={onSendMessage} 
                className="bg-green-600 hover:bg-green-700"
                disabled={cooldownRemaining > 0 || newMessage.length > 500 || !newMessage.trim()}
              >
                {cooldownRemaining > 0 ? (
                  <span className="text-sm">{cooldownRemaining}s</span>
                ) : (
                  <Icon name="Send" size={16} />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;