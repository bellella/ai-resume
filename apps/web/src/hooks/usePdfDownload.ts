import { useMutation } from '@tanstack/react-query';
import { generatePdf } from '@/lib/api/file';
import templates from '@/components/templates/templates';

interface Template {
  id: string;
  css: string;
}

function usePdfDownload() {
  const handlePdfDownload = async (selectedTemplateId: string) => {
    const el = document.getElementById('resume-preview');
    if (!el) return alert('Resume preview not found');

    const html = el.outerHTML;
    const selected = templates.find((t: Template) => t.id === selectedTemplateId);
    if (!selected) return alert('선택된 템팔릿 정보를 찾을 수 없습니다');

    const css = selected.css;

    downloadPdfMutation.mutate({ html, css });
  };

  const downloadPdfMutation = useMutation({
    mutationFn: async ({ html, css }: { html: string; css: string }) => {
      const blob = await generatePdf(html, css);
      return blob as Blob;
    },
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    },
    onError: (err) => {
      console.error(err);
      alert('PDF 다운로드 중 오류가 발생했습니다.');
    },
  });

  return { handlePdfDownload, downloadPdfMutation };
}

export default usePdfDownload; 