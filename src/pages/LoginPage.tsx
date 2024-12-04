import React from 'react';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/Button';
import { Upload } from 'lucide-react';

export function LoginPage() {
  const { login, isLoading } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center mb-8">
        <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">ExpenseAI</h1>
        <p className="text-lg text-gray-600 mb-8">
          Automate your expense management with AI
        </p>
      </div>
      <Button 
        size="lg" 
        onClick={() => login()}
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In to Get Started'}
      </Button>
    </div>
  );
}