export class SessionCache{
    private store: Storage;
    constructor(){
        this.store = sessionStorage;
    }

    public set(key: string, val: string): void{
        this.store.setItem(key, val);
    }

    public get(key: string): string | null{
        return this.store.getItem(key);
    }

    public remove(key: string): void{
        this.store.removeItem(key);
    }
}