import { FunctionComponent, useEffect, useState } from "react"
import clsx from "clsx"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "./ui/button"
import { CommandDialog, CommandShortcut } from "@/components/ui/command"
import { CommandDialogContent } from "@/components/CommandDialogContent/CommandDialogContent"

type OpenSearchButtonProps = {
    isExpended: boolean
}

export const OpenSearchButton: FunctionComponent<OpenSearchButtonProps> = ({ isExpended }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <Button
                variant="navigation"
                size={isExpended ? "navigation" : "icon"}
                className={clsx(isExpended && "justify-start")}
                onClick={() => setOpen(!open)}
            >
                <FontAwesomeIcon
                    icon={faSearch}
                    className="!h-5"
                />
                {isExpended && (
                    <div>
                        Search <CommandShortcut>⌘S</CommandShortcut>
                    </div>
                )}
            </Button>
            <CommandDialog
                open={open}
                onOpenChange={setOpen}
            >
                <CommandDialogContent />
            </CommandDialog>
        </>
    )
}
