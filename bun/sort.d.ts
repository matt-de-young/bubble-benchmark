export interface List {
  data?: number[];
}

export interface SortService {
  bubbleSort(request: List): Promise<List>;
}
