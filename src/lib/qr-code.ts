/**
 * QR Code Generator — ported from cardixx-mobile/utils/qr-code.ts
 * Generates SVG QR codes synchronously for use in server components.
 */

import QRCode from "qrcode";

const QUIET_ZONE = 4;

function matrixToSvg(
  modules: boolean[][],
  moduleSize: number = 4,
  color: string = "black"
): string {
  const size = modules.length;
  const imageSize = (size + QUIET_ZONE * 2) * moduleSize;

  let paths = "";
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (modules[row][col]) {
        const x = (col + QUIET_ZONE) * moduleSize;
        const y = (row + QUIET_ZONE) * moduleSize;
        paths += `M${x},${y}h${moduleSize}v${moduleSize}h-${moduleSize}z`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${imageSize} ${imageSize}" width="${imageSize}" height="${imageSize}"><path d="${paths}" fill="${color}"/></svg>`;
}

export function generateQrCodeSvg(
  data: string,
  moduleSize: number = 4,
  color: string = "black"
): string {
  if (!data) return "";

  try {
    const qr = QRCode.create(data, { errorCorrectionLevel: "M" });
    const modules = qr.modules;
    const size = modules.size;
    const boolMatrix: boolean[][] = [];

    for (let row = 0; row < size; row++) {
      boolMatrix[row] = [];
      for (let col = 0; col < size; col++) {
        boolMatrix[row][col] = modules.get(row, col) === 1;
      }
    }

    return matrixToSvg(boolMatrix, moduleSize, color);
  } catch {
    return "";
  }
}

export function generateQrCodeDataUrl(
  data: string,
  moduleSize: number = 4,
  color: string = "black"
): string {
  if (!data) return "";
  const svg = generateQrCodeSvg(data, moduleSize, color);
  if (!svg) return "";
  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

export function generateCardQrCodeUrl(
  cardId: string,
  moduleSize: number = 4,
  color: string = "black"
): string {
  if (!cardId) return "";
  const shareUrl = `https://cardixx.com/c/${cardId}`;
  return generateQrCodeDataUrl(shareUrl, moduleSize, color);
}
