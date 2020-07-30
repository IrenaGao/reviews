export const interactor = (businesses) => {
    const getRestaurants = businesses.map(business => {
        return {
            name: business.name,
            image: business.image_url,
            location: `${business.location.address1}, ${business.location.display_address[business.location.display_address.length-1]}`,
            distance: business.distance,
            category: business.categories.map(category => { return {title: category["title"]} }),
            id: business.id
        };
    });
    return getRestaurants;
};