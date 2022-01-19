declare type StateValue = {
  errors: { [key: string]: string }
  loadings: string[]
  salads: Salad[]
  currentSalad: FullSalad | null
  order: OrderSalad[]
  compositions: CompositionItem[]
}

declare type Salad = {
  _id: string
  title: string
  price: number
  discount_price: number
  composition: Array<string>
  description: string
}

declare type FullSalad = Omit<Salad, 'composition'> & {
  composition: Array<CompositionItem>
}

declare type OrderSalad = FullSalad & {
  number: number
}

declare type CompositionItem = {
  _id: string
  title: string
  qty: number
  price: number
  discount_price: number
  image: string
  __v: number
}