import { toPng } from 'html-to-image';
import { uploadFile } from '../api/file.api';

export async function generateResumeThumbnail(): Promise<string> {
  const node = document.getElementById('resume-template');

  if (!node) throw new Error('Resume DOM not found');

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
  });

  // 👉 base64 → Blob
  const res = await fetch(dataUrl);
  const blob = await res.blob();

  // 👉 Blob → File
  const file = new File([blob], 'resume-thumbnail.png', { type: 'image/png' });

  // 👉 FormData 업로드
  const formData = new FormData();
  formData.append('file', file);

  const uploadRes = await uploadFile(formData); // 서버에서 multipart/form-data로 받아야 함

  return uploadRes.url; // 업로드된 이미지 URL 반환
}
