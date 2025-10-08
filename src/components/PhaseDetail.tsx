import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, Clock, Users, Target, Lightbulb, FileText } from 'lucide-react';

interface Phase {
  id: string;
  name: string;
  description: string;
  color: string;
  tasks: string[];
}

interface PhaseDetailProps {
  phase: Phase;
  projectType: string;
}

const phaseDeliverables = {
  empathize: ['User personas', 'Empathy maps', 'Interview transcripts', 'User journey maps'],
  define: ['Problem statements', 'How might we questions', 'Design principles', 'Success metrics'],
  ideate: ['Concept sketches', 'User flows', 'Feature prioritization', 'Solution alternatives'],
  prototype: ['Wireframes', 'Interactive prototypes', 'Design system', 'Test scenarios'],
  test: ['Usability test results', 'User feedback', 'Iteration recommendations', 'Final designs'],
  discover: ['Market research report', 'User research insights', 'Competitive analysis', 'Problem landscape'],
  develop: ['Solution concepts', 'Prototypes', 'Design specifications', 'Implementation plan'],
  deliver: ['Final designs', 'Design system', 'Developer handoff', 'Launch materials'],
  assumptions: ['Assumption mapping', 'Hypothesis statements', 'Risk assessment', 'Validation plan'],
  'build-mvp': ['MVP specification', 'Prototype', 'Feature backlog', 'Testing framework'],
  measure: ['Analytics dashboard', 'User feedback', 'Performance metrics', 'Test results'],
  'learn-iterate': ['Insights report', 'Design iterations', 'Roadmap updates', 'Next cycle plan'],
  inspiration: ['User insights', 'Opportunity map', 'Cultural observations', 'Design brief'],
  ideation: ['Solution concepts', 'Idea prioritization', 'Concept validation', 'Prototype plan'],
  implementation: ['Final solution', 'Implementation guide', 'Impact metrics', 'Feedback loops']
};

const phaseTiming = {
  empathize: '1-2 weeks',
  define: '3-5 days',
  ideate: '1-2 weeks',
  prototype: '1-3 weeks',
  test: '1-2 weeks',
  discover: '2-3 weeks',
  develop: '2-4 weeks',
  deliver: '1-2 weeks',
  assumptions: '2-3 days',
  'build-mvp': '1-2 weeks',
  measure: '1-2 weeks',
  'learn-iterate': '3-5 days',
  inspiration: '2-3 weeks',
  ideation: '1-2 weeks',
  implementation: '2-4 weeks'
};

const phaseStakeholders = {
  empathize: ['Users', 'Researchers', 'Product managers'],
  define: ['Design team', 'Product managers', 'Stakeholders'],
  ideate: ['Designers', 'Developers', 'Product team'],
  prototype: ['Designers', 'Developers', 'Researchers'],
  test: ['Users', 'Researchers', 'Design team'],
  discover: ['Researchers', 'Business analysts', 'Stakeholders'],
  develop: ['Design team', 'Developers', 'Product managers'],
  deliver: ['Development team', 'QA', 'Stakeholders'],
  assumptions: ['Product team', 'Stakeholders', 'Researchers'],
  'build-mvp': ['Developers', 'Designers', 'Product managers'],
  measure: ['Data analysts', 'Researchers', 'Product team'],
  'learn-iterate': ['Design team', 'Product managers', 'Developers'],
  inspiration: ['Researchers', 'Community members', 'Domain experts'],
  ideation: ['Design team', 'Stakeholders', 'Users'],
  implementation: ['Implementation team', 'Partners', 'End users']
};

export function PhaseDetail({ phase, projectType }: PhaseDetailProps) {
  if (!phase) return null;

  const deliverables = phaseDeliverables[phase.id as keyof typeof phaseDeliverables] || [];
  const timing = phaseTiming[phase.id as keyof typeof phaseTiming] || '1-2 weeks';
  const stakeholders = phaseStakeholders[phase.id as keyof typeof phaseStakeholders] || [];

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <Card className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-lg ${phase.color} flex items-center justify-center`}>
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="mb-2">{phase.name}</h2>
            <p className="text-muted-foreground mb-4">{phase.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{timing}</span>
              </div>
              <Badge variant="outline">{projectType}</Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Tasks */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h3>Key Tasks</h3>
          </div>
          <ul className="space-y-3">
            {phase.tasks.map((task, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{task}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Expected Deliverables */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h3>Expected Deliverables</h3>
          </div>
          <ul className="space-y-3">
            {deliverables.map((deliverable, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm">{deliverable}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Key Stakeholders */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3>Key Stakeholders</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {stakeholders.map((stakeholder, index) => (
              <Badge key={index} variant="secondary">{stakeholder}</Badge>
            ))}
          </div>
        </Card>

        {/* Phase Tips */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3>Success Tips</h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Document everything for future reference</li>
            <li>• Involve stakeholders in decision-making</li>
            <li>• Regular check-ins with the team</li>
            <li>• Keep user needs at the center</li>
            <li>• Be open to changing direction based on insights</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}