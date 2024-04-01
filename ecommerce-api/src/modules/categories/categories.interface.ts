export interface ICategory{
    _id: string;
    name: string;
    orderNumber: number;
    status: 'active' | 'inactive';
    parent: string;
}