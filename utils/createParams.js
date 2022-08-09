export const createParamsObj = (search, ordering, platform, page) => {
    const params = {};

    if (search) {
        params.search = search;
    }
    params.ordering = ordering;
    if (platform !== '') {
        params.platforms = platform;
    }
    if (page) {
        params.page = page;
    }

    return params;
}
