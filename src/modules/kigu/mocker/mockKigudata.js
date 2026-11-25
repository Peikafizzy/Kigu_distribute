export const mockPeople = [
    {
        id: 1,
        name: 'Alice',
        slug: 'alice',
        avatar: 'https://example.com/alice.jpg',
        country: 'Malaysia'
    },
    {
        id: 2,
        name: 'Benjamin',
        slug: 'benjamin',
        avatar: 'https://example.com/benjamin.jpg',
        country: 'Japan',
        introduction: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        links: [
            {
                label: 'Website ↗',
                url: 'https://example.com'
            },
            {
                label: 'Instagram ↗',
                url: 'https://instagram.com'
            }
        ]
    },
    {
        id: 3,
        name: 'Charlie',
        slug: 'charlie',
        avatar: 'https://example.com/charlie.jpg',
        country: 'Taiwan',
        introduction: 'Hello! I am Charlie. I enjoy meeting people, attending events and sharing experiences with the Kigu community.',
        links: [
            {
                label: 'Website ↗',
                url: 'https://example.com'
            },
            {
                label: 'Instagram ↗',
                url: 'https://instagram.com'
            }
        ]
    },
    {
        id: 4,
        name: 'Daisy',
        slug: 'daisy',
        avatar: 'https://example.com/daisy.jpg',
        country: 'Malaysia'
    },
    {
        id: 5,
        name: 'Ethan',
        slug: 'ethan',
        avatar: 'https://example.com/ethan.jpg',
        country: 'Singapore'
    },
    {
        id: 6,
        name: 'Fiona',
        slug: 'fiona',
        avatar: 'https://example.com/fiona.jpg',
        country: 'Thailand'
    },
    {
        id: 7,
        name: 'Gabriel',
        slug: 'gabriel',
        avatar: 'https://example.com/gabriel.jpg',
        country: 'Indonesia'
    },
    {
        id: 8,
        name: 'Hannah',
        slug: 'hannah',
        avatar: 'https://example.com/hannah.jpg',
        country: 'South Korea'
    },
    {
        id: 9,
        name: 'Isaac',
        slug: 'isaac',
        avatar: 'https://example.com/isaac.jpg',
        country: 'Philippines'
    },
    {
        id: 10,
        name: 'Julia',
        slug: 'julia',
        avatar: 'https://example.com/julia.jpg',
        country: 'Japan'
    },
    {
        id: 11,
        name: 'Kevin',
        slug: 'kevin',
        avatar: 'https://example.com/kevin.jpg',
        country: 'Malaysia'
    },
    {
        id: 12,
        name: 'Luna',
        slug: 'luna',
        avatar: 'https://example.com/luna.jpg',
        country: 'Australia'
    }
];

export function getMockPeople() {
    return mockPeople;
}

export function getMockPersonById(id) {
    return mockPeople.find(person => person.id === Number(id));
}