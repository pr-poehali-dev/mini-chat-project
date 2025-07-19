import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUnreadCount } from '@/hooks/useUnreadCount';
import Icon from '@/components/ui/icon';

interface ChatTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActiveChatId: (id: string) => void;
  privateChats: Map<string, any>;
  isPrivateChatOpen: boolean;
  activeChatId: string;
  onChatSelect: (chatId: string) => void;
  globalUnreadCount?: number;
  privateUnreadCount?: number;
}

const ChatTabs = ({
  activeTab,
  setActiveTab,
  setActiveChatId,
  privateChats,
  isPrivateChatOpen,
  activeChatId,
  onChatSelect,
  globalUnreadCount = 0,
  privateUnreadCount = 0
}: ChatTabsProps) => {
  // Подготавливаем данные чатов для хука
  const chatsForUnreadCount = Array.from(privateChats.entries()).map(([id, chatInfo]) => ({
    id,
    unreadCount: chatInfo.unreadCount || 0
  }));
  
  // Добавляем глобальный чат
  chatsForUnreadCount.push({
    id: 'global',
    unreadCount: globalUnreadCount
  });
  
  // Используем хук для обновления favicon с передачей активного чата
  const { markAsRead, totalUnreadCount } = useUnreadCount({ 
    chats: chatsForUnreadCount,
    activeChatId 
  });

  return (
    <div className="px-4 pb-2">
      {/* Кнопка для сброса всех уведомлений */}
      {totalUnreadCount > 0 && (
        <div className="mb-2 flex justify-end">
          <Button
            onClick={() => markAsRead()}
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500 hover:text-gray-700 h-6 px-2"
          >
            <Icon name="CheckCheck" size={12} className="mr-1" />
            Отметить все как прочитанное
          </Button>
        </div>
      )}
      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value);
        if (value === 'global') {
          setActiveChatId('global');
        } else if (privateChats.size > 0) {
          const firstPrivateChat = Array.from(privateChats.keys())[0];
          setActiveChatId(`private-${firstPrivateChat}`);
        }
      }}>
        <TabsList className="grid w-full grid-cols-2 bg-slate-700 dark:bg-slate-700 bg-gray-100 h-8">
          <TabsTrigger value="global" className="data-[state=active]:bg-green-600 dark:data-[state=active]:bg-green-600 data-[state=active]:bg-green-500 text-xs h-6 relative">
            Глобальный
            {globalUnreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                {globalUnreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="private" className="data-[state=active]:bg-slate-600 dark:data-[state=active]:bg-slate-600 text-xs h-6 relative">
            Приватный
            {privateUnreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center animate-pulse">
                {privateUnreadCount}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {activeTab === 'private' && !isPrivateChatOpen && (
        <div className="mt-3 space-y-1">
          {Array.from(privateChats.entries()).map(([username, chatInfo]) => (
            <button
              key={username}
              onClick={() => onChatSelect(`private-${username}`)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-300 relative ${
                activeChatId === `private-${username}` 
                  ? 'bg-slate-600 dark:bg-slate-600 text-white' 
                  : 'hover:bg-slate-600 dark:hover:bg-slate-600 hover:bg-gray-100 text-slate-300 dark:text-slate-300 text-gray-700'
              } ${
                chatInfo.unreadCount > 0 ? 'ring-2 ring-red-400 ring-opacity-40 shadow-lg shadow-red-400/20 bg-gradient-to-r from-red-500/10 to-transparent' : ''
              }`}
            >
              {/* Красный индикатор слева для непрочитанных сообщений */}
              {chatInfo.unreadCount > 0 && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 rounded-l-md"></div>
              )}
              <div className="flex items-center space-x-2">
                {/* Красная точка-индикатор справа для непрочитанных сообщений */}
                {chatInfo.unreadCount > 0 && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">
                    {username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-sm flex items-center ${
                    chatInfo.unreadCount > 0 ? 'text-white' : ''
                  }`}>
                    <span className="truncate">{username}</span>
                  </div>
                  {chatInfo.lastMessage && (
                    <div className={`text-xs truncate ${
                      chatInfo.unreadCount > 0 
                        ? 'text-red-100 font-medium' 
                        : 'text-slate-400 dark:text-slate-400 text-gray-500'
                    }`}>
                      {chatInfo.lastMessageFrom === 'Вы' ? 'Вы: ' : ''}{chatInfo.lastMessage}
                    </div>
                  )}
                </div>
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
  );
};

export default ChatTabs;