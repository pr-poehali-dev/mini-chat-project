import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import ServerCard from './ServerCard';

interface Server {
  id: number;
  name: string;
  url: string;
  members: number;
  price: number;
  currency: string;
  description: string;
  avatar: string;
  category: string;
  clicks: number;
  favorites: number;
  pinned: boolean;
}

interface ServerListingProps {
  servers: Server[];
}

const ServerListing = ({ servers }: ServerListingProps) => {
  return (
    <div className="mb-6">
      <Tabs defaultValue="listings" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        
        <TabsContent value="listings" className="mt-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-6">
            <Select defaultValue="newest">
              <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="socializing">Socializing</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="music">Music</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="usd">
              <SelectTrigger className="w-20 sm:w-24 bg-slate-800 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usd">USD</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="rub">RUB</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="border-slate-600 hidden sm:flex">
              <Icon name="Grid" size={16} />
            </Button>
            <Button variant="outline" className="border-slate-600 hidden sm:flex">
              Reset
            </Button>
          </div>

          {/* Server Cards */}
          <div className="space-y-4">
            {servers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="my-listings">
          <div className="text-center py-12">
            <Icon name="Plus" size={48} className="mx-auto mb-4 text-slate-600" />
            <h3 className="text-lg font-semibold mb-2">Нет активных объявлений</h3>
            <p className="text-slate-400 mb-4">Создайте первое объявление для вашего сервера</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Создать объявление
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          <div className="text-center py-12">
            <Icon name="Heart" size={48} className="mx-auto mb-4 text-slate-600" />
            <h3 className="text-lg font-semibold mb-2">Избранное пусто</h3>
            <p className="text-slate-400">Добавьте серверы в избранное для быстрого доступа</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServerListing;