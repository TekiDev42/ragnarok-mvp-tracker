import { Portal } from "@mantine/core"
import { useState, useEffect } from "react"
import { useAppSelector } from "@store/Hooks"
import { MvpCard } from "@components/MvpCard/MvpCard"

export const MvpFocus = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [mvpFocus, setMvpFocus] = useState<Mvp | null>(null)

    const [position, setPosition] = useState({ x: window.innerWidth / 2 - 180, y: 90 })
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)

    const search = useAppSelector((state) => state.Slice.mvpFocus)
    const mvps = useAppSelector((state) => state.Slice.filtered)

    useEffect(() => {
        const mvp = mvps.find((mvp) => mvp.Id === search)

        if (mvp) {
            setIsOpen(true)
            setMvpFocus(mvp)
        } else {
            setIsOpen(false)
            setPosition({ x: window.innerWidth / 2 - 180, y: 90 })
            setDragStart({ x: 0, y: 0 })
            setIsDragging(false)
            setMvpFocus(null)
        }
    }, [search, mvps])

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        })
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            })
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove as any)
            document.addEventListener('mouseup', handleMouseUp)
            return () => {
                document.removeEventListener('mousemove', handleMouseMove as any)
                document.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDragging, dragStart])

    return (
        isOpen && mvpFocus && <Portal>
            <div 
                className={`cursor-grab w-80 fixed z-50 border-4 border-orange-500 rounded-2xl overflow-hidden ${isDragging ? 'cursor-grabbing' : ''}`}
                style={{
                    top: `${position.y}px`,
                    left: `${position.x}px`
                }}
                onMouseDown={handleMouseDown}
            >
                <MvpCard mvp={mvpFocus} isFocus={true} />
            </div>
        </Portal>
    )
}
