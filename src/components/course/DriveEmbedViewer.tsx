import { memo, useMemo, useState } from "react";
import { ExternalLink, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadFile } from "@/utils/fileUtils";
import { toast } from "sonner";

interface DriveEmbedViewerProps {
  url: string;
  title?: string;
}

const DriveEmbedViewer = memo(({ url, title }: DriveEmbedViewerProps) => {
  const [downloading, setDownloading] = useState(false);

  const { embedUrl, openUrl, isSupported } = useMemo(() => {
    const isDriveLink = /drive\.google\.com/.test(url);
    const isPdfLink = /\.pdf($|\?)/i.test(url);
    const isArchiveLink = /archive\.org/.test(url);
    const isDocsLink = /docs\.google\.com\/document/.test(url);

    if (isDriveLink) {
      const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      const fileId = fileIdMatch?.[1] || idParamMatch?.[1];

      if (fileId) {
        return {
          embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
          openUrl: `https://drive.google.com/file/d/${fileId}/view`,
          isSupported: true,
        };
      }
    }

    if (isDocsLink) {
      const docId = url.match(/docs\.google\.com\/document\/d\/([a-zA-Z0-9_-]+)/)?.[1];
      if (docId) {
        return {
          embedUrl: `https://docs.google.com/document/d/${docId}/preview`,
          openUrl: url,
          isSupported: true,
        };
      }
    }

    if (isArchiveLink) {
      const archiveId = url.match(/archive\.org\/(?:details|embed|download)\/([^/?#]+)/)?.[1];
      if (archiveId) {
        return {
          embedUrl: `https://archive.org/embed/${archiveId}`,
          openUrl: `https://archive.org/details/${archiveId}`,
          isSupported: true,
        };
      }
    }

    if (isPdfLink) {
      return { embedUrl: url, openUrl: url, isSupported: true };
    }

    return { embedUrl: url, openUrl: url, isSupported: false };
  }, [url]);
  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadFile(url, title ? `${title}.pdf` : undefined);
      toast.success("Download started");
    } catch {
      toast.error("Download failed");
    } finally {
      setDownloading(false);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="flex flex-col w-full h-full">
      {/* Action bar */}
      <div className="flex items-center justify-end gap-1 px-3 py-1.5 bg-muted/50 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Download className="w-3.5 h-3.5 mr-1" />}
          {downloading ? "Downloading…" : "Download"}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
          onClick={() => window.open(openUrl, "_blank", "noopener,noreferrer")}
        >
          <ExternalLink className="w-3.5 h-3.5 mr-1" />
          Open Full Page
        </Button>
      </div>
      <iframe
        src={embedUrl}
        className="w-full border-0 flex-1"
        title={title || "Document Preview"}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
        loading="eager"
        style={{ height: '100dvh', minHeight: '70vh' }}
      />
    </div>
  );
});

DriveEmbedViewer.displayName = "DriveEmbedViewer";

export default DriveEmbedViewer;
