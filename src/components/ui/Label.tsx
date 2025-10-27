// src/components/ui/Label.tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
);

// CORRECCIÓN AQUÍ: Asegurarse que ComponentPropsWithoutRef incluya 'children' y otros atributos
// React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> ya incluye los atributos correctos
// como 'htmlFor' y 'children'. El problema podría estar en cómo se usa en ContactForm.
export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props} // 'children' y 'htmlFor' están incluidos aquí
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };