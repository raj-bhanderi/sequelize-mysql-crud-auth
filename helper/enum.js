/**
 * @enum {number}
 */
const HttpStatus = {

    SUCCESS_CODE: 200,
    INTERNAL_SERVER_CODE: 500,
    BAD_REQUEST_STATUS_CODE: 400,
    UNAUTHORIZED_CODE: 401,
    PAGE_NOT_FOUND_CODE: 404,
    CREATE_CODE: 201,
};

/**
 * @enum {number}
 */
const ErrorCode = {

    REQUIRED_CODE: 2022,
    INVALID_CODE: 2023,
    NO_RECORDED_FOUND:2033,
};


module.exports = {
    HttpStatus,
    ErrorCode,
};
