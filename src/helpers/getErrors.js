const getErrors = (errors) => {
    let errorMessages = {};

    for (let key in errors) {
        if (key === "DuplicateUserName") {
            errorMessages["email"] = errors[key];
        } else {
            errorMessages[key] = errors[key][0];
        }
    }
    return errorMessages;
};

export default getErrors;