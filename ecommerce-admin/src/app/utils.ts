import { SessionCache } from "./sessionCache";

export function getToken(){
    const cache = new SessionCache();
    return cache.get("authToken");
}