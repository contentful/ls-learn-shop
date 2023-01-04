const isClient = typeof window !== "undefined";
export default (error = null, type = 1) => {
    switch (type) {
        case 1:
            // error
            if (isClient) {
                console.error(error);
            } else {
                console.log(error);
            }

            break;
        case 1:
            // warning
            if (isClient) {
                console.warn(error);
            } else {
                console.log(error);
            }

            break;

        default:
            break;
    }
};