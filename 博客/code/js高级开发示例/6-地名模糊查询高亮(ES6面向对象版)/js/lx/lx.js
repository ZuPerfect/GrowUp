export function fetchRequest(url, response, success) {
    fetch(url).then(response).then(success);
}