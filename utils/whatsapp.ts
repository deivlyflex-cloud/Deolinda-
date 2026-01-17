
export const generateWhatsAppLink = (
  productName: string,
  quantity: number,
  totalPrice: number,
  customerName: string,
  customerPhone: string,
  customerAddress: string
) => {
  const phoneNumber = "929704642"; 
  const message = `Olá Zara Online! Gostaria de fazer um pedido:

🛍️ *Produto:* ${productName}
🔢 *Quantidade:* ${quantity}
💰 *Total:* R$ ${totalPrice.toFixed(2)}

👤 *Cliente:* ${customerName}
📞 *Contato:* ${customerPhone}
📍 *Endereço:* ${customerAddress}

Gostaria de agendar a entrega e combinar o pagamento.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
