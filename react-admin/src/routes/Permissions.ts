// permissions.ts
const permissions = {
    users: {
        CREATE_USER: {
            name: 'user-create',
            id: '667a8562c1d466461c553f39'
        },
        VIEW_USER: {
            name: 'user-read',
            id: '667a8579c1d466461c553f3b'
        },
        EDIT_USER: {
            name: 'user-update',
            id: '667a857fc1d466461c553f3d'
        },
        DELETE_USER: {
            name: 'user-delete',
            id: '667a8585c1d466461c553f3f'
        }
    },
    roles: {
        CREATE_ROLE: {
            name: 'roles-create',
            id: '667a858dc1d466461c553f41'
        },
        VIEW_ROLE: {
            name: 'roles-read',
            id: '667a8593c1d466461c553f43'
        },
        EDIT_ROLE: {
            name: 'roles-update',
            id: '667a859ac1d466461c553f45'
        },
        DELETE_ROLE: {
            name: 'roles-delete',
            id: '66839a7ffe48bdf3e210ade3'
        }
    }
};


export  default permissions;
