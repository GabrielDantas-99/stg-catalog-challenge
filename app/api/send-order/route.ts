import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { userName, userEmail, items, total } = body;

    if (!userName || !userEmail || !items || !total) {
      return NextResponse.json(
        { message: "Dados incompletos" },
        { status: 400 }
      );
    }

    const message = generateWhatsAppMessage(userName, userEmail, items, total);

    const response = await fetch(
      process.env.WHATSAPP_API_URL! + "/message/send-text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        },
        body: JSON.stringify({
          phone: process.env.WHATSAPP_RECEIVER_PHONE,
          message,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { message: "Erro ao enviar mensagem", details: errorData },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Pedido enviado com sucesso" });
  } catch (error) {
    console.error("Erro na API interna:", error);
    return NextResponse.json(
      {
        message: "Erro interno",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

function generateWhatsAppMessage(
  userName: string,
  userEmail: string,
  items: Array<{ name: string; quantity: number; price: number }>,
  total: number
): string {
  const formatPrice = (price: number): string =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);

  const productList = items
    .map(
      (item) =>
        `- ${item.name} - Qtd: ${item.quantity} - ${formatPrice(
          item.price * item.quantity
        )}`
    )
    .join("\n");

  return `*NOVO PEDIDO - STG CATALOG*

Cliente: ${userName}
Email: ${userEmail}

PRODUTOS:
${productList}

TOTAL: ${formatPrice(total)}

---
Pedido realizado via STG Catalog`;
}
