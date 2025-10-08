import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { PhaseDetail } from './PhaseDetail';
import { ResourcesPanel } from './ResourcesPanel';
import { ChecklistPanel } from './ChecklistPanel';
import { ArrowLeft, BookOpen, CheckSquare, Lightbulb, BarChart3 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  framework: string;
  projectType: string;
  description: string;
  createdAt: string;
}

interface WorkflowDashboardProps {
  project: Project;
  onBackToHome: () => void;
}

const frameworkPhases = {
  'Design Thinking': [
    {
      id: 'empathize',
      name: 'Empathize',
      description: 'Understand your users through research and observation',
      color: 'bg-blue-500',
      tasks: [
        'Conduct user interviews',
        'Create user personas',
        'Develop empathy maps',
        'Observe user behavior',
        'Gather user feedback'
      ]
    },
    {
      id: 'define',
      name: 'Define',
      description: 'Define the core problems and user needs',
      color: 'bg-green-500',
      tasks: [
        'Synthesize research findings',
        'Create problem statements',
        'Define user journey maps',
        'Establish design principles',
        'Set success metrics'
      ]
    },
    {
      id: 'ideate',
      name: 'Ideate',
      description: 'Generate creative solutions and ideas',
      color: 'bg-yellow-500',
      tasks: [
        'Brainstorm solutions',
        'Create concept sketches',
        'Develop user flows',
        'Generate multiple alternatives',
        'Prioritize ideas'
      ]
    },
    {
      id: 'prototype',
      name: 'Prototype',
      description: 'Build testable versions of your solutions',
      color: 'bg-orange-500',
      tasks: [
        'Create low-fidelity wireframes',
        'Build interactive prototypes',
        'Design high-fidelity mockups',
        'Prepare test scenarios',
        'Set up testing environment'
      ]
    },
    {
      id: 'test',
      name: 'Test',
      description: 'Validate your solutions with real users',
      color: 'bg-red-500',
      tasks: [
        'Conduct usability testing',
        'Gather user feedback',
        'Analyze test results',
        'Iterate on design',
        'Document learnings'
      ]
    }
  ],
  'Double Diamond': [
    {
      id: 'discover',
      name: 'Discover',
      description: 'Explore and understand the problem space',
      color: 'bg-purple-500',
      tasks: [
        'Market research',
        'User research',
        'Competitive analysis',
        'Stakeholder interviews',
        'Problem exploration'
      ]
    },
    {
      id: 'define',
      name: 'Define',
      description: 'Synthesize insights and define the challenge',
      color: 'bg-blue-500',
      tasks: [
        'Insights synthesis',
        'Problem definition',
        'Opportunity mapping',
        'Requirements gathering',
        'Success criteria'
      ]
    },
    {
      id: 'develop',
      name: 'Develop',
      description: 'Generate and refine potential solutions',
      color: 'bg-green-500',
      tasks: [
        'Ideation workshops',
        'Concept development',
        'Prototyping',
        'Solution refinement',
        'Feasibility assessment'
      ]
    },
    {
      id: 'deliver',
      name: 'Deliver',
      description: 'Finalize and implement the solution',
      color: 'bg-orange-500',
      tasks: [
        'Final design creation',
        'Testing and validation',
        'Implementation planning',
        'Handoff to development',
        'Launch preparation'
      ]
    }
  ],
  'Lean UX': [
    {
      id: 'assumptions',
      name: 'Assumptions',
      description: 'Identify and document key assumptions',
      color: 'bg-indigo-500',
      tasks: [
        'Business assumptions',
        'User assumptions',
        'Feature assumptions',
        'Risk assessment',
        'Hypothesis formation'
      ]
    },
    {
      id: 'build-mvp',
      name: 'Build MVP',
      description: 'Create minimum viable product to test assumptions',
      color: 'bg-cyan-500',
      tasks: [
        'MVP definition',
        'Quick prototyping',
        'Feature prioritization',
        'Rapid development',
        'Testing preparation'
      ]
    },
    {
      id: 'measure',
      name: 'Measure',
      description: 'Collect data and user feedback',
      color: 'bg-green-500',
      tasks: [
        'A/B testing',
        'Analytics setup',
        'User feedback collection',
        'Performance metrics',
        'Data analysis'
      ]
    },
    {
      id: 'learn-iterate',
      name: 'Learn & Iterate',
      description: 'Learn from data and iterate on the solution',
      color: 'bg-pink-500',
      tasks: [
        'Insights analysis',
        'Decision making',
        'Design iteration',
        'Feature refinement',
        'Next cycle planning'
      ]
    }
  ],
  'Human-Centered Design': [
    {
      id: 'inspiration',
      name: 'Inspiration',
      description: 'Understand people and identify opportunities',
      color: 'bg-teal-500',
      tasks: [
        'Field research',
        'User observations',
        'Cultural immersion',
        'Opportunity identification',
        'Insight gathering'
      ]
    },
    {
      id: 'ideation',
      name: 'Ideation',
      description: 'Generate and develop ideas',
      color: 'bg-yellow-500',
      tasks: [
        'Brainstorming sessions',
        'Concept development',
        'Solution mapping',
        'Idea evaluation',
        'Prototype planning'
      ]
    },
    {
      id: 'implementation',
      name: 'Implementation',
      description: 'Bring solutions to life',
      color: 'bg-red-500',
      tasks: [
        'Prototype creation',
        'User testing',
        'Solution refinement',
        'Implementation strategy',
        'Impact measurement'
      ]
    }
  ]
};

