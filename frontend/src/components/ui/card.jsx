import React from "react";

const Card = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`rounded-lg border bg-white shadow-sm ${className}`} {...props}>
      {children}
    </div>
  );
});

const CardHeader = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`flex flex-col space-y-2 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
});

const CardTitle = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <h3 ref={ref} className={`text-2xl font-semibold ${className}`} {...props}>
      {children}
    </h3>
  );
});

const CardDescription = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <p ref={ref} className={`text-sm text-gray-500 ${className}`} {...props}>
      {children}
    </p>
  );
});

const CardContent = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div ref={ref} className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
