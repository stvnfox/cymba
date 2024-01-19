import { getStorageItem } from "@/lib/storage"

export const useToken = () => {
    return getStorageItem("access_token")
}
