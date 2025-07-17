import { useState } from 'react';
import Header from '@/components/Header';
import ServerListing from '@/components/ServerListing';
import Chat from '@/components/Chat';


const Index = () => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Админ', message: 'Добро пожаловать на доску объявлений Discord!', type: 'global', time: '16:12', chatId: 'global' },
    { id: 2, user: 'MikeGamer', message: 'Продаю приват рекламу для MIKU TAG', type: 'global', time: '16:15', chatId: 'global' },
    { id: 3, user: 'TestUser', message: 'Первое сообщение от заблокированного пользователя', type: 'global', time: '16:16', chatId: 'global' },
    { id: 4, user: 'TestUser', message: 'Второе сообщение подряд', type: 'global', time: '16:17', chatId: 'global' },
    { id: 5, user: 'TestUser', message: 'Третье сообщение в группе', type: 'global', time: '16:18', chatId: 'global' },
    { id: 6, user: 'YuriMaster', message: 'Ищу партнеров для развития сервера', type: 'global', time: '16:19', chatId: 'global' },
    { id: 7, user: 'TestUser', message: 'Еще одно сообщение после перерыва', type: 'global', time: '16:20', chatId: 'global' },
    { id: 8, user: 'MikeGamer', message: 'Привет! Интересуешься рекламой?', type: 'private', time: '16:21', chatId: 'private-MikeGamer' },
    { id: 9, user: 'YuriMaster', message: 'Здравствуй! Есть предложение по сотрудничеству', type: 'private', time: '16:22', chatId: 'private-YuriMaster' }
  ]);
  
  const [activeTab, setActiveTab] = useState('global');
  const [activeChatId, setActiveChatId] = useState('global');
  const [newMessage, setNewMessage] = useState('');
  const [privateChats, setPrivateChats] = useState(new Map([
    ['MikeGamer', { name: 'MikeGamer', lastMessage: 'Привет! Интересуешься рекламой?', lastMessageFrom: 'MikeGamer', unread: false }],
    ['YuriMaster', { name: 'YuriMaster', lastMessage: 'Здравствуй! Есть предложение по сотрудничеству', lastMessageFrom: 'YuriMaster', unread: false }]
  ]));
  const [isPrivateChatOpen, setIsPrivateChatOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [isChatFullscreen, setIsChatFullscreen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState(new Set(['TestUser']));
  const [showBlockedMessages, setShowBlockedMessages] = useState(new Set());
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [globalUnreadCount, setGlobalUnreadCount] = useState(2);
  const [privateUnreadCount, setPrivateUnreadCount] = useState(3);

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

  const handleUserMention = (username: string) => {
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
              lastMessageFrom: null,
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
      
      // Обновляем последнее сообщение для приватного чата
      if (messageType === 'private') {
        const chatUser = targetChatId.replace('private-', '');
        setPrivateChats(new Map(privateChats.set(chatUser, {
          name: chatUser,
          lastMessage: message.message,
          lastMessageFrom: message.user,
          unread: false
        })));
      }
      
      setNewMessage('');
      setLastMessageTime(now);
      
      // Сбрасываем счетчики при отправке сообщения
      if (messageType === 'global') {
        setGlobalUnreadCount(0);
      } else {
        setPrivateUnreadCount(prev => Math.max(0, prev - 1));
      }
    }
  };

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    setIsPrivateChatOpen(true);
  };

  const handleBackToChats = () => {
    setIsPrivateChatOpen(false);
  };

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
    if (!isChatVisible) {
      setIsChatFullscreen(false);
    }
  };

  const toggleChatFullscreen = () => {
    setIsChatFullscreen(!isChatFullscreen);
  };

  const handleBlockUser = (username: string) => {
    setBlockedUsers(new Set([...blockedUsers, username]));
  };

  const handleUnblockUser = (username: string) => {
    const newBlockedUsers = new Set(blockedUsers);
    newBlockedUsers.delete(username);
    setBlockedUsers(newBlockedUsers);
  };

  const getBlockedMessageCount = (chatId: string) => {
    if (chatId === 'global') {
      return chatMessages.filter(msg => msg.type === 'global' && blockedUsers.has(msg.user)).length;
    }
    const username = chatId.replace('private-', '');
    return chatMessages.filter(msg => msg.chatId === chatId && blockedUsers.has(msg.user)).length;
  };

  const handleToggleBlockedMessages = (chatId: string) => {
    const newShowBlockedMessages = new Set(showBlockedMessages);
    if (newShowBlockedMessages.has(chatId)) {
      newShowBlockedMessages.delete(chatId);
    } else {
      newShowBlockedMessages.add(chatId);
    }
    setShowBlockedMessages(newShowBlockedMessages);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Сбрасываем счетчики при переключении на вкладку
    if (tab === 'global') {
      setGlobalUnreadCount(0);
    } else {
      setPrivateUnreadCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-900 bg-gray-50 text-white dark:text-white text-gray-900">
      <Header onToggleChat={toggleChat} />
      
      <div className="max-w-7xl mx-auto p-3 md:p-6">
        <div className={`grid gap-3 md:gap-6 ${isChatVisible ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {/* Chat Sidebar - показывается первым на мобильных */}
          <div className={`order-1 lg:order-2 ${isChatVisible ? 'block' : 'hidden'}`}>
            <Chat
              isVisible={isChatVisible}
              onClose={toggleChat}
              chatMessages={chatMessages}
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              activeChatId={activeChatId}
              setActiveChatId={setActiveChatId}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              privateChats={privateChats}
              isPrivateChatOpen={isPrivateChatOpen}
              onSendMessage={handleSendMessage}
              onUserMention={handleUserMention}
              onChatSelect={handleChatSelect}
              onBackToChats={handleBackToChats}
              cooldownRemaining={cooldownRemaining}
              isFullscreen={isChatFullscreen}
              onToggleFullscreen={toggleChatFullscreen}
              blockedUsers={blockedUsers}
              onBlockUser={handleBlockUser}
              onUnblockUser={handleUnblockUser}
              getBlockedMessageCount={getBlockedMessageCount}
              showBlockedMessages={showBlockedMessages}
              onToggleBlockedMessages={handleToggleBlockedMessages}
              globalUnreadCount={globalUnreadCount}
              privateUnreadCount={privateUnreadCount}
            />
          </div>

          {/* Main Content - показывается вторым на мобильных */}
          <div className={`order-2 lg:order-1 ${isChatVisible ? 'lg:col-span-2' : 'col-span-1'}`}>
            <ServerListing servers={servers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;