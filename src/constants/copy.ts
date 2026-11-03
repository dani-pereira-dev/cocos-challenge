/**
 * Fuente única de verdad para todos los textos visibles al usuario.
 * Ningún string de UI debe estar hardcodeado fuera de este archivo.
 */

export const copy = {
  common: {
    retry: 'Reintentar',
    somethingWentWrong: 'Algo salió mal',
    genericError: 'Ocurrió un error al cargar los datos.',
    noResults: 'Sin resultados',
    currencyPrefix: 'AR$',
  },

  market: {
    title: 'Mercado',
    tabLabel: 'Mercado',
    searchPlaceholder: 'Buscar por ticker...',
    loading: 'Cargando instrumentos...',
    noInstruments: 'No hay instrumentos disponibles.',
    noSearchResults: (query: string) =>
      `No se encontraron instrumentos para "${query}"`,
    fetchError: 'Error al cargar los instrumentos',
  },

  portfolio: {
    title: 'Portfolio',
    tabLabel: 'Portfolio',
    fetchError: 'Error al cargar el portafolio',
    noAssets: 'No tenés posiciones abiertas.',
    shares: (qty: number) => `${qty} ${qty === 1 ? 'acción' : 'acciones'}`,
    totalValueLabel: 'Valor total',
    totalGainLabel: 'Resultado',
    cashLabel: 'Efectivo disponible',
  },

  search: {
    fetchError: 'Error al buscar instrumentos',
  },

  order: {
    fetchError: 'Error al enviar la orden',
    buy: 'Comprar',
    sell: 'Vender',
    typeMarket: 'Mercado',
    typeLimit: 'Límite',
    lastPriceLabel: 'Último precio',
    quantityLabel: 'Cantidad',
    sharesMode: 'Acciones',
    pesosMode: 'Pesos',
    limitPriceLabel: 'Precio límite',
    submitButton: 'Siguiente',
    sendingButton: 'Enviando...',
    sharesEstimate: (qty: number, total: string) =>
      `${qty} ${qty === 1 ? 'acción' : 'acciones'} · ${total}`,
    resultTitle: (id: number) => `Orden #${id}`,
    statusFilled: 'Ejecutada',
    statusPending: 'Pendiente de ejecución',
    statusRejected: 'Rechazada',
    closeButton: 'Cerrar',
    invalidQuantity: 'Ingresá una cantidad válida (mínimo 1 acción)',
    invalidPrice: 'Ingresá un precio límite válido',
    exceedsCash: 'El monto supera el efectivo disponible',
    exceedsShares: 'La cantidad supera tus acciones disponibles',
    modify: 'Modificar',
    useAll: 'Usar todo',
    cancelButton: 'Cancelar',
    stopOrder: 'Stop order',
    byAmount: 'Por monto',
    byShares: 'Cantidad de títulos',
    availableLabel: (amount: string) => `Disp. AR$ ${amount}`,
    modeLabel: (mode: string) => `Comprás: ${mode}`,
    modeLabelSell: (mode: string) => `Vendés: ${mode}`,
    priceLabel: (type: string) => `Precio: ${type}`,
    estimatedLabel: (amount: string) => `Estimado a pagar ≈ AR$ ${amount}`,
    estimatedLabelSell: (amount: string) => `Estimado a recibir ≈ AR$ ${amount}`,
    limitPricePlaceholder: '0,00',
    amountPlaceholder: '0',
    confirmTitleBuy: 'Revisá la orden de compra',
    confirmTitleSell: 'Revisá la orden de venta',
    liquidacionLabel: 'Liquidación',
    liquidacionValue: '24 horas',
    priceMarketLabel: 'Precio Mercado',
    priceLimitLabel: 'Precio Límite',
    validezLabel: 'Validez',
    validezValue: (date: string) => `Hasta el ${date}`,
    detallesTitle: 'Detalles',
    buyDetailLabel: (qty: number) => `Compra de ${qty} ${qty === 1 ? 'título' : 'títulos'}`,
    sellDetailLabel: (qty: number) => `Venta de ${qty} ${qty === 1 ? 'título' : 'títulos'}`,
    comisionesLabel: 'Comisiones y derechos de mercado',
    impuestosLabel: 'Impuestos',
    estimatedToPayLabel: 'Estimado a pagar',
    estimatedToReceiveLabel: 'Estimado a recibir',
    confirmButton: 'Confirmar',
    noPositionHint: 'Sin posición en este instrumento',
    systemErrorPrefix: 'Error al procesar la orden',
  },

  returnBadge: {
    up: '▲',
    down: '▼',
    neutral: '–',
  },

  errors: {
    network: 'Sin conexión a internet',
    parse: 'Error al procesar la respuesta',
    unknown: 'Ocurrió un error inesperado',
    httpDefault: (statusCode: number) => `Error del servidor (${statusCode})`,
    http: {
      400: 'Solicitud inválida',
      401: 'No autorizado',
      403: 'Acceso denegado',
      404: 'Recurso no encontrado',
      422: 'Datos inválidos',
      429: 'Demasiadas solicitudes, intentá más tarde',
      500: 'Error interno del servidor',
      503: 'Servicio no disponible',
    } as Record<number, string>,
    // Mensajes de error específicos que devuelve la API en inglés
    apiMessages: {
      'Insufficient cash': 'Fondos insuficientes para realizar la operación',
      'Insufficient shares': 'No tenés suficientes acciones para esta operación',
      'Invalid quantity': 'La cantidad ingresada no es válida',
      'Invalid price': 'El precio ingresado no es válido',
      'Instrument not found': 'Instrumento no encontrado',
    } as Record<string, string>,
  },
} as const;
