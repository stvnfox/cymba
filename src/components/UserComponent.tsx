import { FunctionComponent } from "react"
import clsx from "clsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/navigation"
import { useDashboardContext } from "@/context/dashboard.context"
import { removeUserDataFromStorage } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type UserComponentProps = {
    isExpended: boolean
}

export const UserComponent: FunctionComponent<UserComponentProps> = ({ isExpended }) => {
    const router = useRouter()
    const { user } = useDashboardContext()

    const signOff = () => {
        removeUserDataFromStorage()

        router.push("/")
    }

    return (
        <Popover>
            <PopoverTrigger>{user?.display_name}</PopoverTrigger>
            <PopoverContent>
                <Button
                    variant="navigation"
                    size={isExpended ? "navigation" : "icon"}
                    className={clsx(isExpended && "justify-start")}
                    onClick={signOff}
                >
                    <FontAwesomeIcon
                        icon={faArrowRightToBracket}
                        className="!h-5"
                    />
                    {isExpended && "Sign out"}
                </Button>
            </PopoverContent>
        </Popover>
    )
}
