import { useEffect, useMemo, useState } from 'react';
import { updateFaviconWithBadge } from '@/utils/favicon';
import { usePageVisibility } from './usePageVisibility';

interface ChatInfo {
  id: string;
  unreadCount: number;
}

interface UseUnreadCountProps {
  chats: ChatInfo[];
  activeChatId?: string;
}

const STORAGE_KEY = 'poehali_unread_persistent';

export function useUnreadCount({ chats, activeChatId }: UseUnreadCountProps) {
  const isPageVisible = usePageVisibility();
  const [persistentUnreadCount, setPersistentUnreadCount] = useState<number>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });
  
  // Подсчитываем текущее количество непрочитанных сообщений
  const currentUnreadCount = useMemo(() => {
    return chats.reduce((total, chat) => total + chat.unreadCount, 0);
  }, [chats]);

  // Определяем максимальное количество для отображения
  const displayUnreadCount = Math.max(persistentUnreadCount, currentUnreadCount);

  // Сохраняем максимальное количество уведомлений
  useEffect(() => {
    if (currentUnreadCount > persistentUnreadCount) {
      setPersistentUnreadCount(currentUnreadCount);
      localStorage.setItem(STORAGE_KEY, currentUnreadCount.toString());
    }
  }, [currentUnreadCount, persistentUnreadCount]);

  // Обновляем favicon
  useEffect(() => {
    updateFaviconWithBadge(displayUnreadCount);
  }, [displayUnreadCount]);

  // Сбрасываем счётчик только при явном чтении сообщений
  const markAsRead = (chatId?: string) => {
    if (chatId) {
      // Помечаем конкретный чат как прочитанный
      const chat = chats.find(c => c.id === chatId);
      if (chat && chat.unreadCount > 0) {
        const newCount = Math.max(0, persistentUnreadCount - chat.unreadCount);
        setPersistentUnreadCount(newCount);
        localStorage.setItem(STORAGE_KEY, newCount.toString());
      }
    } else {
      // Помечаем все как прочитанное
      setPersistentUnreadCount(0);
      localStorage.setItem(STORAGE_KEY, '0');
    }
  };

  // Автоматически помечаем активный чат как прочитанный при его просмотре
  useEffect(() => {
    if (isPageVisible && activeChatId) {
      const activeChat = chats.find(chat => chat.id === activeChatId || chat.id === activeChatId.replace('private-', ''));
      if (activeChat && activeChat.unreadCount > 0) {
        setTimeout(() => {
          markAsRead(activeChat.id);
        }, 2000); // Помечаем как прочитанное через 2 секунды просмотра
      }
    }
  }, [isPageVisible, activeChatId, chats]);

  return {
    totalUnreadCount: displayUnreadCount,
    currentUnreadCount,
    persistentUnreadCount,
    markAsRead,
  };
}