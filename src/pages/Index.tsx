import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Админ', message: 'Добро пожаловать на доску объявлений Discord!', type: 'global', time: '16:12', chatId: 'global' },
    { id: 2, user: 'MikeGamer', message: 'Продаю приват рекламу для MIKU TAG', type: 'global', time: '16:15', chatId: 'global' },
    { id: 3, user: 'YuriMaster', message: 'Ищу партнеров для развития сервера', type: 'global', time: '16:18', chatId: 'global' }
  ]);
  
  const [activeTab, setActiveTab] = useState('global');
  const [activeChatId, setActiveChatId] = useState('global');
  const [newMessage, setNewMessage] = useState('');
  const [privateChats, setPrivateChats] = useState(new Map());
  const [isPrivateChatOpen, setIsPrivateChatOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const servers = [
    {
      id: 1,
      name: 'MIKU TAG',
      url: 'https://discord.gg/mikutag',
      members: 158274,
      price: 200,
      currency: 'USD',
      description: '1000 guaranteed joins...',
      avatar: 'https://cdn.poehali.dev/files/f35b9fb5-8bf1-4fa5-9a49-5f4169d1fa58.png',
      category: 'Socializing',
      clicks: 8,
      favorites: 3,
      pinned: true
    },
    {
      id: 2,
      name: 'YAOI TAG',
      url: 'https://discord.gg/yaoitag',
      members: 91280,
      price: 200,
      currency: 'USD',
      description: '1000 guaranteed joins...',
      avatar: 'https://cdn.poehali.dev/files/d6ff0ab3-d197-48fb-abaf-546b4ac30109.png',
      category: 'Socializing',
      clicks: 0,
      favorites: 1,
      pinned: true
    },
    {
      id: 3,
      name: 'YURI TAG',
      url: 'https://discord.gg/tagyuri',
      members: 67801,
      price: 70,
      currency: 'USD',
      description: 'Ping Prices...',
      avatar: 'https://cdn.poehali.dev/files/b524a5d2-f4b6-428e-905d-c425e695685f.png',
      category: 'Socializing',
      clicks: 0,
      favorites: 0,
      pinned: false
    }
  ];

  const handleUserMention = (username) => {
    if (username !== 'Вы') {
      setNewMessage(prev => prev + `@${username} `);
    }
  };

  const handleSendMessage = () => {
    const now = Date.now();
    const timeSinceLastMessage = now - lastMessageTime;
    const cooldownMs = 5000; // 5 секунд
    
    if (timeSinceLastMessage < cooldownMs) {
      const remaining = Math.ceil((cooldownMs - timeSinceLastMessage) / 1000);
      setCooldownRemaining(remaining);
      
      const timer = setInterval(() => {
        setCooldownRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return;
    }
    
    if (newMessage.trim() && newMessage.length <= 500) {
      const mentionMatch = newMessage.match(/@(\w+)/);
      let targetChatId = activeChatId;
      let messageType = activeTab;
      
      if (mentionMatch) {
        const mentionedUser = mentionMatch[1];
        if (mentionedUser !== 'Вы') {
          targetChatId = `private-${mentionedUser}`;
          messageType = 'private';
          
          if (!privateChats.has(mentionedUser)) {
            setPrivateChats(new Map(privateChats.set(mentionedUser, {
              name: mentionedUser,
              lastMessage: null,
              unread: false
            })));
          }
          
          setActiveTab('private');
          setActiveChatId(targetChatId);
          setIsPrivateChatOpen(true);
        }
      }
      
      const message = {
        id: Date.now(),
        user: 'Вы',
        message: newMessage,
        type: messageType,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        chatId: targetChatId
      };
      
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
      setLastMessageTime(now);
    }
  };

  const filteredMessages = activeTab === 'global' 
    ? chatMessages.filter(msg => msg.type === 'global')
    : chatMessages.filter(msg => msg.chatId === activeChatId);

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId);
    setIsPrivateChatOpen(true);
  };

  const handleBackToChats = () => {
    setIsPrivateChatOpen(false);
  };

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">Discord Ads Board</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Select defaultValue="en">
              <SelectTrigger className="w-16 bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="ru">RU</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="border-slate-600">
              <Icon name="Moon" size={16} className="mr-2" />
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Listing
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleChat}
              className="border-slate-600 hover:bg-slate-700"
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Чат
            </Button>
            <Button variant="destructive">
              <Icon name="LogOut" size={16} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className={`grid gap-6 ${isChatVisible ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {/* Main Content */}
          <div className={isChatVisible ? 'lg:col-span-2' : 'col-span-1'}>
            {/* Navigation Tabs */}
            <div className="mb-6">
              <Tabs defaultValue="listings" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                  <TabsTrigger value="listings">Listings</TabsTrigger>
                  <TabsTrigger value="my-listings">My Listings</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
                
                <TabsContent value="listings" className="mt-6">
                  {/* Filters */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <Select defaultValue="newest">
                      <SelectTrigger className="w-48 bg-slate-800 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-48 bg-slate-800 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        <SelectItem value="socializing">Socializing</SelectItem>
                        <SelectItem value="gaming">Gaming</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="usd">
                      <SelectTrigger className="w-24 bg-slate-800 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                        <SelectItem value="rub">RUB</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" className="border-slate-600">
                      <Icon name="Grid" size={16} />
                    </Button>
                    <Button variant="outline" className="border-slate-600">
                      Reset
                    </Button>
                  </div>

                  {/* Server Cards */}
                  <div className="space-y-4">
                    {servers.map((server) => (
                      <Card key={server.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={server.avatar} alt={server.name} />
                              <AvatarFallback>{server.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-bold text-lg">{server.name}</h3>
                                {server.pinned && (
                                  <Badge variant="secondary" className="bg-orange-600 text-white">
                                    <Icon name="Pin" size={12} className="mr-1" />
                                    Pinned
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-4 text-sm text-slate-400 mb-3">
                                <span className="flex items-center">
                                  <Icon name="Users" size={14} className="mr-1" />
                                  {server.members.toLocaleString()} members
                                </span>
                                <span className="flex items-center">
                                  <Icon name="MousePointer" size={14} className="mr-1" />
                                  {server.clicks} clicks
                                </span>
                                <span className="flex items-center">
                                  <Icon name="Heart" size={14} className="mr-1" />
                                  {server.favorites} in favorites
                                </span>
                              </div>
                              
                              <p className="text-slate-300 mb-4">{server.description}</p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                                    {server.category}
                                  </Badge>
                                  <Button variant="outline" size="sm" className="border-slate-600">
                                    <Icon name="ExternalLink" size={14} className="mr-1" />
                                    Visit Server
                                  </Button>
                                  <Button variant="outline" size="sm" className="border-slate-600">
                                    Contact
                                  </Button>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <Icon name="Heart" size={16} />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Icon name="Edit" size={16} />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Icon name="Trash2" size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-400">
                                {server.price} {server.currency}
                              </div>
                              <p className="text-sm text-slate-400">Socializing</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="my-listings">
                  <div className="text-center py-12">
                    <Icon name="Plus" size={48} className="mx-auto mb-4 text-slate-600" />
                    <h3 className="text-lg font-semibold mb-2">Нет активных объявлений</h3>
                    <p className="text-slate-400 mb-4">Создайте первое объявление для вашего сервера</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Создать объявление
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="favorites">
                  <div className="text-center py-12">
                    <Icon name="Heart" size={48} className="mx-auto mb-4 text-slate-600" />
                    <h3 className="text-lg font-semibold mb-2">Избранное пусто</h3>
                    <p className="text-slate-400">Добавьте серверы в избранное для быстрого доступа</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Chat Sidebar */}
          {isChatVisible && (
            <div className="lg:col-span-1">
              <Card className="bg-slate-800 border-slate-700 h-[600px] flex flex-col">
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
                        onClick={handleBackToChats}
                        className="text-slate-400 hover:text-white"
                      >
                        <Icon name="ArrowLeft" size={16} className="mr-1" />
                        Все чаты
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleChat}
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
                    setIsPrivateChatOpen(false);
                  } else if (privateChats.size > 0) {
                    const firstPrivateChat = Array.from(privateChats.keys())[0];
                    setActiveChatId(`private-${firstPrivateChat}`);
                    setIsPrivateChatOpen(false);
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
                        onClick={() => handleChatSelect(`private-${username}`)}
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
              
              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto px-6 space-y-3">
                  {(activeTab === 'global' || (activeTab === 'private' && isPrivateChatOpen)) && filteredMessages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="text-xs bg-slate-700">
                          {msg.user.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span 
                            className="font-semibold text-sm cursor-pointer hover:text-blue-400 transition-colors"
                            onClick={() => handleUserMention(msg.user)}
                          >
                            {msg.user}
                          </span>
                          <span className="text-xs text-slate-400">{msg.time}</span>
                        </div>
                        <p className="text-sm text-slate-300 break-words whitespace-pre-wrap">
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
                
                <div className="p-4 border-t border-slate-700">
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Сообщение... (@ для упоминаний)"
                        value={newMessage}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            setNewMessage(e.target.value);
                          }
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        className="bg-slate-700 border-slate-600 focus:border-blue-500 pr-12"
                        disabled={cooldownRemaining > 0}
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">
                        {newMessage.length}/500
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendMessage} 
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;