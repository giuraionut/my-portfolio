import React from 'react'
import { cn } from '@/lib/utils' // Adjust the import path as needed

// Define the props for the component
// Extends standard SVG attributes for flexibility (like className, style, id, etc.)
interface LinkedInIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * The size of the icon (width and height).
   * @default 24
   */
  size?: number | string // Allow string for flexibility (e.g., "1.5em")
  /**
   * The fill color of the icon.
   * Defaults to 'currentColor', which inherits the text color of the parent element.
   * @default 'currentColor'
   */
  color?: string
  /**
   * Optional additional CSS classes to apply to the SVG element.
   */
  className?: string
}

/**
 * Renders the LinkedIn logo as an SVG icon.
 * Allows customization of size, color, and additional CSS classes using `cn`.
 */
export default function LinkedInIcon({ size = 24, className, ...rest }: LinkedInIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
      // Use fill-current so the SVG follows the parent's text color
      className={cn('fill-current', className)}
      aria-hidden="true"
      {...rest}
    >
      {/* Background Square */}
      <path d="M8,72 L64,72 C68.418,72 72,68.418 72,64 L72,8 C72,3.58 68.418,0 64,0 L8,0 C3.58,0 0,3.58 0,8 L0,64 C0,68.418 3.58,72 8,72 Z" />

      {/* The "in" Logo - We make this "transparent" by using the background color */}
      <path
        fill="white"
        className="dark:fill-black" // This ensures the logo stays visible
        d="M62,62 L51.31,62 L51.31,43.80 C51.31,38.81 49.42,36.02 45.47,36.02 C41.17,36.02 38.93,38.92 38.93,43.80 L38.93,62 L28.63,62 L28.63,27.33 L38.93,27.33 L38.93,32.00 C38.93,32.00 42.02,26.27 49.38,26.27 C56.73,26.27 62,30.76 62,40.05 L62,62 Z M16.35,22.79 C12.84,22.79 10,19.93 10,16.40 C10,12.86 12.84,10 16.35,10 C19.85,10 22.70,12.86 22.70,16.40 C22.70,19.93 19.86,22.79 16.35,22.79 Z M11.03,62 L21.77,62 L21.77,27.33 L11.03,27.33 L11.03,62 Z"
      />
    </svg>
  )
}
