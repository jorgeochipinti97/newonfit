import { useState } from 'react';

// Hook personalizado para guardar y actualizar un orderId
function useOrderId() {
  const [orderId, setOrderId] = useState(null);

  // Función para actualizar el orderId
  const updateOrderId = (newOrderId) => {
    setOrderId(newOrderId);
  };

  return [orderId, updateOrderId];
}

export default useOrderId;
