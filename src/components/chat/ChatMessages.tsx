import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { ChatMessage } from './types';

interface ChatMessagesProps {
  filteredMessages: ChatMessage[];
  activeTab: string;
  isPrivateChatOpen: boolean;
  blockedUsers: Set<string>;
  blockedCount: number;
  onUserMention: (username: string) => void;
  onBlockUser: (username: string) => void;
  onUnblockUser: (username: string) => void;
}

const ChatMessages = ({
  filteredMessages,
  activeTab,
  isPrivateChatOpen,
  blockedUsers,
  blockedCount,
  onUserMention,
  onBlockUser,
  onUnblockUser
}: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-3 md:px-6 py-2 scroll-smooth min-h-0">
      {/* Заблокированные сообщения */}
      {blockedCount > 0 && (
        <div className="mb-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-slate-400" />
              <span className="text-sm text-slate-400">
                {blockedCount} заблокированных сообщения
              </span>
            </div>
            <button 
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => {
                // Показать заблокированные сообщения
              }}
            >
              Открыть
            </button>
          </div>
        </div>
      )}
      
      {(activeTab === 'global' || (activeTab === 'private' && isPrivateChatOpen)) && filteredMessages.map((msg) => {
        const isBlocked = blockedUsers.has(msg.user);
        
        if (isBlocked) {
          return (
            <div key={msg.id} className="mb-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-slate-400" />
                  <span className="text-sm text-slate-400">
                    1 заблокированное сообщение
                  </span>
                </div>
                <button 
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={() => onUnblockUser(msg.user)}
                >
                  Открыть
                </button>
              </div>
            </div>
          );
        }
        
        return (
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
                {activeTab === 'private' && msg.user !== 'Вы' && (
                  <button
                    onClick={() => onBlockUser(msg.user)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors ml-2"
                  >
                    Блок
                  </button>
                )}
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
        );
      })}
    </div>
  );
};

export default ChatMessages;