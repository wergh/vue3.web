import { defineStore } from 'pinia'
import {type Enterprise, type Token, type User} from "@/interfaces/auth";


export const useTokenStore = defineStore('token', {
    state: () => ({
        token: {} as Token
    }),
    getters: {
        getToken: (state) => state.token.access_token,
    },
    actions: {
        storeToken(token: {access_token:string, refresh_token: string, expires_in:number}) {
            this.token.access_token = token.access_token;
            this.token.refresh_token = token.refresh_token;
            this.token.expires_in = token.expires_in;
        },
    }
});


export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as User
    }),
    getters: {
        getCountEnterprises: (state) => (state.user.enterprises) ? state.user.enterprises.length : null,
        getEnterprises: (state) => (state.user.enterprises) ? state.user.enterprises : [],
        getUser: (state) => (state.user) ? state.user : null
    },
    actions: {
        storeUser(user: {id:number, name:string, surname:string, username:string, email:string, enterprises: []}){
            this.user.id = user.id;
            this.user.name = user.name;
            this.user.surname = user.surname;
            this.user.username = user.username;
            this.user.email = user.email;
            this.user.enterprises = user.enterprises;
        }
    }


});

export const useEnterpriseStore = defineStore('enterprise', {
    state: () => ({
        enterprise: {} as Enterprise
    }),
    getters: {
        getEnterpriseName: (state) => (state.enterprise.name) ? state.enterprise.name : '',
        getPixelStreamingUrl: (state) => (state.enterprise.pixelStreamingUrl) ? state.enterprise.pixelStreamingUrl : '',
    },
    actions: {
        storeEnterprise(enterprise: {id:number, name:string, cif:string, pixelStreamingUrl:string}){
            this.enterprise.id = enterprise.id;
            this.enterprise.name = enterprise.name;
            this.enterprise.cif = enterprise.cif;
            this.enterprise.pixelStreamingUrl = enterprise.pixelStreamingUrl;
        }
    }


})


