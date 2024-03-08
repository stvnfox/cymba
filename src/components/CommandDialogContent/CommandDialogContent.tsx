import { FunctionComponent, useContext, useState } from "react"
import { useDebounce } from "@uidotdev/usehooks"
import { CommandInput, CommandList } from "@/components/ui/command"
import { Recommended } from "./components/Recommended"
import { SearchResults } from "./components/SearchResults"

export const CommandDialogContent: FunctionComponent = () => {
    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounce(query, 300)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = e.target.value.toLowerCase()

        setQuery(formattedValue)
    }

    return (
        <>
            <CommandInput
                placeholder="Type a command or search..."
                onChangeCapture={handleInputChange}
            />
            <CommandList className="p-3 text-center">
                {!debouncedQuery && <Recommended />}
                {debouncedQuery && <SearchResults query={debouncedQuery} />}
            </CommandList>
        </>
    )
}
