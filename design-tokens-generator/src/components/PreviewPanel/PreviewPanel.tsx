/**
 * 预览面板组件
 */

import React, { useState, useEffect } from 'react';
import { ColorCard } from './ColorCard';
import type { GeneratedTokens } from '../../types';
import { ChevronDown, ChevronRight, Sun, Moon, Palette, CircleDot } from 'lucide-react';

interface PreviewPanelProps {
  tokens: GeneratedTokens | null;
}

type TabKey = 'theme' | 'neutral' | 'semantic' | 'extended';

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ tokens }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('theme');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveTab('theme');
    setCollapsedSections({});
  }, [tokens]);

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

  const renderThemeColors = () => (
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
  );

  const renderNeutralColors = () => {
    if (!tokens.neutralColorScale) return null;
    return (
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
    );
  };

  const renderSemanticColors = () => {
    if (!tokens.semanticColors) return null;
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">基础语义色</h3>
          <span className="text-sm text-text-secondary">
            {tokens.semanticColors.success.length} 阶
          </span>
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {section.colors.map((color) => (
                  <ColorCard key={color.name} color={color} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderExtendedColors = () => {
    if (!tokens.extendedSemantic) return null;
    const { extendedSemantic } = tokens;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">扩展语义色</h3>
        </div>

        <div className="space-y-4">
          <div>
            <button
              onClick={() => toggleSection('background')}
              className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-primary transition-colors mb-2"
            >
              {collapsedSections['background'] ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              背景色
            </button>
            {!collapsedSections['background'] && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-text-secondary mb-1">default</p>
                  <ColorCard color={extendedSemantic.background.default} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">subtle</p>
                  <ColorCard color={extendedSemantic.background.subtle} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">muted</p>
                  <ColorCard color={extendedSemantic.background.muted} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">inverse</p>
                  <ColorCard color={extendedSemantic.background.inverse} size="sm" />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('foreground')}
              className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-primary transition-colors mb-2"
            >
              {collapsedSections['foreground'] ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              文字色
            </button>
            {!collapsedSections['foreground'] && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-text-secondary mb-1">default</p>
                  <ColorCard color={extendedSemantic.foreground.default} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">muted</p>
                  <ColorCard color={extendedSemantic.foreground.muted} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">subtle</p>
                  <ColorCard color={extendedSemantic.foreground.subtle} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">inverse</p>
                  <ColorCard color={extendedSemantic.foreground.inverse} size="sm" />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('border')}
              className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-primary transition-colors mb-2"
            >
              {collapsedSections['border'] ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              边框色
            </button>
            {!collapsedSections['border'] && (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-text-secondary mb-1">default</p>
                  <ColorCard color={extendedSemantic.border.default} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">muted</p>
                  <ColorCard color={extendedSemantic.border.muted} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">subtle</p>
                  <ColorCard color={extendedSemantic.border.subtle} size="sm" />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('accent')}
              className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-primary transition-colors mb-2"
            >
              {collapsedSections['accent'] ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              强调色
            </button>
            {!collapsedSections['accent'] && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-secondary mb-1">default</p>
                  <ColorCard color={extendedSemantic.accent.default} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">foreground</p>
                  <ColorCard color={extendedSemantic.accent.foreground} size="sm" />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('destructive')}
              className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-primary transition-colors mb-2"
            >
              {collapsedSections['destructive'] ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              破坏性
            </button>
            {!collapsedSections['destructive'] && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-secondary mb-1">default</p>
                  <ColorCard color={extendedSemantic.destructive.default} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">foreground</p>
                  <ColorCard color={extendedSemantic.destructive.foreground} size="sm" />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => toggleSection('input')}
              className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-primary transition-colors mb-2"
            >
              {collapsedSections['input'] ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              输入框
            </button>
            {!collapsedSections['input'] && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-secondary mb-1">default</p>
                  <ColorCard color={extendedSemantic.input.default} size="sm" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">border</p>
                  <ColorCard color={extendedSemantic.input.border} size="sm" />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-text-secondary mb-1">焦点环 (ring)</p>
              <ColorCard color={extendedSemantic.ring.default} size="sm" />
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">遮罩层 (overlay)</p>
              <ColorCard color={extendedSemantic.overlay.default} size="sm" />
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        {activeTab === 'theme' && renderThemeColors()}
        {activeTab === 'neutral' && renderNeutralColors()}
        {activeTab === 'semantic' && renderSemanticColors()}
        {activeTab === 'extended' && renderExtendedColors()}
      </div>
    </div>
  );
};
