import { Card, CardContent } from '@/components/ui/card';
import ChatHeader from './ChatHeader';
import ChatTabs from './ChatTabs';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { ChatMessage } from './types';

interface ChatContainerProps {
  isFullscreen: boolean;
  isPrivateChatOpen: boolean;
  activeTab: string;
  activeChatId: string;
  setActiveTab: (tab: string) => void;
  setActiveChatId: (id: string) => void;
  privateChats: Map<string, any>;
  filteredMessages: ChatMessage[];
  blockedUsers: Set<string>;
  blockedCount: number;
  showBlockedMessages: Set<string>;
  newMessage: string;
  setNewMessage: (message: string) => void;
  cooldownRemaining: number;
  onBackToChats: () => void;
  onToggleFullscreen?: () => void;
  onClose: () => void;
  onChatSelect: (chatId: string) => void;
  onUserMention: (username: string) => void;
  onBlockUser: (username: string) => void;
  onUnblockUser: (username: string) => void;
  onToggleBlockedMessages: (chatId: string) => void;
  onSendMessage: () => void;
}

const ChatContainer = ({
  isFullscreen,
  isPrivateChatOpen,
  activeTab,
  activeChatId,
  setActiveTab,
  setActiveChatId,
  privateChats,
  filteredMessages,
  blockedUsers,
  blockedCount,
  showBlockedMessages,
  newMessage,
  setNewMessage,
  cooldownRemaining,
  onBackToChats,
  onToggleFullscreen,
  onClose,
  onChatSelect,
  onUserMention,
  onBlockUser,
  onUnblockUser,
  onToggleBlockedMessages,
  onSendMessage
}: ChatContainerProps) => {
  const containerClass = isFullscreen 
    ? "fixed inset-0 z-50 bg-slate-900 hidden lg:block"
    : "lg:col-span-1";
  
  const cardClass = isFullscreen
    ? "bg-slate-800 border-slate-700 h-full flex flex-col rounded-none"
    : "bg-slate-800 border-slate-700 h-[400px] md:h-[600px] flex flex-col";

  return (
    <div className={containerClass}>
      <Card className={cardClass}>
        <ChatHeader
          isPrivateChatOpen={isPrivateChatOpen}
          activeTab={activeTab}
          activeChatId={activeChatId}
          isFullscreen={isFullscreen}
          onBackToChats={onBackToChats}
          onToggleFullscreen={onToggleFullscreen}
          onClose={onClose}
        />
        
        <ChatTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setActiveChatId={setActiveChatId}
          privateChats={privateChats}
          isPrivateChatOpen={isPrivateChatOpen}
          activeChatId={activeChatId}
          onChatSelect={onChatSelect}
        />
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          <ChatMessages
            filteredMessages={filteredMessages}
            activeTab={activeTab}
            isPrivateChatOpen={isPrivateChatOpen}
            blockedUsers={blockedUsers}
            blockedCount={blockedCount}
            activeChatId={activeChatId}
            showBlockedMessages={showBlockedMessages}
            onUserMention={onUserMention}
            onBlockUser={onBlockUser}
            onUnblockUser={onUnblockUser}
            onToggleBlockedMessages={onToggleBlockedMessages}
          />
          
          <ChatInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSendMessage={onSendMessage}
            cooldownRemaining={cooldownRemaining}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatContainer;