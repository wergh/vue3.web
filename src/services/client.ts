import {Backend} from "@/services/backend";

export class ApiClient {
    static async logIn(credentials: { username: string, password:string}) {
        return await Backend.post("/login", credentials).then(function (value) {
            return value;
        });
    }

    static async getUser() {
        return await Backend.get("/user").then(function (value) {
            return value;
        });
    }
    static async getEnterprises() {
        return await Backend.get("/enterprises/pixel-streaming").then(function (value) {
            return value;
        });
    }
}
