/**
 * Утилиты для работы с favicon и счетчиком уведомлений
 */

export function updateFaviconWithBadge(count: number) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const size = 32;
  
  canvas.width = size;
  canvas.height = size;
  
  if (!ctx) return;
  
  // Основной фон favicon (тёмно-синий круг)
  ctx.fillStyle = '#1e40af'; // blue-800
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 1, 0, 2 * Math.PI);
  ctx.fill();
  
  // Белая граница
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Символ ракеты (простой треугольник + хвост)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  // Корпус ракеты
  ctx.moveTo(size / 2, size / 2 - 8);
  ctx.lineTo(size / 2 - 4, size / 2 + 2);
  ctx.lineTo(size / 2 + 4, size / 2 + 2);
  ctx.closePath();
  ctx.fill();
  
  // Хвост ракеты
  ctx.fillStyle = '#fbbf24'; // amber-400
  ctx.fillRect(size / 2 - 2, size / 2 + 2, 4, 6);
  
  // Если есть уведомления, добавляем красный бейдж
  if (count > 0) {
    const badgeSize = 16; // Увеличиваем размер
    const badgeX = size - badgeSize / 2 - 1;
    const badgeY = badgeSize / 2 + 1;
    
    // Красный круг для бейджа (ярче)
    ctx.fillStyle = '#dc2626'; // red-600 - более яркий красный
    ctx.beginPath();
    ctx.arc(badgeX, badgeY, badgeSize / 2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Белая обводка (толще)
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Текст счетчика (крупнее)
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const displayCount = count > 99 ? '99+' : count.toString();
    ctx.fillText(displayCount, badgeX, badgeY);
  }
  
  // Обновляем favicon
  const dataURL = canvas.toDataURL('image/png');
  updateFavicon(dataURL);
}

function updateFavicon(iconURL: string) {
  // Удаляем старые favicon
  const existingLinks = document.querySelectorAll('link[rel*="icon"]');
  existingLinks.forEach(link => link.remove());
  
  // Добавляем новый favicon
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = iconURL;
  document.head.appendChild(link);
}

export function resetFavicon() {
  updateFaviconWithBadge(0);
}