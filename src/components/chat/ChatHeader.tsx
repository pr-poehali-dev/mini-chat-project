import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ChatHeaderProps {
  isPrivateChatOpen: boolean;
  activeTab: string;
  activeChatId: string;
  isFullscreen?: boolean;
  onBackToChats: () => void;
  onToggleFullscreen?: () => void;
  onClose: () => void;
  privateChats?: Map<string, any>;
}

const ChatHeader = ({
  isPrivateChatOpen,
  activeTab,
  activeChatId,
  isFullscreen = false,
  onBackToChats,
  onToggleFullscreen,
  onClose,
  privateChats
}: ChatHeaderProps) => {
  return (
    <CardHeader className="pb-2 pt-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base font-medium flex items-center space-x-2">
          <span>
            {isPrivateChatOpen && activeTab === 'private' && activeChatId !== 'global' 
              ? `Чат с ${activeChatId.replace('private-', '')}`
              : isFullscreen ? 'Чат (Полноэкранный режим)' : 'Чат'
            }
          </span>
          {/* Индикатор онлайн */}
          {!isPrivateChatOpen && (
            <>
              {/* Глобальный чат */}
              {activeTab === 'global' && (
                <div className="flex items-center space-x-1 bg-slate-700 dark:bg-slate-700 bg-gray-200 px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">2</span>
                </div>
              )}
              {/* Приватный чат */}
              {activeTab === 'private' && (
                <div className="flex items-center space-x-1 bg-slate-600 dark:bg-slate-600 bg-gray-300 px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-400 font-medium">{privateChats?.size || 0}</span>
                </div>
              )}
            </>
          )}
        </CardTitle>
        <div className="flex items-center space-x-1">
          {isPrivateChatOpen && activeTab === 'private' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToChats}
              className="text-slate-400 dark:text-slate-400 text-gray-500 hover:text-white dark:hover:text-white hover:text-gray-900 h-7 px-2"
            >
              <Icon name="ArrowLeft" size={14} className="mr-1" />
              Все чаты
            </Button>
          )}
          {onToggleFullscreen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleFullscreen}
              className={`text-slate-400 dark:text-slate-400 text-gray-500 hover:text-white dark:hover:text-white hover:text-gray-900 h-7 w-7 p-0 ${!isFullscreen ? 'hidden lg:flex' : ''}`}
            >
              <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={14} />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-400 dark:text-slate-400 text-gray-500 hover:text-white dark:hover:text-white hover:text-gray-900 h-7 w-7 p-0"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;