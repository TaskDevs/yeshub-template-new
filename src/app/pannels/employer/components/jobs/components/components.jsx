export const Button = ({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow-sm border rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const Avatar = ({ children, className = "" }) => {
  return (
    <div
      className={`relative w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export const AvatarImage = ({ src, alt = "avatar", className = "" }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover rounded-full ${className}`}
    />
  );
};

export const AvatarFallback = ({ children, className = "" }) => {
  return (
    <span className={`text-gray-600 text-lg font-semibold ${className}`}>
      {children}
    </span>
  );
};
