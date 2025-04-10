import { useState, useEffect } from "react";

type ToastVariant = "default" | "destructive" | "success";

interface ToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastState extends ToastProps {
  id: number;
  visible: boolean;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const toast = (props: ToastProps) => {
    const id = idCounter;
    
    setToasts((prev) => [
      ...prev,
      {
        id,
        title: props.title,
        description: props.description || "",
        variant: props.variant || "default",
        duration: props.duration || 5000,
        visible: true,
      },
    ]);
    
    setIdCounter((prev) => prev + 1);
    
    // Auto dismiss
    setTimeout(() => {
      setToasts((prev) => 
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      );
      
      // Remove from array after animation
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, props.duration || 5000);
  };

  return { toast, toasts };
}

// Toast Container component that should be included in the layout
export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-md shadow-md transition-all duration-300 ${
            toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          } ${
            toast.variant === "destructive"
              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
              : toast.variant === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
              : "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100"
          }`}
        >
          <div className="font-semibold">{toast.title}</div>
          {toast.description && <div className="text-sm mt-1">{toast.description}</div>}
        </div>
      ))}
    </div>
  );
} 