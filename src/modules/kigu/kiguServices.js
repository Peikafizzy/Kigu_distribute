const STORAGE_KEY = 'kigu_people';

export function getPeople() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function savePeople(people) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
}

export function savePerson(person) {
    const people = getPeople();

    if (person.id) {
        const index = people.findIndex(p => p.id === person.id);

        if (index !== -1) {
            people[index] = person;
        } else {
            people.push(person);
        }
    } else {
        person.id = crypto.randomUUID();
        people.push(person);
    }

    savePeople(people);
    return people;
}

export function deletePerson(id) {
    const people = getPeople().filter(person => person.id !== id);
    savePeople(people);
    return people;
}
