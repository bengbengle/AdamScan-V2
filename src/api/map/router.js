export default class {
    config =[
        {
            path: '/map',
            name: 'map',
            component: () => {
                return import ('@/views/map/index');
            },
            meta: {keepAlive: true},
        },
    ]
}
