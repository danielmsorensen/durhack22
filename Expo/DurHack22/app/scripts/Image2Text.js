const URL = "http://10.247.173.180:5000/stringImage";

function Image2Text(base64) {
    return fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({base64})
    })
        .then(res => res.json())
        .then(json => json["result"])
        .catch(error => console.warn(error));
}

export default Image2Text