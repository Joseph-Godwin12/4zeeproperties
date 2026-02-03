// types/property.ts
export interface Property {
  id: string
  title: string
  price: number
  location: string
  status: "available" | "sold"
}
