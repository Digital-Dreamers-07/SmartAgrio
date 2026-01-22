import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ fullScreen = true, message = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="w-8 h-8 text-primary-600 animate-spin" />
      <span className="ml-2 text-gray-600">{message}</span>
    </div>
  );
};

export default LoadingSpinner;