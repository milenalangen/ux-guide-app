import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';

interface Phase {
  id: string;
  name: string;
  description: string;
  color: string;
  tasks: string[];
}

interface ChecklistPanelProps {
  phases: Phase[];
  completedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
}

export function ChecklistPanel({ phases, completedTasks, onToggleTask }: ChecklistPanelProps) {
  const getTotalProgress = () => {
    const totalTasks = phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
    const completedCount = Object.values(completedTasks).filter(Boolean).length;
    return totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;
  };

  const getPhaseProgress = (phase: Phase) => {
    const phaseTaskIds = phase.tasks.map((_, index) => `${phase.id}-${index}`);
    const completedPhaseTaskCount = phaseTaskIds.filter(id => completedTasks[id]).length;
    return (completedPhaseTaskCount / phase.tasks.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3>Overall Progress</h3>
          <span className="text-sm text-muted-foreground">
            {Object.values(completedTasks).filter(Boolean).length} of{' '}
            {phases.reduce((sum, phase) => sum + phase.tasks.length, 0)} tasks completed
          </span>
        </div>
        <Progress value={getTotalProgress()} className="w-full" />
      </Card>

      {/* Phase Checklists */}
      <div className="space-y-4">
        {phases.map((phase) => {
          const phaseProgress = getPhaseProgress(phase);
          const isPhaseComplete = phaseProgress === 100;
          
          return (
            <Card key={phase.id} className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 rounded-lg ${phase.color} flex items-center justify-center`}>
                  {isPhaseComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <Circle className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4>{phase.name}</h4>
                    {isPhaseComplete && <Badge variant="default" className="bg-green-500">Complete</Badge>}
                  </div>
                  <Progress value={phaseProgress} className="w-full h-2" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {phase.tasks.filter((_, index) => completedTasks[`${phase.id}-${index}`]).length}/
                  {phase.tasks.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {phase.tasks.map((task, index) => {
                  const taskId = `${phase.id}-${index}`;
                  const isCompleted = completedTasks[taskId];
                  
                  return (
                    <div key={taskId} className="flex items-start space-x-3">
                      <Checkbox
                        checked={isCompleted}
                        onCheckedChange={() => onToggleTask(taskId)}
                        className="mt-1"
                      />
                      <label 
                        className={`flex-1 cursor-pointer text-sm ${
                          isCompleted ? 'line-through text-muted-foreground' : ''
                        }`}
                        onClick={() => onToggleTask(taskId)}
                      >
                        {task}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Completion Message */}
      {getTotalProgress() === 100 && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="text-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-green-800 mb-2">Congratulations!</h3>
            <p className="text-green-700">
              You've completed all tasks in your UX design workflow. 
              Your project is ready for the next phase!
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}