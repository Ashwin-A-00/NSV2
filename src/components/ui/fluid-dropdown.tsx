"use client"

import * as React from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { ChevronDown, Layers } from "lucide-react"

// Utility function for className merging
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// Custom hook for click outside detection
function useClickAway(ref: React.RefObject<HTMLElement | null>, handler: (event: MouseEvent | TouchEvent) => void) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}

// Button component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline"
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "outline" && "border border-neutral-700 bg-transparent",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

// Types
export interface FluidDropdownItem {
  id: string
  label: string
  icon?: React.ElementType
  color?: string
}

// Icon wrapper with animation
const IconWrapper = ({
  icon: Icon,
  isHovered,
  color,
}: { icon: React.ElementType; isHovered: boolean; color: string }) => (
  <motion.div 
    className="w-4 h-4 mr-2 relative" 
    initial={false} 
    animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
  >
    <Icon className="w-4 h-4" />
    {isHovered && (
      <motion.div
        className="absolute inset-0"
        style={{ color }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Icon className="w-4 h-4" strokeWidth={2} />
      </motion.div>
    )}
  </motion.div>
)

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

interface FluidDropdownProps {
  items: FluidDropdownItem[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

// Main component
export function FluidDropdown({ items, value, onChange, placeholder = "Select...", className }: FluidDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [hoveredItemId, setHoveredItemId] = React.useState<string | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  useClickAway(dropdownRef, () => setIsOpen(false))

  const selectedItem = items.find(item => item.id === value)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cn("w-full relative", className)}
        ref={dropdownRef}
      >
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-full justify-between bg-white/5 border-white/10 text-white/70 rounded-full",
              "hover:bg-white/10 hover:text-white",
              "focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-black",
              "transition-all duration-200 ease-in-out",
              "h-10 px-4",
              isOpen && "bg-white/10 text-white",
            )}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span className="flex items-center">
              {selectedItem ? (
                <>
                  <IconWrapper 
                    icon={selectedItem.icon || Layers} 
                    isHovered={false} 
                    color={selectedItem.color || "#A06CD5"} 
                  />
                  {selectedItem.label}
                </>
              ) : (
                <span className="opacity-50">{placeholder}</span>
              )}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center w-5 h-5"
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  height: "auto",
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  height: 0,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1,
                  },
                }}
                className="absolute left-0 right-0 top-full mt-2 z-50"
                onKeyDown={handleKeyDown}
              >
                <div
                  className="w-full rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl p-1 shadow-2xl overflow-hidden"
                  style={{ transformOrigin: "top" }}
                >
                  <motion.div 
                    className="py-1 relative max-h-[240px] overflow-y-auto custom-scrollbar" 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="visible"
                  >
                    <AnimatePresence>
                      {hoveredItemId && (
                        <motion.div
                          layoutId="hover-highlight"
                          className="absolute inset-x-1 bg-white/10 rounded-xl pointer-events-none"
                          initial={false}
                          animate={{
                            y: items.findIndex((c) => hoveredItemId === c.id) * 44,
                            height: 40,
                          }}
                          transition={{
                            type: "spring",
                            bounce: 0.15,
                            duration: 0.4,
                          }}
                        />
                      )}
                    </AnimatePresence>
                    {items.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          onChange(item.id)
                          setIsOpen(false)
                        }}
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        className={cn(
                          "relative flex w-full items-center px-4 py-2.5 text-sm rounded-xl mb-1 last:mb-0",
                          "transition-colors duration-150",
                          "focus:outline-none",
                          value === item.id
                            ? "text-white bg-white/5"
                            : "text-white/60 hover:text-white",
                        )}
                        whileTap={{ scale: 0.98 }}
                        variants={itemVariants}
                      >
                        <IconWrapper
                          icon={item.icon || Layers}
                          isHovered={hoveredItemId === item.id}
                          color={item.color || "#A06CD5"}
                        />
                        {item.label}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </MotionConfig>
  )
}
