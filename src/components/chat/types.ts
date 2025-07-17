export interface ChatMessage {
  id: number;
  user: string;
  message: string;
  type: string;
  time: string;
  chatId: string;
}

export interface ChatProps {
  isVisible: boolean;
  onClose: () => void;
  chatMessages: ChatMessage[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeChatId: string;
  setActiveChatId: (id: string) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  privateChats: Map<string, any>;
  isPrivateChatOpen: boolean;
  onSendMessage: () => void;
  onUserMention: (username: string) => void;
  onChatSelect: (chatId: string) => void;
  onBackToChats: () => void;
  cooldownRemaining: number;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  blockedUsers: Set<string>;
  onBlockUser: (username: string) => void;
  onUnblockUser: (username: string) => void;
  getBlockedMessageCount: (chatId: string) => number;
}