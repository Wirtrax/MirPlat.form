import { auth } from "./auth"
import type { CreateUser, User } from "./features/user/userType"

import { request } from "./utils/query"

export const login = () => {
    return request<{ token: string }>('/auth/signin', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer devtest2'
        }
    })
}

export const postUser = (data: CreateUser) => {
    const token = 'devtest2'
    return request('/user', {
        method: 'POST',
        headers: {
            // Authorization: `Bearer ${auth.getToken()}`,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const getUser = () => {
    return request<User>('/user', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${auth.getToken()}`
        }
    })
}