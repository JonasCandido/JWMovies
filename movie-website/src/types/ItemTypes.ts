export interface ItemInfoState {
  data: any;
  isLoading: boolean;
  isError: boolean;
}

export interface ItemInfoAction {
  type: string;
  payload?: any;
}
