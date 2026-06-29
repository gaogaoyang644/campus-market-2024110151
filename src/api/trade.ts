import http from './http'

export interface TradeItem {
  id: number
  title: string
  price: number
  category: string
  condition: string
  publisher: string
  publishTime: string
  location: string
  images: string[]
  status: string
}

export function getTrades() {
  return http.get<TradeItem[]>('/trades')
}
