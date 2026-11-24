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
        country: 'Japan'
    },
    {
        id: 3,
        name: 'Charlie',
        slug: 'charlie',
        avatar: 'https://example.com/charlie.jpg',
        country: 'Taiwan'
    },
    {
        id: 4,
        name: 'Daisy',
        slug: 'daisy',
        avatar: 'https://example.com/daisy.jpg',
        country: 'Malaysia'
    }
];

export function getMockPeople() {
    return mockPeople;
}

export function getMockPersonById(id) {
    return mockPeople.find(person => person.id === Number(id));
}