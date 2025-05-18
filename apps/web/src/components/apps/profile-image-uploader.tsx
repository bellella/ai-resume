'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { uploadFile } from '@/lib/api/file.api';

interface ProfileImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  fallbackText?: string;
}

export default function ProfileImageUploader({
  value,
  onChange,
  fallbackText = 'IMAGE',
}: ProfileImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File): Promise<string> => {
    const resizedFile = await resizeImage(file);
    const formData = new FormData();
    formData.append('file', resizedFile);
    const { url } = await uploadFile(formData);
    return url;
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedUrl = await handleUpload(file);
      onChange(uploadedUrl);
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Avatar className="h-24 w-24">
        <AvatarImage src={value || '/placeholder.svg'} alt="Profile" />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      <Button
        variant="input"
        size="sm"
        onClick={() => inputRef.current?.click()}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Change'}
      </Button>
    </div>
  );
}

export async function resizeImage(file: File, maxSize = 512): Promise<File> {
  const imageBitmap = await createImageBitmap(file);

  const ratio = Math.min(maxSize / imageBitmap.width, maxSize / imageBitmap.height, 1);
  const width = imageBitmap.width * ratio;
  const height = imageBitmap.height * ratio;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');
  ctx.drawImage(imageBitmap, 0, 0, width, height);

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) throw new Error('Blob conversion failed');
        resolve(new File([blob], file.name, { type: file.type }));
      },
      file.type,
      0.85
    ); // 0.85 = 압축률 (JPEG일 경우)
  });
}
