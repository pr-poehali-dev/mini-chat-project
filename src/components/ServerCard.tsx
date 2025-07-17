import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

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

interface ServerCardProps {
  server: Server;
}

const ServerCard = ({ server }: ServerCardProps) => {
  return (
    <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
      <CardContent className="p-3 md:p-6">
        <div className="flex items-start space-x-3 md:space-x-4">
          <Avatar className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
            <AvatarImage src={server.avatar} alt={server.name} />
            <AvatarFallback>{server.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-bold text-lg">{server.name}</h3>
              {server.pinned && (
                <Badge variant="secondary" className="bg-orange-600 text-white">
                  <Icon name="Pin" size={12} className="mr-1" />
                  Pinned
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-slate-400 mb-3">
              <span className="flex items-center">
                <Icon name="Users" size={14} className="mr-1" />
                {server.members.toLocaleString()} members
              </span>
              <span className="flex items-center">
                <Icon name="MousePointer" size={14} className="mr-1" />
                {server.clicks} clicks
              </span>
              <span className="flex items-center">
                <Icon name="Heart" size={14} className="mr-1" />
                {server.favorites} in favorites
              </span>
            </div>
            
            <p className="text-slate-300 mb-4">{server.description}</p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  {server.category}
                </Badge>
                <Button variant="outline" size="sm" className="border-slate-600 hidden sm:flex">
                  <Icon name="ExternalLink" size={14} className="mr-1" />
                  Visit Server
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 sm:hidden">
                  <Icon name="ExternalLink" size={14} />
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 hidden sm:flex">
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 sm:hidden">
                  <Icon name="MessageCircle" size={14} />
                </Button>
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Heart" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Edit" size={16} />
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-right flex-shrink-0">
            <div className="text-lg md:text-2xl font-bold text-green-400">
              {server.price} {server.currency}
            </div>
            <p className="text-xs md:text-sm text-slate-400">Socializing</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerCard;