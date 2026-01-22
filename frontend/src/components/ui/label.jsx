import React from "react";

const Label = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <label ref={ref} className={`text-sm font-medium ${className}`} {...props}>
      {children}
    </label>
  );
});

Label.displayName = "Label";

export { Label };
