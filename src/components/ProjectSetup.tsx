import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { CheckCircle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  framework: string;
  projectType: string;
  description: string;
  createdAt: string;
}

interface ProjectSetupProps {
  onProjectCreated: (project: Project) => void;
}

const frameworks = [
  {
    id: 'design-thinking',
    name: 'Design Thinking',
    description: '5-phase human-centered approach: Empathize, Define, Ideate, Prototype, Test',
    phases: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'],
    bestFor: ['Innovation projects', 'User-centric solutions', 'Complex problems']
  },
  {
    id: 'double-diamond',
    name: 'Double Diamond',
    description: 'Discover, Define, Develop, Deliver - divergent and convergent thinking',
    phases: ['Discover', 'Define', 'Develop', 'Deliver'],
    bestFor: ['Strategic design', 'Service design', 'Product development']
  },
  {
    id: 'lean-ux',
    name: 'Lean UX',
    description: 'Build-Measure-Learn cycle focused on rapid iteration and validation',
    phases: ['Assumptions', 'Build MVP', 'Measure', 'Learn & Iterate'],
    bestFor: ['Startups', 'Agile teams', 'Rapid prototyping']
  },
  {
    id: 'hcd',
    name: 'Human-Centered Design',
    description: 'IDEO methodology focusing on desirability, feasibility, and viability',
    phases: ['Inspiration', 'Ideation', 'Implementation'],
    bestFor: ['Social impact', 'Complex systems', 'Behavioral change']
  }
];

const projectTypes = [
  { id: 'mobile-app', name: 'Mobile App', description: 'iOS, Android, or cross-platform mobile application' },
  { id: 'web-app', name: 'Web Application', description: 'Interactive web-based application or SaaS product' },
  { id: 'website', name: 'Website', description: 'Marketing site, portfolio, or informational website' },
  { id: 'dashboard', name: 'Dashboard', description: 'Analytics, admin panel, or data visualization interface' },
  { id: 'ecommerce', name: 'E-commerce', description: 'Online store or marketplace platform' },
  { id: 'saas', name: 'SaaS Platform', description: 'Software as a Service product or platform' }
];

export function ProjectSetup({ onProjectCreated }: ProjectSetupProps) {
  const [step, setStep] = useState(1);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState('');

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCreateProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      name: projectName,
      framework: frameworks.find(f => f.id === selectedFramework)?.name || '',
      projectType: projectTypes.find(t => t.id === selectedProjectType)?.name || '',
      description: projectDescription,
      createdAt: new Date().toISOString()
    };
    onProjectCreated(project);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return projectName.trim() && projectDescription.trim();
      case 2: return selectedFramework;
      case 3: return selectedProjectType;
      default: return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stepNum < step ? 'bg-primary text-primary-foreground' :
                stepNum === step ? 'bg-primary text-primary-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {stepNum < step ? <CheckCircle className="w-4 h-4" /> : stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-12 h-0.5 ${stepNum < step ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Project Details */}
      {step === 1 && (
        <Card className="p-8">
          <h2 className="mb-6">Project Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter your project name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="project-description">Project Description</Label>
              <Textarea
                id="project-description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Briefly describe your project goals and scope"
                className="mt-2"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next: Choose Framework
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Framework Selection */}
      {step === 2 && (
        <Card className="p-8">
          <h2 className="mb-6">Choose Your UX Framework</h2>
          <RadioGroup value={selectedFramework} onValueChange={setSelectedFramework}>
            <div className="space-y-4">
              {frameworks.map((framework) => (
                <Card key={framework.id} className={`p-4 cursor-pointer transition-colors ${
                  selectedFramework === framework.id ? 'border-primary bg-primary/5' : ''
                }`}>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={framework.id} id={framework.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={framework.id} className="cursor-pointer">
                        <h3 className="mb-2">{framework.name}</h3>
                      </Label>
                      <p className="text-muted-foreground mb-3">{framework.description}</p>
                      <div className="mb-3">
                        <p className="text-sm font-medium mb-2">Phases:</p>
                        <div className="flex flex-wrap gap-2">
                          {framework.phases.map((phase) => (
                            <Badge key={phase} variant="secondary">{phase}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Best for:</p>
                        <div className="flex flex-wrap gap-2">
                          {framework.bestFor.map((item) => (
                            <Badge key={item} variant="outline">{item}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </RadioGroup>
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={!canProceed()}>
              Next: Project Type
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Project Type Selection */}
      {step === 3 && (
        <Card className="p-8">
          <h2 className="mb-6">What Are You Designing?</h2>
          <RadioGroup value={selectedProjectType} onValueChange={setSelectedProjectType}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectTypes.map((type) => (
                <Card key={type.id} className={`p-4 cursor-pointer transition-colors ${
                  selectedProjectType === type.id ? 'border-primary bg-primary/5' : ''
                }`}>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={type.id} className="cursor-pointer">
                        <h4 className="mb-2">{type.name}</h4>
                        <p className="text-muted-foreground text-sm">{type.description}</p>
                      </Label>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </RadioGroup>
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleCreateProject} disabled={!canProceed()}>
              Create Project
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}