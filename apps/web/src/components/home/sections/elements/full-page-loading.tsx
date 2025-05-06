import { Loader2 } from 'lucide-react';

export default function FullPageLoading() {
  return (
    <div className="h-content-min-height flex flex-col items-center justify-center gap-2 text-primary">
      <Loader2 className="h-10 w-10 animate-spin" />
      <p className="text-sm">Loading...</p>
    </div>
  );
}
