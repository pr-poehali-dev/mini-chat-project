import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActiveChatId: (id: string) => void;
  privateChats: Map<string, any>;
  isPrivateChatOpen: boolean;
  activeChatId: string;
  onChatSelect: (chatId: string) => void;
}

const ChatTabs = ({
  activeTab,
  setActiveTab,
  setActiveChatId,
  privateChats,
  isPrivateChatOpen,
  activeChatId,
  onChatSelect
}: ChatTabsProps) => {
  return (
    <div className="px-4 pb-2">
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
          <TabsTrigger value="global" className="data-[state=active]:bg-green-600 dark:data-[state=active]:bg-green-600 data-[state=active]:bg-green-500 text-xs h-6">
            Глобальный
          </TabsTrigger>
          <TabsTrigger value="private" className="data-[state=active]:bg-blue-600 dark:data-[state=active]:bg-blue-600 data-[state=active]:bg-blue-500 text-xs h-6">
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
                  ? 'bg-blue-600 dark:bg-blue-600 bg-blue-500 text-white' 
                  : 'hover:bg-slate-600 dark:hover:bg-slate-600 hover:bg-gray-100 text-slate-300 dark:text-slate-300 text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">
                    {username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{username}</div>
                  {chatInfo.lastMessage && (
                    <div className="text-xs text-slate-400 dark:text-slate-400 text-gray-500 truncate">
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