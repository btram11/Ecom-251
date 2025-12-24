import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Users,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend: number;
  trendLabel: string;
  icon: string;
  color: string;
}

// Map string sang Component Icon
const iconMap = {
  "dollar-sign": DollarSign,
  "shopping-cart": ShoppingCart,
  "trending-up": TrendingUp, // Dùng icon chart tăng trưởng
  "users": Users,
};

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  color,
}: MetricCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap];
  const isPositive = trend > 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }} 
        >
          {IconComponent && (
            <IconComponent className="w-6 h-6" style={{ color: color }} />
          )}
        </div>
        
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${
            isPositive ? "bg-green-50" : "bg-red-50"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-green-600" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-red-600" />
          )}
          <span
            className={`font-['Alexandria:Medium',sans-serif] text-[12px] ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {trend}%
          </span>
        </div>
      </div>

      <div>
        <p className="font-['Alexandria:Regular',sans-serif] text-[14px] text-gray-600 mb-1">
          {title}
        </p>
        <h3 className="font-['Alexandria:Bold',sans-serif] text-[28px] text-gray-900 mb-2">
          {value}
        </h3>
        <p className="font-['Alexandria:Regular',sans-serif] text-[12px] text-gray-500">
          {trendLabel}
        </p>
      </div>
    </div>
  );
}