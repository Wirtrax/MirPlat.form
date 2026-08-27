import { toast } from "sonner"
import type { ReactNode } from "react"

export const showToast = (content: ReactNode) => {
    toast(content)
}