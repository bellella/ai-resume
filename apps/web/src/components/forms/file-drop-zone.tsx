import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { toast } from 'sonner';

interface FileDropZoneProps {
  onFileAccepted: (file: File) => void;
  isLoading: boolean;
  selectedFile?: File | null;
}

export default function FileDropZone({ onFileAccepted, isLoading }: FileDropZoneProps) {
  const [fileName, setFileName] = useState<string>();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    onDropRejected: () => {
      toast.error('Check the file extension');
    },
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFileName(file.name);
        onFileAccepted(file);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition ${
        isDragActive ? 'border-primary bg-muted' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      {isLoading ? (
        <p className="text-muted-foreground">Uploading...</p>
      ) : fileName ? (
        <p className="text-foreground font-medium">📄 {fileName}</p>
      ) : (
        <p className="text-muted-foreground">
          {isDragActive
            ? 'Drop the file here...'
            : 'Drag & drop your resume here, or click to select a file'}
        </p>
      )}
    </div>
  );
}
