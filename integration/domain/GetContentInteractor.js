import { fetchContent } from '../data/FetchContentServiceCall';

export const interactor = async (latitude, longitude, serviceCall = fetchContent) => {
    return serviceCall(latitude, longitude)
        .then(content => {
            return {
                businesses: content["businesses"],
            };
        });
}