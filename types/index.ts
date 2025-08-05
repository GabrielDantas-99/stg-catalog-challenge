export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  created_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  total: number
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}

export interface Coupon {
  id: string
  code: string
  discount_percentage: number
  expiration_date: string
}

export interface ProductReview {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
}

export interface FilterOptions {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
}
