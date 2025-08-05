import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}

export function generateWhatsAppMessage(
  userName: string,
  userEmail: string,
  items: Array<{ name: string; quantity: number; price: number }>,
  total: number,
): string {
  const productList = items
    .map((item) => `- ${item.name} - Qtd: ${item.quantity} - ${formatPrice(item.price * item.quantity)}`)
    .join("\n")

  return `*NOVO PEDIDO - STG CATALOG*

Cliente: ${userName}
Email: ${userEmail}

PRODUTOS:
${productList}

TOTAL: ${formatPrice(total)}

---
Pedido realizado via STG Catalog`
}

export function createWhatsAppLink(message: string, phoneNumber = "5511999999999"): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}
