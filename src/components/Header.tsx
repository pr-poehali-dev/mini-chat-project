import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onToggleChat: () => void;
}

const Header = ({ onToggleChat }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="bg-slate-800 dark:bg-slate-800 bg-white border-b border-slate-700 dark:border-slate-700 border-gray-200 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={16} className="text-white md:hidden" />
            <Icon name="MessageSquare" size={20} className="text-white hidden md:block" />
          </div>
          <h1 className="text-lg md:text-xl font-bold">Discord Ads Board</h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Десктопная версия */}
          <div className="hidden md:flex items-center space-x-4">
            <Select defaultValue="en">
              <SelectTrigger className="w-16 bg-slate-700 dark:bg-slate-700 bg-gray-100 border-slate-600 dark:border-slate-600 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="ru">RU</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleTheme}
              className="border-slate-600 dark:border-slate-600 border-gray-300 hover:bg-slate-700 dark:hover:bg-slate-700 hover:bg-gray-100"
            >
              <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={16} className="mr-2" />
              {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Listing
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onToggleChat}
              className="border-slate-600 dark:border-slate-600 border-gray-300 hover:bg-slate-700 dark:hover:bg-slate-700 hover:bg-gray-100"
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Чат
            </Button>
            <Button variant="destructive">
              <Icon name="LogOut" size={16} className="mr-2" />
              Logout
            </Button>
          </div>

          {/* Мобильная версия - бургер меню */}
          <div className="md:hidden flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onToggleChat}
              className="border-slate-600 dark:border-slate-600 border-gray-300 hover:bg-slate-700 dark:hover:bg-slate-700 hover:bg-gray-100"
            >
              <Icon name="MessageCircle" size={16} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 dark:border-slate-600 border-gray-300 hover:bg-slate-700 dark:hover:bg-slate-700 hover:bg-gray-100"
                >
                  <Icon name="Menu" size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Icon name="Globe" size={14} className="mr-2" />
                  Язык: EN
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleTheme}>
                  <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={14} className="mr-2" />
                  {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="Plus" size={14} className="mr-2" />
                  Добавить объявление
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon name="LogOut" size={14} className="mr-2" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;