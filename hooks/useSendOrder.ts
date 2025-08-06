import { useCallback } from "react";

type WhatsAppItem = {
  name: string;
  quantity: number;
  price: number;
};

type SendOrderPayload = {
  userName: string;
  userEmail: string;
  items: WhatsAppItem[];
  total: number;
};

export function useSendOrder() {
  const sendOrder = useCallback(async (payload: SendOrderPayload) => {
    const response = await fetch("/api/send-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erro ao enviar pedido via WhatsApp"
      );
    }

    return await response.json();
  }, []);

  return { sendOrder };
}
