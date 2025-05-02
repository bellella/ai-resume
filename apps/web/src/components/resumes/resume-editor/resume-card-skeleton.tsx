import { Card, CardContent } from '@/components/ui/card';

function ResumeCardSkeleton() {
  return (
    <Card className="overflow-hidden aspect-a4 flex flex-col animate-pulse">
      <div className="flex-1 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-4">
        <div className="h-full w-full bg-card rounded-md p-4">
          <div className="h-6 w-24 bg-muted rounded mb-2"></div>
          <div className="h-3 w-full bg-muted rounded mb-1"></div>
          <div className="h-3 w-3/4 bg-muted rounded mb-3"></div>
          <div className="h-12 w-full bg-muted rounded mb-2"></div>
          <div className="h-3 w-1/2 bg-muted rounded"></div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="h-5 w-32 bg-muted rounded mb-2"></div>
            <div className="h-3 w-24 bg-muted rounded"></div>
          </div>
          <div className="flex items-center">
            <div className="h-5 w-5 bg-primary rounded-full"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ResumeCardSkeleton;
