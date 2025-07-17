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
}

const ChatHeader = ({
  isPrivateChatOpen,
  activeTab,
  activeChatId,
  isFullscreen = false,
  onBackToChats,
  onToggleFullscreen,
  onClose
}: ChatHeaderProps) => {
  return (
    <CardHeader className="pb-2 pt-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base font-medium">
          {isPrivateChatOpen && activeTab === 'private' && activeChatId !== 'global' 
            ? `Чат с ${activeChatId.replace('private-', '')}`
            : isFullscreen ? 'Чат (Полноэкранный режим)' : 'Чат'
          }
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