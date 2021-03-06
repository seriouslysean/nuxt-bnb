let APP_ID;
let API_KEY;
let FETCH_OPTS;

async function unwrap(response) {
    const json = await response.json();
    const { ok, status, statusText } = response;
    return {
        json,
        ok,
        status,
        statusText,
    };
}

function getErrorResponse(error) {
    return {
        json: {},
        ok: false,
        status: 500,
        statusText: error.message,
    };
}

async function getHome(homeId) {
    try {
        if (!APP_ID || !API_KEY) {
            const msg = 'Algolia API keys are not set';
            console.error(msg);
            throw new Error(msg);
        }

        return unwrap(
            await fetch(`https://${APP_ID}-dsn.algolia.net/1/indexes/homes/${homeId}`, FETCH_OPTS),
        );
    } catch(error) {
        return getErrorResponse(error);
    }
}

async function getReviewsByHomeId(homeId) {
    try {
        if (!APP_ID || !API_KEY) {
            const msg = 'Algolia API keys are not set';
            console.error(msg);
            throw new Error(msg);
        }

        return unwrap(
            await fetch(`https://${APP_ID}-dsn.algolia.net/1/indexes/reviews/query`, {
                ...FETCH_OPTS,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: 6,
                    attributesToHighlight: [],
                }),
            }),
        );
    } catch(error) {
        return getErrorResponse(error);
    }
}

async function getUserByHomeId(homeId) {
    try {
        if (!APP_ID || !API_KEY) {
            const msg = 'Algolia API keys are not set';
            console.error(msg);
            throw new Error(msg);
        }

        return unwrap(
            await fetch(`https://${APP_ID}-dsn.algolia.net/1/indexes/users/query`, {
                ...FETCH_OPTS,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    attributesToHighlight: [],
                }),
            }),
        );
    } catch(error) {
        return getErrorResponse(error);
    }
}

async function getHomesByLocation(lat, lng, radiusInMeters = 1500) {
    try {
        if (!APP_ID || !API_KEY) {
            const msg = 'Algolia API keys are not set';
            console.error(msg);
            throw new Error(msg);
        }

        return unwrap(
            await fetch(`https://${APP_ID}-dsn.algolia.net/1/indexes/homes/query`, {
                ...FETCH_OPTS,
                method: 'POST',
                body: JSON.stringify({
                    aroundLatLng: `${lat},${lng}`,
                    aroundRadius: radiusInMeters,
                    hitsPerPage: 10,
                    attributesToHighlight: [],
                }),
            }),
        );
    } catch(error) {
        return getErrorResponse(error);
    }
}

export default function dataApi(context, inject) {
    const { algoliaAppId, algoliaAPIKey } = context.$config;
    APP_ID = algoliaAppId;
    API_KEY = algoliaAPIKey;
    FETCH_OPTS = {
        headers: {
            'X-Algolia-API-Key': API_KEY,
            'X-Algolia-Application-Id': APP_ID,
        },
    };

    inject('dataApi', {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId,
        getHomesByLocation,
    });
}
