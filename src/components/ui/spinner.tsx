import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const Spinner = () => {
    return (
        <FontAwesomeIcon
            icon={faSpinner}
            className="mr-2 h-4 w-4 animate-spin fill-current"
        />
    )
}
