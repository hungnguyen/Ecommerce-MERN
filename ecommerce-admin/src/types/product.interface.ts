export interface IProduct{
    _id: string;
    name: string;
    quantity: number;
    status: 'active' | 'inactive';
    detail: string;
    badge: string;
    category: string;
    image: string;
    updateDate: Date;
    files: IProductFile[];
    prices: IProductPrice[];
    reviews: IProductReview[];
}

export interface IProductFile{
    _id: string;
    filePath: string;
    name: string;
}

export interface IProductPrice{
    _id: string;
    name: string;
    price: number;
    validFrom: Date;
    validTo: Date;
}

export interface IProductReview{
    _id: string;
    name: string;
    message: string;
    score: number;
}

export interface IProductFilePost{
    parent: string;
    child: IProductFile
}

export interface IProductFileGet{
    parent: string;
    child: string;
}

export interface IProductPricePost{
    parent: string;
    child: IProductPrice
}

export interface IProductPriceGet{
    parent: string;
    child: string;
}

export interface IProductReviewPost{
    parent: string;
    child: IProductReview
}

export interface IProductReviewGet{
    parent: string;
    child: string;
}