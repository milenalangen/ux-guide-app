import { useState } from 'react';
import { ProjectSetup } from './components/ProjectSetup';
import { WorkflowDashboard } from './components/WorkflowDashboard';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './components/ui/alert-dialog';
import { ArrowLeft, Lightbulb, Target, Users, Trash2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  framework: string;
  projectType: string;
  description: string;
  createdAt: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'setup' | 'workflow'>('home');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleCreateProject = () => {
    setCurrentView('setup');
  };

  const handleProjectCreated = (project: Project) => {
    setProjects([...projects, project]);
    setCurrentProject(project);
    setCurrentView('workflow');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentProject(null);
  };

  const handleOpenProject = (project: Project) => {
    setCurrentProject(project);
    setCurrentView('workflow');
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
    // If the deleted project is currently open, go back to home
    if (currentProject?.id === projectId) {
      setCurrentProject(null);
      setCurrentView('home');
    }
  };

  if (currentView === 'setup') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => setCurrentView('home')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
          <ProjectSetup onProjectCreated={handleProjectCreated} />
        </div>
      </div>
    );
  }

  if (currentView === 'workflow' && currentProject) {
    return (
      <div className="min-h-screen bg-background">
        <WorkflowDashboard 
          project={currentProject} 
          onBackToHome={handleBackToHome}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Lightbulb className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="mb-4">UX Design Workflow</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Streamline your UX design process with step-by-step guidance, detailed checklists, 
            and proven frameworks. Never miss a crucial detail in your design journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3>Structured Process</h3>
            <p className="text-muted-foreground">Follow proven UX frameworks step-by-step</p>
          </Card>
          <Card className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3>Comprehensive Checklists</h3>
            <p className="text-muted-foreground">Never miss important details or tasks</p>
          </Card>
          <Card className="p-6 text-center">
            <Lightbulb className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3>Expert Guidance</h3>
            <p className="text-muted-foreground">Get tips and best practices at every step</p>
          </Card>
        </div>

        {/* Action Section */}
        <div className="text-center mb-12">
          <Button onClick={handleCreateProject} size="lg" className="px-8">
            Start New Project
          </Button>
        </div>

        {/* Recent Projects */}
        {projects.length > 0 && (
          <div>
            <h2 className="mb-6">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card 
                  key={project.id} 
                  className="p-6 hover:shadow-md transition-shadow relative group"
                >
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleOpenProject(project)}
                  >
                    <h3 className="mb-2 pr-8">{project.name}</h3>
                    <p className="text-muted-foreground mb-3">{project.description}</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Framework:</span> {project.framework}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Type:</span> {project.projectType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Created: {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-2 h-auto hover:bg-destructive hover:text-destructive-foreground"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{project.name}"? This action cannot be undone and will permanently remove the project and all its progress.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteProject(project.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete Project
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}