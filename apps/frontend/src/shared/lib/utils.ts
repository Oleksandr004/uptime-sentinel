import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Функция cn (от словосочетания class names) позволяет:
 * 1. Соединять классы по условию (clsx)
 * 2. Автоматически удалять конфликтующие Tailwind классы (tailwind-merge)
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
