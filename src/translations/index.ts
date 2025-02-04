type Translation = {
  [lang: string]: {
    [key: string]: string | { [key: string]: string } | any;
  };
};

const translations: Translation = {
  'en': {
    addToCart: 'Add to cart',
    available: 'available',
    notAvailable: 'Not available',
    categories: 'categories',
    continueShopping: 'Continue shopping',
    shoppingBag: 'Cart',
    days: 'days',
    freeOver: 'free over',
    language: 'language',
    languages: {
      'en': 'english',
      'it': 'italian',
    },
    method: 'method',
    outOfStock: 'The requested quantity is not available',
    price: 'price',
    proceedToCheckout: 'Proceed to checkout',
    selectSize: 'Select your size',
    country: 'Country',
    shippingTo: 'Shipping to',
    yourShoppingCart: 'Your shopping cart contains',
    searchTitle: 'Find everything instantly',
    sortBy: 'Sort by',
    featured: 'Featured',
    highestPrice: 'Highest price',
    lowestPrice: 'Lowest price',
    searchPlaceholder: 'Search here...',
    backToAllProducts: 'Back to all products',
    reviews: 'Reviews',
    total: 'Total',
    subTotal: 'Subtotal',
    discount: 'Discount',
    taxes: 'Taxes',
    giftCard: 'Gift Card',
    items: 'items',
    viewMore: 'view more',
    emptyProducts: 'No products',
    emptyFilters: 'No results found',
    shipping: 'Shipping',
    algoliaCategory: 'category',
  },
  'it': {
    addToCart: 'Aggiungi al carrello',
    available: 'disponibile',
    notAvailable: 'non disponibile',
    categories: 'categorie',
    continueShopping: 'Continua lo shopping',
    shoppingBag: 'Carrello',
    days: 'giorni',
    freeOver: 'gratis oltre',
    language: 'lingua',
    languages: {
      'en': 'inglese',
      'it': 'italiano',
    },
    method: 'metodo',
    outOfStock: 'La quantità richiesta non è disponibile',
    price: 'prezzo',
    proceedToCheckout: 'Vai al checkout',
    selectSize: 'Seleziona la tua taglia',
    country: 'Nazione',
    shippingTo: 'Spedizione',
    yourShoppingCart: 'Il tuo carrello contiene',
    searchTitle: `Trova tutto all'istante`,
    sortBy: 'Ordina per',
    featured: 'In evidenza',
    highestPrice: 'Prezzo più alto',
    lowestPrice: 'Prezzo più basso',
    searchPlaceholder: 'Cerca qui...',
    backToAllProducts: 'Torna a tutti i prodotti',
    reviews: 'Recensioni',
    total: 'Totale',
    subTotal: 'Totale parziale',
    discount: 'Sconto',
    taxes: 'Tasse',
    giftCard: 'Gift Card',
    items: 'prodotti',
    viewMore: 'view more',
    shipping: 'Spedizione',
    emptyProducts: 'Nessun prodotto',
    emptyFilters: 'Nessun risultato trovato',
    algoliaCategory: 'categoria',
  },
};

export default translations;