export function WorkflowDashboard({ project, onBackToHome }: WorkflowDashboardProps) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  
  const phases = frameworkPhases[project.framework as keyof typeof frameworkPhases] || [];
  const totalTasks = phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTaskCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercentage = totalTasks > 0 ? (completedTaskCount / totalTasks) * 100 : 0;

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBackToHome}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1>{project.name}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{project.framework}</Badge>
                  <Badge variant="outline">{project.projectType}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="font-medium">{completedTaskCount} of {totalTasks} tasks</p>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progressPercentage} className="w-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Phase Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="mb-4">Project Phases</h3>
              <div className="space-y-2">
                {phases.map((phase, index) => {
                  const phaseTaskIds = phase.tasks.map((_, taskIndex) => `${phase.id}-${taskIndex}`);
                  const completedPhaseTaskCount = phaseTaskIds.filter(id => completedTasks[id]).length;
                  const phaseProgress = (completedPhaseTaskCount / phase.tasks.length) * 100;
                  
                  return (
                    <div
                      key={phase.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        currentPhase === index ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                      }`}
                      onClick={() => setCurrentPhase(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${phase.color}`} />
                        <div className="flex-1">
                          <p className="font-medium">{phase.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress value={phaseProgress} className="flex-1 h-1" />
                            <span className="text-xs">
                              {completedPhaseTaskCount}/{phase.tasks.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="checklist" className="flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4" />
                  <span>Checklist</span>
                </TabsTrigger>
                <TabsTrigger value="guidance" className="flex items-center space-x-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Guidance</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Resources</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <PhaseDetail 
                  phase={phases[currentPhase]} 
                  projectType={project.projectType}
                />
              </TabsContent>

              <TabsContent value="checklist" className="mt-6">
                <ChecklistPanel 
                  phases={phases}
                  completedTasks={completedTasks}
                  onToggleTask={toggleTask}
                />
              </TabsContent>

              <TabsContent value="guidance" className="mt-6">
                <Card className="p-6">
                  <h3 className="mb-4">Phase Guidance: {phases[currentPhase]?.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4>Key Objectives</h4>
                      <p className="text-muted-foreground">{phases[currentPhase]?.description}</p>
                    </div>
                    
                    <div>
                      <h4>Best Practices</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Focus on user needs and pain points</li>
                        <li>Collaborate with stakeholders regularly</li>
                        <li>Document insights and decisions</li>
                        <li>Validate assumptions early and often</li>
                        <li>Iterate based on feedback</li>
                      </ul>
                    </div>

                    <div>
                      <h4>Common Pitfalls to Avoid</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Skipping user research</li>
                        <li>Making assumptions without validation</li>
                        <li>Designing in isolation</li>
                        <li>Ignoring technical constraints</li>
                        <li>Not measuring success</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-6">
                <ResourcesPanel 
                  framework={project.framework}
                  projectType={project.projectType}
                  currentPhase={phases[currentPhase]?.name}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}