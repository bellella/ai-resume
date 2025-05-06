import { TemplateId, TEMPLATES } from '@/components/templates/templates';
import { generatePdf } from '@/lib/api/file.api';
import { useMutation } from '@tanstack/react-query';
import templateCss from '!!raw-loader!@/components/templates/template-style.css';

function usePdfDownload() {
  const handlePdfDownload = async (
    selectedTemplateId: TemplateId,
    styleVars?: Record<string, string | number>
  ) => {
    const el = document.getElementById('resume-preview');
    if (!el) return alert('Resume preview not found');

    const selected = TEMPLATES[selectedTemplateId];
    if (!selected) return alert('Selected template information not found');

    const css = selected.css;

    // const cssVars = styleVars
    //   ? `
    //     :root {
    //       ${Object.entries(styleVars)
    //         .map(([key, value]) => `--${key}: ${typeof value === 'number' ? `${value}px` : value};`)
    //         .join('\n')}
    //     }
    //   `
    //   : '';
    const fullHtml = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            ${templateCss}
            ${css}
          </style>
        </head>
        <body>
          ${el.outerHTML}
        </body>
      </html>
    `;
    console.log(fullHtml);
    downloadPdfMutation.mutate({ fullHtml });
  };

  const downloadPdfMutation = useMutation({
    mutationFn: async ({ fullHtml }: { fullHtml: string }) => {
      const blob = await generatePdf({ html: fullHtml });
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
      alert('An error occurred while downloading the PDF.');
    },
  });

  return { handlePdfDownload, downloadPdfMutation };
}

export default usePdfDownload;
