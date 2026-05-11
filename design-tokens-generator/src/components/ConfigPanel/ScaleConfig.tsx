/**
 * 配置面板组件
 */

import { Settings2, Layers } from 'lucide-react';

interface ScaleConfigProps {
  scaleCount: number;
  onScaleCountChange: (count: number) => void;
  includeNeutral: boolean;
  onToggleNeutral: () => void;
  includeSemantic: boolean;
  onToggleSemantic: () => void;
  includeExtended: boolean;
  onToggleExtended: () => void;
}

export const ScaleConfig: React.FC<ScaleConfigProps> = ({
  scaleCount,
  onScaleCountChange,
  includeNeutral,
  onToggleNeutral,
  includeSemantic,
  onToggleSemantic,
  includeExtended,
  onToggleExtended
}) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-primary" />
          <label className="text-sm font-medium text-text-primary">
            色阶数量
          </label>
          <span className="ml-auto text-sm text-primary font-semibold">
            {scaleCount}
          </span>
        </div>

        <input
          type="range"
          min="3"
          max="20"
          step="1"
          value={scaleCount}
          onChange={(e) => onScaleCountChange(Number(e.target.value))}
          className="w-full h-2 bg-background-hover rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        />

        <div className="flex justify-between mt-2 text-xs text-text-secondary">
          <span>3</span>
          <span>10</span>
          <span>20</span>
        </div>

        <div className="flex gap-2 mt-4">
          {[5, 10, 13].map((count) => (
            <button
              key={count}
              onClick={() => onScaleCountChange(count)}
              className={`
                flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all
                ${scaleCount === count
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-background border border-border text-text-secondary hover:bg-background-hover'
                }
              `}
            >
              {count} 阶
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <div className="flex items-center gap-2 mb-3">
          <Settings2 className="w-4 h-4 text-primary" />
          <label className="text-sm font-medium text-text-primary">
            包含内容
          </label>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includeNeutral}
              onChange={onToggleNeutral}
              className="w-5 h-5 rounded border-border bg-background text-primary
                focus:ring-2 focus:ring-primary/50 cursor-pointer transition-all
                checked:bg-primary checked:border-primary"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              中性色（灰阶）
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includeSemantic}
              onChange={onToggleSemantic}
              className="w-5 h-5 rounded border-border bg-background text-primary
                focus:ring-2 focus:ring-primary/50 cursor-pointer transition-all
                checked:bg-primary checked:border-primary"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              基础语义色（成功/危险/警告/信息）
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={includeExtended}
              onChange={onToggleExtended}
              className="w-5 h-5 rounded border-border bg-background text-primary
                focus:ring-2 focus:ring-primary/50 cursor-pointer transition-all
                checked:bg-primary checked:border-primary"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              扩展语义色（背景/边框/文本等）
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
