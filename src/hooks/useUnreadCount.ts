import { useEffect, useMemo } from 'react';
import { updateFaviconWithBadge } from '@/utils/favicon';

interface ChatInfo {
  id: string;
  unreadCount: number;
}

interface UseUnreadCountProps {
  chats: ChatInfo[];
}

export function useUnreadCount({ chats }: UseUnreadCountProps) {
  // Подсчитываем общее количество непрочитанных сообщений
  const totalUnreadCount = useMemo(() => {
    const total = chats.reduce((total, chat) => total + chat.unreadCount, 0);
    console.log('📊 Подсчёт непрочитанных:', { chats, total });
    return total;
  }, [chats]);

  // Обновляем favicon при изменении количества непрочитанных
  useEffect(() => {
    updateFaviconWithBadge(totalUnreadCount);
  }, [totalUnreadCount]);

  return {
    totalUnreadCount,
  };
}