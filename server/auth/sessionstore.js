export const sessionStore = []

export function findSession(id){
    return sessionStore.find(session => session.id = id)
}

export function deleteSession(id){
    sessionStore.filter(session => session.id !=id)
}

