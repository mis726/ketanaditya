import React from 'react';
import { ButtonVariant } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  icon,
  className = '',
  ...props 
}) => {
  // Enhanced Interaction:
  // 1. active:scale-[0.96] creates a tactile "press" feel
  // 2. hover:-translate-y-0.5 adds a subtle "lift"
  // 3. ease-elegant makes the return to state smooth
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center px-6 py-3 border text-sm font-semibold rounded-lg transition-all duration-500 ease-elegant focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.96] hover:-translate-y-0.5";
  
  const variants = {
    primary: "border-transparent text-white bg-primary hover:bg-slate-800 shadow-soft hover:shadow-elevated",
    secondary: "border-slate-300 text-primary bg-white hover:bg-slate-50 hover:border-slate-400",
    accent: "border-transparent text-white bg-accent hover:bg-rose-600 shadow-lg hover:shadow-glow",
    ghost: "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {/* Subtle shine effect for primary/accent buttons */}
      {(variant === 'primary' || variant === 'accent') && (
        <div className="absolute inset-0 -left-[125%] hover:animate-[shine_1s_ease-in-out] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 opacity-0 hover:opacity-100 transition-opacity" />
      )}
      
      {icon && <span className="mr-2 relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;