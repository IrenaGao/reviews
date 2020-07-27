export const interactor = (businesses, id) => {
    const restaurant = businesses.find(restaurant => restaurant.id === id);
    return {
        name: restaurant.name,
        image: restaurant.image_url,
        location: `${restaurant.location.address1}, ${restaurant.location.city}`,
        price: restaurant.price,
        distance: restaurant.distance,
    };
};