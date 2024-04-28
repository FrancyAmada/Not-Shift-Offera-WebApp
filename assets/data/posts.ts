import { Post } from '@/types';

// Test data for posts

export const posts: Post[] = [
    {
        type: 'task',
        author: {
            fullName: 'Shawn Kini Alair',
            userId: '1',
            profileImg: '../icons/icon.png',
        },
        id: 1,
        title: "Pakay'o b da Ref",
        description: 'Yugs nahulog ref nmon sa hagdan. Sno pwede da',

        image: require('@assets/images/task-sample.png'),
        rate: 1000,
        createdAt: '12h',
    },
    {
        type: 'task',
        author: {
            fullName: 'Francy Angelo Amada',
            userId: '1',
            profileImg: '../icons/icon.png',
        },
        id: 2,
        title: 'Patakod Christmas Lights',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum voluptatum laborum rem ipsum nihil facilis excepturi dicta natus earum sapiente tempora omnis, atque ea accusantium ut odit id temporibus. Voluptatum.',

        image: require('@assets/images/task-sample.png'),
        rate: 500,
        createdAt: '10m',
    },
    {
        type: 'task',
        author: {
            fullName: 'Jose Rizal',
            userId: '1',
            profileImg: '../icons/icon.png',
        },
        id: 3,
        title: 'Patudlo calculus',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum voluptatum laborum rem ipsum nihil facilis excepturi dicta natus earum sapiente tempora omnis, atque ea accusantium ut odit id temporibus. Voluptatum.',

        image: require('@assets/images/task-sample.png'),
        rate: 250,
        createdAt: '1h',
    },
    {
        type: 'task',
        author: {
            fullName: 'John Doe',
            userId: '1',
            profileImg: '../icons/icon.png',
        },
        id: 4,
        title: 'Papilot finals pls 10k budget',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum voluptatum laborum rem ipsum nihil facilis excepturi dicta natus earum sapiente tempora omnis, atque ea accusantium ut odit id temporibus. Voluptatum.',

        image: require('@assets/images/task-sample.png'),
        rate: 10000,
        createdAt: '12h',
    },
    {
        type: 'task',
        author: {
            fullName: 'Jose Arron Franz Suoberon',
            userId: '1',
            profileImg: '../icons/icon.png',
        },
        id: 5,
        title: 'Post Title 1',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum voluptatum laborum rem ipsum nihil facilis excepturi dicta natus earum sapiente tempora omnis, atque ea accusantium ut odit id temporibus. Voluptatum.',

        image: require('@assets/images/task-sample.png'),
        rate: 100,
        createdAt: '12h',
    },
    {
        type: 'service',
        author: {
            fullName: 'Hev Abi',
            userId: '2',
            profileImg: '../icons/icon.png',
        },
        id: 6,
        title: 'Thesis mo thesis ko',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum voluptatum laborum rem ipsum nihil facilis excepturi dicta natus earum sapiente tempora omnis, atque ea accusantium ut odit id temporibus. Voluptatum.',

        image: require('@assets/images/service-sample.png'),
        rate: 1600,
        createdAt: '23m',
    },
    {
        type: 'service',
        author: {
            fullName: 'Metro Boomin',
            userId: '2',
            profileImg: '../icons/icon.png',
        },
        id: 7,
        title: 'Unli praise jam package',
        description:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum voluptatum laborum rem ipsum nihil facilis excepturi dicta natus earum sapiente tempora omnis, atque ea accusantium ut odit id temporibus. Voluptatum.',

        image: require('@assets/images/service-sample.png'),
        rate: 9000,
        createdAt: '23m',
    },
];
