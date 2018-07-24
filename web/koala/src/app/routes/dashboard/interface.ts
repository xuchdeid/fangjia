export interface DataRespone<T> {
    status: string;
    data: T
};

export interface Record {
    date: string;
    desc: string;
    info: string[];
    last: number;
    total: number;
    sell_id: number;
}