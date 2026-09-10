// Commercial terms shared by comparison calculations. Keep the launch offer
// separate from the regular price; renewing updates is always optional.
export const LOCAL_OFFER = Object.freeze({
  price: 29,
  regularPrice: 49,
  updateRenewal: 24,
  includedUpdateMonths: 12,
  trialDays: 14,
  personalDevices: 3,
});

export const LOCAL_THREE_YEAR_PRICE = `$${LOCAL_OFFER.price + 2 * LOCAL_OFFER.updateRenewal}`;
