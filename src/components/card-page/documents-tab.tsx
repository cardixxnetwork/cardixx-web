import { FileText } from "lucide-react";
import type { CardFullFragment } from "@/graphql/generated/graphql";

interface FileItem {
  name?: string;
  url?: string;
  uri?: string;
  size?: number;
  type?: string;
}

interface DocumentsSectionProps {
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

export function DocumentsSection({ card, noDocumentsLabel }: DocumentsSectionProps) {
  const files = parseFiles(card.fileUpload);

  if (files.length === 0) {
    return (
      <section id="documents" className="scroll-mt-[80px]">
        <h2 className="text-xl font-semibold text-[#252827]">Documents</h2>
        <p className="mt-4 text-sm text-[#8E9290]">{noDocumentsLabel ?? "No documents available."}</p>
      </section>
    );
  }

  return (
    <section id="documents" className="scroll-mt-[80px]">
      <h2 className="mb-4 text-xl font-semibold text-[#252827]">Documents</h2>
      <div className="flex flex-wrap gap-3">
        {files.map((file, index) => (
          <a
            key={file.url ?? file.uri ?? index}
            href={file.url ?? file.uri ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[252px] items-center gap-4 rounded-2xl border border-dashed border-[#CDD0CE] p-4 transition-colors hover:bg-[#FAFAFA]"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center">
              <FileText className="h-6 w-6 text-red-500" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-[#404644]">
                {file.name ?? `Document ${index + 1}`}
              </p>
              {file.size != null && (
                <p className="text-[13px] font-medium text-[#8E9290]">{formatFileSize(file.size)}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
