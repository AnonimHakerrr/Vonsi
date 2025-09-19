import React from 'react'
import { cn } from '../lib/utils' // імпорт твоєї функції cn

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // порожній об’єкт ESLint вважає помилкою, тож можна додати optional проп
  _?: never
}

interface CardSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  _?: never
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-white text-black flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardSlotProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6',
        className
      )}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: CardSlotProps) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

export function CardDescription({ className, ...props }: CardSlotProps) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-gray-500 text-sm', className)}
      {...props}
    />
  )
}

export function CardAction({ className, ...props }: CardSlotProps) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: CardSlotProps) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

export function CardFooter({ className, ...props }: CardSlotProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 pt-6 border-t', className)}
      {...props}
    />
  )
}
