import service from '../../services/Service';

export const fetchContent = async (latitude, longitude) => {
    return service
        .get("businesses/search", {
            params: {
                latitude: latitude,
                longitude: longitude,
            }
        })
        .then((response) => {
            const content = response.data;
            return {
                ...content
            };
        })
}