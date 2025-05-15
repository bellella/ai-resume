'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ResumeFormValues } from '@/lib/hooks/use-resume-form';
import { parseResumeFile } from '@/lib/api/file.api';
import { ArrowLeft, Pencil, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import FileDropZone from '@/components/forms/file-drop-zone';

interface ResumeStartDialogProps {
  form: UseFormReturn<ResumeFormValues>;
}

export default function ResumeStartDialog({ form }: ResumeStartDialogProps) {
  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState<'initial' | 'upload'>('initial');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => {
      if (!selectedFile) {
        return;
      }
      const formData = new FormData();
      formData.append('file', selectedFile);
      return parseResumeFile(formData);
    },
    onSuccess: (data) => {
      form.reset(data);
      setOpen(false);
    },
    onError: (err) => {
      console.error('Resume parse failed:', err);
    },
  });

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="p-8 w-full max-w-2xl rounded-xl shadow-xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {mode === 'initial' && (
          <div className="flex flex-col items-center space-y-6">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold">
                Are you uploading an existing resume?
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Just review, edit, and update it with new information
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <button
                onClick={() => setMode('upload')}
                className="border rounded-lg p-6 text-center hover:border-primary focus:outline-none"
              >
                <Upload className="mx-auto mb-4 h-6 w-6 text-primary" />
                <div className="font-semibold text-lg">Yes, upload from my resume</div>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll give you expert guidance to fill out your info and enhance your resume,
                  from start to finish
                </p>
              </button>
              <button
                onClick={() => setOpen(false)}
                className="border rounded-lg p-6 text-center hover:border-primary focus:outline-none"
              >
                <Pencil className="mx-auto mb-4 h-6 w-6 text-primary" />
                <div className="font-semibold text-lg">No, start from scratch</div>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll guide you through the whole process so your skills can shine
                </p>
              </button>
            </div>
          </div>
        )}

        {mode === 'upload' && (
          <div className="space-y-4">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl font-bold">Upload your resume</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                PDF or Word format supported. We’ll extract your info and get you started.
              </DialogDescription>
            </DialogHeader>

            <FileDropZone onFileAccepted={handleFileUpload} isLoading={isPending} />
            <Button
              type="button"
              onClick={() => mutateAsync()}
              disabled={isPending || !selectedFile}
              className="w-full"
            >
              {isPending ? 'Parsing...' : `Create Resume`}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
