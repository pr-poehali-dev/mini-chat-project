import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: () => void;
  cooldownRemaining: number;
}

const ChatInput = ({
  newMessage,
  setNewMessage,
  onSendMessage,
  cooldownRemaining
}: ChatInputProps) => {
  return (
    <div className="p-2 md:p-4 border-t border-slate-700">
      <div className="flex space-x-1 md:space-x-2">
        <div className="flex-1 relative">
          <Input
            placeholder="Сообщение... (@ для упоминаний)"
            value={newMessage}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setNewMessage(e.target.value);
              }
            }}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && onSendMessage()}
            className="bg-slate-700 border-slate-600 focus:border-blue-500 pr-12"
            disabled={cooldownRemaining > 0}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">
            {newMessage.length}/500
          </div>
        </div>
        <Button 
          onClick={onSendMessage} 
          className="bg-green-600 hover:bg-green-700"
          disabled={cooldownRemaining > 0 || newMessage.length > 500 || !newMessage.trim()}
        >
          {cooldownRemaining > 0 ? (
            <span className="text-sm">{cooldownRemaining}s</span>
          ) : (
            <Icon name="Send" size={16} />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;