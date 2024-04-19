export interface Token {
    access_token: string,
    refresh_token: string,
    expires_in: number,
}


export interface User {
    id: number,
    name: string,
    surname: string,
    username: string,
    email: string
    enterprises: Enterprise[]
}

export interface Enterprise {
    id: number,
    name: string,
    cif: string,
    pixelStreamingUrl: string,
}
