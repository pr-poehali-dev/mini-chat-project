import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  time: string;
  isOwn: boolean;
}

interface PrivateConversation {
  id: string;
  user: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar: string;
}

const MiniChat = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'private'>('global');
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const globalMessages: ChatMessage[] = [
    { id: '1', user: 'Гурман', message: 'куплю рублики 500/2, лед 100/5, желтовость 1/2, аполон 1/1, форель 100/40', time: '18:17', isOwn: false },
    { id: '2', user: 'Гурман', message: 'куплю рублики 500/2, лед 100/5, желтовость 1/2, аполон 1/1, форель 100/35', time: '18:19', isOwn: false },
  ];

  const privateConversations: PrivateConversation[] = [
    { id: '1', user: 'Анна', lastMessage: 'Привет! Как дела?', time: '18:30', unreadCount: 2, avatar: 'А' },
    { id: '2', user: 'Максим', lastMessage: 'Увидимся завтра', time: '17:45', unreadCount: 0, avatar: 'М' },
    { id: '3', user: 'Елена', lastMessage: 'Спасибо за помощь!', time: '16:20', unreadCount: 1, avatar: 'Е' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Здесь будет логика отправки сообщения
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-md mx-auto">
      {/* Header with tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('global')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-tl-lg transition-colors ${
            activeTab === 'global'
              ? 'bg-green-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          Глобальный
        </button>
        <button
          onClick={() => setActiveTab('private')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-tr-lg transition-colors ${
            activeTab === 'private'
              ? 'bg-green-600 text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          Приватный
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          <Icon name={isExpanded ? "ChevronDown" : "ChevronUp"} size={16} />
        </button>
      </div>

      {/* Chat content */}
      {isExpanded && (
        <div className="h-64 flex flex-col">
          {activeTab === 'global' ? (
            <>
              {/* Global messages */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {globalMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-2">
                    <Avatar className="w-6 h-6 bg-gray-200 dark:bg-gray-700">
                      <AvatarFallback className="text-xs">
                        {msg.user[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-xs text-gray-900 dark:text-white">
                          {msg.user}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input for global chat */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Сообщение... (@ для упоминаний)"
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Icon name="Send" size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Private conversations list */}
              <div className="flex-1 overflow-y-auto">
                {privateConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                  >
                    <Avatar className="w-8 h-8 bg-gray-200 dark:bg-gray-700">
                      <AvatarFallback className="text-sm">
                        {conv.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900 dark:text-white">
                          {conv.user}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {conv.time}
                          </span>
                          {conv.unreadCount > 0 && (
                            <span className="bg-green-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {conv.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniChat;