import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "../lib/utils"

// Типи для Root
type AvatarRootProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
type AvatarRootRef = React.ComponentRef<typeof AvatarPrimitive.Root>

const Avatar = React.forwardRef<AvatarRootRef, AvatarRootProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

// Типи для Image
type AvatarImageProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
type AvatarImageRef = React.ComponentRef<typeof AvatarPrimitive.Image>

const AvatarImage = React.forwardRef<AvatarImageRef, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  )
)
AvatarImage.displayName = "AvatarImage"

// Типи для Fallback
type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
type AvatarFallbackRef = React.ComponentRef<typeof AvatarPrimitive.Fallback>

const AvatarFallback = React.forwardRef<AvatarFallbackRef, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
      {...props}
    />
  )
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
