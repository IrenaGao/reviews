export const interactor = (businesses) => {
    const cardsConfig = businesses.map(business => {
        return {
            restaurantID: business.id,
            restaurantName: business.name,
            image: business.image_url,
            location: `${business.location.address1}, ${business.location.city}`
        };
    });
    return cardsConfig;
};