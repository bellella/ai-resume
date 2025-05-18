import { TemplateId, TEMPLATES } from '@/components/templates/templates';
import { generatePdf } from '@/lib/api/file.api';
import { useMutation } from '@tanstack/react-query';

function usePdfDownload() {
  const downloadPdf = async (selectedTemplateId: TemplateId) => {
    const el = document.getElementById('resume-preview');
    if (!el) return alert('Resume preview not found');

    const selected = TEMPLATES[selectedTemplateId];
    if (!selected) return alert('Selected template information not found');

    const css = require(
      `!!raw-loader!@/components/templates/${selectedTemplateId}/style.css`
    ).default;

    const defaultCss = require('!!raw-loader!@/components/templates/template-style.css').default;

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
          ${defaultCss}
            ${css}
          </style>
        </head>
        <body>
          ${el.outerHTML}
        </body>
      </html>
    `;
    return downloadPdfMutation.mutateAsync({ fullHtml });
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

  return { downloadPdf, downloadPdfMutation };
}

export default usePdfDownload;
