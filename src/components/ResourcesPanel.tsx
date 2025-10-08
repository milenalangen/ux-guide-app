import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Download, Play, BookOpen, Users, Zap } from 'lucide-react';

interface ResourcesPanelProps {
  framework: string;
  projectType: string;
  currentPhase: string;
}

const resources = {
  tools: [
    {
      name: 'Figma',
      description: 'Design and prototyping tool',
      category: 'Design',
      type: 'Tool',
      url: '#',
      icon: '🎨'
    },
    {
      name: 'Miro',
      description: 'Collaborative whiteboard for workshops',
      category: 'Collaboration',
      type: 'Tool',
      url: '#',
      icon: '📋'
    },
    {
      name: 'Notion',
      description: 'Documentation and project management',
      category: 'Documentation',
      type: 'Tool',
      url: '#',
      icon: '📝'
    },
    {
      name: 'Maze',
      description: 'User testing and validation platform',
      category: 'Testing',
      type: 'Tool',
      url: '#',
      icon: '🧪'
    }
  ],
  templates: [
    {
      name: 'User Persona Template',
      description: 'Create detailed user personas',
      category: 'Research',
      type: 'Template',
      url: '#',
      icon: '👤'
    },
    {
      name: 'Journey Map Template',
      description: 'Map user journeys and touchpoints',
      category: 'Research',
      type: 'Template',
      url: '#',
      icon: '🗺️'
    },
    {
      name: 'Wireframe Kit',
      description: 'Low-fidelity wireframe components',
      category: 'Design',
      type: 'Template',
      url: '#',
      icon: '📐'
    },
    {
      name: 'Usability Test Script',
      description: 'Structure your usability testing sessions',
      category: 'Testing',
      type: 'Template',
      url: '#',
      icon: '🎬'
    }
  ],
  articles: [
    {
      name: 'Design Thinking Process Guide',
      description: 'Complete guide to the design thinking methodology',
      category: 'Process',
      type: 'Article',
      url: '#',
      icon: '📖'
    },
    {
      name: 'User Research Best Practices',
      description: 'How to conduct effective user research',
      category: 'Research',
      type: 'Article',
      url: '#',
      icon: '🔍'
    },
    {
      name: 'Prototyping Strategies',
      description: 'When and how to prototype effectively',
      category: 'Design',
      type: 'Article',
      url: '#',
      icon: '⚡'
    },
    {
      name: 'Usability Testing Guide',
      description: 'Plan and execute successful usability tests',
      category: 'Testing',
      type: 'Article',
      url: '#',
      icon: '📊'
    }
  ],
  videos: [
    {
      name: 'Design Thinking Workshop',
      description: '45-minute workshop on design thinking basics',
      category: 'Education',
      type: 'Video',
      url: '#',
      icon: '🎥'
    },
    {
      name: 'User Interview Techniques',
      description: 'Master the art of user interviews',
      category: 'Research',
      type: 'Video',
      url: '#',
      icon: '🎤'
    },
    {
      name: 'Figma Prototyping Tutorial',
      description: 'Create interactive prototypes in Figma',
      category: 'Design',
      type: 'Video',
      url: '#',
      icon: '🛠️'
    }
  ]
};

const getIconForType = (type: string) => {
  switch (type) {
    case 'Tool': return <Zap className="w-4 h-4" />;
    case 'Template': return <Download className="w-4 h-4" />;
    case 'Article': return <BookOpen className="w-4 h-4" />;
    case 'Video': return <Play className="w-4 h-4" />;
    default: return <ExternalLink className="w-4 h-4" />;
  }
};

export function ResourcesPanel({ framework, projectType, currentPhase }: ResourcesPanelProps) {
  const renderResourceCard = (resource: any) => (
    <Card key={resource.name} className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{resource.icon}</div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="text-sm font-medium">{resource.name}</h4>
            <Badge variant="outline" className="text-xs">
              {resource.type}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {resource.category}
            </Badge>
            <Button size="sm" variant="ghost" className="h-auto p-1">
              {getIconForType(resource.type)}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Current Phase Resources */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3>Resources for {currentPhase}</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Curated resources specifically helpful for the {currentPhase} phase of {framework}.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.tools.slice(0, 2).map(renderResourceCard)}
          {resources.templates.slice(0, 2).map(renderResourceCard)}
        </div>
      </Card>

      {/* Tools */}
      <div>
        <h3 className="mb-4">Recommended Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.tools.map(renderResourceCard)}
        </div>
      </div>

      {/* Templates */}
      <div>
        <h3 className="mb-4">Templates & Downloads</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.templates.map(renderResourceCard)}
        </div>
      </div>

      {/* Learning Resources */}
      <div>
        <h3 className="mb-4">Learning Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...resources.articles, ...resources.videos].map(renderResourceCard)}
        </div>
      </div>

      {/* Project-Specific Tips */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-blue-800 mb-4">Tips for {projectType} Projects</h3>
        <ul className="space-y-2 text-blue-700 text-sm">
          <li>• Consider platform-specific design patterns and guidelines</li>
          <li>• Pay attention to accessibility requirements early in the process</li>
          <li>• Think about scalability and future feature additions</li>
          <li>• Validate technical feasibility with development team</li>
          <li>• Document design decisions for future reference</li>
        </ul>
      </Card>
    </div>
  );
}