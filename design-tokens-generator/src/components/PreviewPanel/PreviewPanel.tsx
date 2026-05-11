/**
 * 预览面板组件
 */

import React, { useState } from 'react';
import { ColorCard } from './ColorCard';
import type { GeneratedTokens } from '../../types';
import { ChevronDown, ChevronRight, Sun, Moon, Palette, CircleDot } from 'lucide-react';

interface PreviewPanelProps {
  tokens: GeneratedTokens | null;
}

type TabKey = 'theme' | 'neutral' | 'semantic' | 'extended' | 'preview';

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ tokens }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('theme');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'theme', label: '主题色', icon: <Palette className="w-4 h-4" /> },
    { key: 'neutral', label: '中性色', icon: <Sun className="w-4 h-4" /> },
    { key: 'semantic', label: '语义色', icon: <CircleDot className="w-4 h-4" /> },
    { key: 'extended', label: '扩展语义', icon: <Moon className="w-4 h-4" /> },
  ];

  if (!tokens) {
    return (
      <div className="flex items-center justify-center h-full text-text-secondary">
        <p>输入主题色以预览生成的配色</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all
              whitespace-nowrap border-b-2 -mb-px
              ${activeTab === tab.key
                ? 'text-primary border-primary bg-primary/5'
                : 'text-text-secondary border-transparent hover:text-text-primary hover:bg-background-hover'
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
        {activeTab === 'theme' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">主题色阶</h3>
              <span className="text-sm text-text-secondary">
                {tokens.themeColorScale.scale.length} 个颜色
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {tokens.themeColorScale.scale.map((color) => (
                <ColorCard key={color.name} color={color} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'neutral' && tokens.neutralColorScale && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">中性灰阶</h3>
              <span className="text-sm text-text-secondary">
                {tokens.neutralColorScale.scale.length} 个颜色
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {tokens.neutralColorScale.scale.map((color) => (
                <ColorCard key={color.name} color={color} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'semantic' && tokens.semanticColors && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">基础语义色</h3>
            </div>

            {[
              { key: 'success', label: '成功', colors: tokens.semanticColors.success },
              { key: 'danger', label: '危险', colors: tokens.semanticColors.danger },
              { key: 'warning', label: '警告', colors: tokens.semanticColors.warning },
              { key: 'info', label: '信息', colors: tokens.semanticColors.info },
            ].map((section) => (
              <div key={section.key} className="space-y-3">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-primary transition-colors"
                >
                  {collapsedSections[section.key] ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  {section.label}
                </button>

                {!collapsedSections[section.key] && (
                  <div className="grid grid-cols-3 gap-4">
                    <ColorCard color={section.colors.light} />
                    <ColorCard color={section.colors.default} />
                    <ColorCard color={section.colors.dark} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'extended' && tokens.extendedSemantic && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">扩展语义色</h3>
            </div>

            {[
              { key: 'background', label: '背景色', colors: tokens.extendedSemantic.background },
              { key: 'foreground', label: '文字色', colors: tokens.extendedSemantic.foreground },
              { key: 'border', label: '边框色', colors: tokens.extendedSemantic.border },
              { key: 'accent', label: '强调色', colors: tokens.extendedSemantic.accent },
              { key: 'destructive', label: '破坏性', colors: tokens.extendedSemantic.destructive },
              { key: 'input', label: '输入框', colors: tokens.extendedSemantic.input },
            ].map((section) => (
              <div key={section.key} className="space-y-3">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-primary transition-colors"
                >
                  {collapsedSections[section.key] ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  {section.label}
                </button>

                {!collapsedSections[section.key] && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(section.colors).map(([variant, color]) => (
                      <div key={variant}>
                        <p className="text-xs text-text-secondary mb-1 capitalize">{variant}</p>
                        <ColorCard color={color} size="sm" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-xs text-text-secondary mb-1">焦点环</p>
                <ColorCard color={tokens.extendedSemantic.ring.default} size="sm" />
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">遮罩层</p>
                <ColorCard color={tokens.extendedSemantic.overlay.default} size="sm" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
