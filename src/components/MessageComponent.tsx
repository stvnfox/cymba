import { FunctionComponent } from "react"

type MessageComponentProps = {
    children?: React.ReactNode
    message: string
}

export const MessageComponent: FunctionComponent<MessageComponentProps> = ({ children, message }) => {
    return (
        <>
            <p className="pb-4 font-light text-neutral-300">{message}</p>
            {children}
        </>
    )
}
