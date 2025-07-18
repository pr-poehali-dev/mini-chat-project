import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { ChatMessage } from './types';

interface ChatMessagesProps {
  filteredMessages: ChatMessage[];
  activeTab: string;
  isPrivateChatOpen: boolean;
  blockedUsers: Set<string>;
  blockedCount: number;
  activeChatId: string;
  showBlockedMessages?: Set<string>;
  onUserMention: (username: string) => void;
  onBlockUser: (username: string) => void;
  onUnblockUser: (username: string) => void;
  onToggleBlockedMessages: (chatId: string) => void;
}

const ChatMessages = ({
  filteredMessages,
  activeTab,
  isPrivateChatOpen,
  blockedUsers,
  blockedCount,
  activeChatId,
  showBlockedMessages,
  onUserMention,
  onBlockUser,
  onUnblockUser,
  onToggleBlockedMessages
}: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-3 md:px-6 py-2 scroll-smooth min-h-0">
      {/* Заблокированные сообщения */}
      {blockedCount > 0 && (
        <div className="mb-3 p-3 bg-slate-700/50 dark:bg-slate-700/50 bg-gray-100 rounded-lg border border-slate-600 dark:border-slate-600 border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-slate-400 dark:text-slate-400 text-gray-500" />
              <span className="text-sm text-slate-400 dark:text-slate-400 text-gray-600">
                {blockedCount} заблокированных сообщения
              </span>
            </div>
            <button 
              className="text-xs text-blue-400 dark:text-blue-400 text-blue-600 hover:text-blue-300 dark:hover:text-blue-300 hover:text-blue-500 transition-colors"
              onClick={() => onToggleBlockedMessages(activeChatId)}
            >
              {showBlockedMessages?.has(activeChatId) ? 'Скрыть' : 'Открыть'}
            </button>
          </div>
        </div>
      )}
      
      {(activeTab === 'global' || (activeTab === 'private' && isPrivateChatOpen)) && (() => {
        const groupedMessages = [];
        let currentBlockedGroup = null;
        
        for (let i = 0; i < filteredMessages.length; i++) {
          const msg = filteredMessages[i];
          const isBlocked = blockedUsers.has(msg.user);
          
          if (isBlocked) {
            if (showBlockedMessages?.has(activeChatId)) {
              if (currentBlockedGroup && currentBlockedGroup.user === msg.user) {
                // Добавляем к текущей группе
                currentBlockedGroup.messages.push(msg);
              } else {
                // Завершаем предыдущую группу и начинаем новую
                if (currentBlockedGroup) {
                  groupedMessages.push(currentBlockedGroup);
                }
                currentBlockedGroup = {
                  type: 'blocked',
                  user: msg.user,
                  messages: [msg]
                };
              }
            } else {
              // Скрытое заблокированное сообщение
              if (currentBlockedGroup) {
                groupedMessages.push(currentBlockedGroup);
                currentBlockedGroup = null;
              }
            }
          } else {
            // Обычное сообщение
            if (currentBlockedGroup) {
              groupedMessages.push(currentBlockedGroup);
              currentBlockedGroup = null;
            }
            groupedMessages.push({
              type: 'normal',
              message: msg
            });
          }
        }
        
        // Добавляем последнюю группу если есть
        if (currentBlockedGroup) {
          groupedMessages.push(currentBlockedGroup);
        }
        
        return groupedMessages.map((group, index) => {
          if (group.type === 'blocked') {
            const messageCount = group.messages.length;
            return (
              <div key={`blocked-${group.user}-${index}`} className="mb-3 p-3 bg-slate-700/30 dark:bg-slate-700/30 bg-red-50 rounded-lg border border-slate-600 dark:border-slate-600 border-red-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} className="text-slate-400 dark:text-slate-400 text-red-500" />
                    <span className="text-sm text-slate-400 dark:text-slate-400 text-red-600">
                      {messageCount > 1 
                        ? `${messageCount} заблокированных сообщения от ${group.user}`
                        : `Заблокированное сообщение от ${group.user}`
                      }
                    </span>
                  </div>
                  <button 
                    className="text-xs text-red-400 dark:text-red-400 text-red-600 hover:text-red-300 dark:hover:text-red-300 hover:text-red-700 transition-colors"
                    onClick={() => onUnblockUser(group.user)}
                  >
                    Разблокировать
                  </button>
                </div>
                <div className="flex items-start space-x-3">
                  <Avatar className="w-6 h-6 md:w-8 md:h-8 mt-1 flex-shrink-0">
                    <AvatarFallback className="text-xs bg-slate-700 dark:bg-slate-700 bg-gray-200">
                      {group.user.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 max-w-full">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm text-slate-500 dark:text-slate-500 text-gray-700">
                        {group.user}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-400 text-gray-500">{group.messages[0].time}</span>
                      {messageCount > 1 && (
                        <span className="text-xs text-slate-500 dark:text-slate-500 text-gray-600">
                          - {group.messages[messageCount - 1].time}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {group.messages.map((msg, msgIndex) => (
                        <div key={msg.id} className={msgIndex > 0 ? 'border-t border-slate-600 dark:border-slate-600 border-gray-300 pt-2' : ''}>
                          {messageCount > 1 && (
                            <div className="text-xs text-slate-500 dark:text-slate-500 text-gray-600 mb-1">{msg.time}</div>
                          )}
                          <p className="text-sm text-slate-400 dark:text-slate-400 text-gray-600 break-words word-wrap break-all whitespace-pre-wrap overflow-hidden max-w-full hyphens-auto">
                            {msg.message.split(/(@\w+)/g).map((part, partIndex) => {
                              if (part.startsWith('@')) {
                                return (
                                  <span key={partIndex} className="text-blue-400 dark:text-blue-400 text-blue-600 font-medium">
                                    {part}
                                  </span>
                                );
                              }
                              return part;
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            const msg = group.message;
            return (
              <div key={msg.id} className="flex items-start space-x-3 max-w-full mb-3 last:mb-0">
                <Avatar className="w-6 h-6 md:w-8 md:h-8 mt-1 flex-shrink-0">
                  <AvatarFallback className="text-xs bg-slate-700 dark:bg-slate-700 bg-gray-200">
                    {msg.user.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 max-w-full">
                  <div className="flex items-center space-x-2 mb-1">
                    <span 
                      className="font-semibold text-sm cursor-pointer text-white dark:text-white text-gray-900 hover:text-blue-400 dark:hover:text-blue-400 hover:text-blue-600 transition-colors"
                      onClick={() => onUserMention(msg.user)}
                    >
                      {msg.user}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-400 text-gray-500">{msg.time}</span>
                    {msg.user !== 'Вы' && (
                      <button
                        onClick={() => onBlockUser(msg.user)}
                        className="text-xs text-red-400 dark:text-red-400 text-red-600 hover:text-red-300 dark:hover:text-red-300 hover:text-red-700 transition-colors ml-2"
                      >
                        Блок
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-slate-300 dark:text-slate-300 text-gray-800 break-words word-wrap break-all whitespace-pre-wrap overflow-hidden max-w-full hyphens-auto">
                    {msg.message.split(/(@\w+)/g).map((part, partIndex) => {
                      if (part.startsWith('@')) {
                        return (
                          <span key={partIndex} className="text-blue-400 dark:text-blue-400 text-blue-600 font-medium">
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
          }
        });
      })()}
    </div>
  );
};

export default ChatMessages;