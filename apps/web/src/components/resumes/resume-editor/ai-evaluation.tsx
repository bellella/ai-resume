'use client';

import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, AlertTriangle } from 'lucide-react';
import { CircularProgress } from './circular-progress';
import { Button } from '@/components/ui/button';
import { CoinConfirmDialog } from '@/components/coins/coin-confirm-dialog';
import { useState } from 'react';
import { AiEvaluationDetail } from '@ai-resume/types';

interface AIEvaluationProps {
  evaluation?: AiEvaluationDetail;
  onEvaluate: () => void;
  isEvaluating: boolean;
}

export default function AIEvaluation({ evaluation, onEvaluate, isEvaluating }: AIEvaluationProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const handleEvaluate = () => {
    setOpenDialog(true);
  };

  const handleConfirmEvaluate = () => {
    setOpenDialog(false);
    onEvaluate();
  };

  return (
    <>
      {evaluation ? (
        <div className="mt-10 space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20">
                <CircularProgress value={evaluation.score} />
              </div>
              <div>
                <div className="flex justify-between items-end">
                  <h2 className="text-lg font-semibold">AI Evaluation Result</h2>
                  <Button
                    type="button"
                    size="sm"
                    variant="accent"
                    onClick={handleEvaluate}
                    disabled={isEvaluating}
                  >
                    {isEvaluating ? 'Evaluating...' : 'Reevaluate with AI'}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{evaluation.summary}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Last evaluated on: {evaluation.lastUpdated.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center space-x-2 text-green-600 font-semibold">
                  <BadgeCheck className="w-5 h-5" />
                  <span>Strengths</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                  {evaluation.strengths.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center space-x-2 text-red-600 font-semibold">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Areas for Improvement</span>
                </div>
                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                  {evaluation.weaknesses.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground mb-4">
            This resume has not been evaluated yet.
          </p>
          <Button type="button" variant="accent" onClick={handleEvaluate}>
            Evaluate with AI
          </Button>
        </div>
      )}
      <CoinConfirmDialog
        open={openDialog}
        price={1}
        onCancel={() => setOpenDialog(false)}
        onConfirm={handleConfirmEvaluate}
        message={
          <p className="text-center">
            This will consume <strong className="text-coin">1 coin</strong> to evaluate your resume
            using AI.
          </p>
        }
      />
    </>
  );
}
