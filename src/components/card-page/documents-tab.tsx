import { FileText } from "lucide-react";
import type { CardFullFragment } from "@/graphql/generated/graphql";

interface FileItem {
  name?: string;
  url?: string;
  size?: number;
  type?: string;
}

interface DocumentsTabProps {
  card: CardFullFragment;
  noDocumentsLabel?: string;
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function parseFiles(fileUpload: unknown): FileItem[] {
  if (!fileUpload) return [];
  if (Array.isArray(fileUpload)) return fileUpload as FileItem[];
  if (typeof fileUpload === "object") return [fileUpload as FileItem];
  try {
    const parsed = JSON.parse(String(fileUpload));
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [];
  }
}

export function DocumentsTab({ card, noDocumentsLabel }: DocumentsTabProps) {
  const files = parseFiles(card.fileUpload);

  if (files.length === 0) {
    return (
      <p className="text-sm text-gray-400">{noDocumentsLabel ?? "No documents available."}</p>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file, index) => (
        <a
          key={file.url ?? index}
          href={file.url ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:bg-gray-50"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
            <FileText className="h-5 w-5 text-gray-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
              {file.name ?? `Document ${index + 1}`}
            </p>
            {file.size != null && (
              <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
