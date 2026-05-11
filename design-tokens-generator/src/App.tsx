import { Header } from './components/Layout/Header';
import { ColorInput } from './components/ColorInput/ColorInput';
import { ScaleConfig } from './components/ConfigPanel/ScaleConfig';
import { PreviewPanel } from './components/PreviewPanel/PreviewPanel';
import { ExportPanel } from './components/ExportPanel/ExportPanel';
import { ToastContainer } from './components/Toast/ToastContainer';
import { useColorGenerator } from './hooks/useColorGenerator';
import { useTokenExport } from './hooks/useTokenExport';
import { useToast } from './hooks/useToast';

function App() {
  const {
    config,
    tokens,
    error,
    setThemeColor,
    setScaleCount,
    toggleNeutral,
    toggleSemantic,
    toggleExtended
  } = useColorGenerator();

  const {
    jsonPreview,
    isCopied,
    isDownloading,
    generatePreview,
    copyToClipboard,
    downloadFile
  } = useTokenExport();

  const { toasts, showToast, removeToast } = useToast();

  const handleExport = async () => {
    if (!tokens) {
      showToast('请先输入主题色', 'error');
      return;
    }

    await copyToClipboard();
    showToast('已复制到剪贴板', 'success');
  };

  const handleCopy = async () => {
    const success = await copyToClipboard();
    if (success) {
      showToast('已复制到剪贴板', 'success');
    } else {
      showToast('复制失败，请重试', 'error');
    }
  };

  const handleDownload = () => {
    downloadFile();
    showToast('JSON 文件已下载', 'success');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onExport={handleExport}
        isExportDisabled={!tokens}
      />

      <main className="flex h-[calc(100vh-4rem)]">
        <aside className="w-96 bg-background-card border-r border-border flex flex-col overflow-hidden">
          <div className="p-6 space-y-6 overflow-y-auto scrollbar-thin flex-1">
            <ColorInput
              value={config.themeColor}
              onChange={setThemeColor}
              error={error}
            />

            <div className="border-t border-border pt-6">
              <ScaleConfig
                scaleCount={config.scaleCount}
                onScaleCountChange={setScaleCount}
                includeNeutral={config.includeNeutral}
                onToggleNeutral={toggleNeutral}
                includeSemantic={config.includeSemantic}
                onToggleSemantic={toggleSemantic}
                includeExtended={config.includeExtended}
                onToggleExtended={toggleExtended}
              />
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <PreviewPanel tokens={tokens} />
          </div>

          <ExportPanel
            tokens={tokens}
            jsonPreview={jsonPreview}
            onGeneratePreview={generatePreview}
            onCopy={handleCopy}
            onDownload={handleDownload}
            isCopied={isCopied}
            isDownloading={isDownloading}
          />
        </section>
      </main>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export default App;
