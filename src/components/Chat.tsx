import ChatContainer from './chat/ChatContainer';
import { ChatProps } from './chat/types';

const Chat = ({
  isVisible,
  onClose,
  chatMessages,
  activeTab,
  setActiveTab,
  activeChatId,
  setActiveChatId,
  newMessage,
  setNewMessage,
  privateChats,
  isPrivateChatOpen,
  onSendMessage,
  onUserMention,
  onChatSelect,
  onBackToChats,
  cooldownRemaining,
  isFullscreen = false,
  onToggleFullscreen,
  blockedUsers,
  onBlockUser,
  onUnblockUser,
  getBlockedMessageCount,
  showBlockedMessages,
  onToggleBlockedMessages,
  globalUnreadCount = 0,
  privateUnreadCount = 0
}: ChatProps) => {
  if (!isVisible) return null;

  const filteredMessages = activeTab === 'global' 
    ? chatMessages.filter(msg => msg.type === 'global')
    : chatMessages.filter(msg => msg.chatId === activeChatId);

  const blockedCount = getBlockedMessageCount(activeChatId);

  return (
    <ChatContainer
      isFullscreen={isFullscreen}
      isPrivateChatOpen={isPrivateChatOpen}
      activeTab={activeTab}
      activeChatId={activeChatId}
      setActiveTab={setActiveTab}
      setActiveChatId={setActiveChatId}
      privateChats={privateChats}
      filteredMessages={filteredMessages}
      blockedUsers={blockedUsers}
      blockedCount={blockedCount}
      showBlockedMessages={showBlockedMessages}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      cooldownRemaining={cooldownRemaining}
      onBackToChats={onBackToChats}
      onToggleFullscreen={onToggleFullscreen}
      onClose={onClose}
      onChatSelect={onChatSelect}
      onUserMention={onUserMention}
      onBlockUser={onBlockUser}
      onUnblockUser={onUnblockUser}
      onToggleBlockedMessages={onToggleBlockedMessages}
      onSendMessage={onSendMessage}
      globalUnreadCount={globalUnreadCount}
      privateUnreadCount={privateUnreadCount}
    />
  );
};

export default Chat;