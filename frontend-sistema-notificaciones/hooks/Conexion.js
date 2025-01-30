let URL = 'http://localhost:8000/api/';


//METODO GENERAL PARA PETICIONES POST
export async function peticionPost(recurso, data, key = "") {
    let headers = {};

    if (key !== "") {
        headers = {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "token-api": key,
        };
    } else {
        headers = {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        };
    }

    console.log("asdfkjahfjahfjkafaka", data)

    const response = await (fetch(URL + recurso, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    }));

    console.log(response);

    return  response.json();
}

export async function peticionPost2(recurso, data, key = "") {
    let headers = {};
    let body = data;

    if (!(data instanceof FormData)) {
        headers = {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        };
        body = JSON.stringify(data);
    }

    if (key !== "") {
        headers["token-api"] = key;
    }

    const response = await fetch(URL + recurso, {
        method: "POST",
        headers: headers, // No incluir Content-Type si es FormData
        body: body,
    });

    return response.json();
}



//METODO GENERAL PARA PETICIONES GET
export async function peticionGet(recurso,  key = "") {
    let headers = {};

    if (key !== "") {
        headers = {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "token-api": key,
        };
    } else {
        headers = {
            'Accept': 'application/json',
            "Content-Type": "application/json",
        };
    }

    const response = await (fetch(URL + recurso, {
        method: "GET",
        headers: headers,
    }));

    return await response.json();
}

export async function  get_destinatario(external, token){
    let datos = null;

    try {
        datos = await peticionGet(`destinatario/listar/${external}`, token);
    } catch (error) {
        console.log(error.response.data);
        return{"code": 500}
    }
    return datos;
    // TODO agarrar errores
}
