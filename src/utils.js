export function getAuthHeader() {
    const token = localStorage.getItem("jwt");
    return {

        Authorization: "Bearer " + token,

    };
}
