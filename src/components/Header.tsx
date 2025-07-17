import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  onToggleChat: () => void;
}

const Header = ({ onToggleChat }: HeaderProps) => {
  return (
    <header className="bg-slate-800 border-b border-slate-700 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={16} className="text-white md:hidden" />
            <Icon name="MessageSquare" size={20} className="text-white hidden md:block" />
          </div>
          <h1 className="text-lg md:text-xl font-bold">Discord Ads Board</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Select defaultValue="en">
            <SelectTrigger className="w-12 md:w-16 bg-slate-700 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="ru">RU</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="border-slate-600 hidden md:flex">
            <Icon name="Moon" size={16} className="mr-2" />
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 hidden md:flex">
            <Icon name="Plus" size={16} className="mr-2" />
            Add Listing
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 md:hidden">
            <Icon name="Plus" size={16} />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleChat}
            className="border-slate-600 hover:bg-slate-700"
          >
            <Icon name="MessageCircle" size={16} className="mr-0 md:mr-2" />
            <span className="hidden md:inline">Чат</span>
          </Button>
          <Button variant="destructive" className="hidden md:flex">
            <Icon name="LogOut" size={16} className="mr-2" />
            Logout
          </Button>
          <Button variant="destructive" size="sm" className="md:hidden">
            <Icon name="LogOut" size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;