
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente 1 del _id para poner algo que salga por sistema',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'In-Progress 2 2 2 del _id para poner algo que salga por sistema',
            status: 'in-progress',
            createdAt: Date.now()-1000000,
        },
        {
            description: 'Finished 3 3 3 del _id para poner algo que salga por sistema',
            status: 'finished',
            createdAt: Date.now()-100000,
        },
    ]
}