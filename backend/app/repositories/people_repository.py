from app.schemas.person import PersonCreate, PersonRead, PersonUpdate


class PeopleRepository:
    def __init__(self):
        self._people: dict[int, PersonRead] = {}
        self._next_id = 1

    def get_all(self) -> list[PersonRead]:
        return list(self._people.values())

    def get_by_id(self, person_id: int) -> PersonRead | None:
        return self._people.get(person_id)

    def create(self, data: PersonCreate) -> PersonRead:
        person_id = self._next_id

        person = PersonRead(
            id=person_id,
            registration_no=f"KIG-{person_id:06d}",
            **data.model_dump()
        )

        self._people[person_id] = person
        self._next_id += 1

        return person

    def update(
        self,
        person_id: int,
        data: PersonUpdate
    ) -> PersonRead | None:

        existing = self._people.get(person_id)

        if existing is None:
            return None

        changes = data.model_dump(exclude_unset=True)

        # Do not allow null values for required fields.
        for field in ("name", "country", "region"):
            if field in changes and changes[field] is None:
                raise ValueError(f"{field} cannot be null")

        updated_data = existing.model_dump() | changes

        updated_person = PersonRead.model_validate(updated_data)

        self._people[person_id] = updated_person

        return updated_person

    def delete(self, person_id: int) -> bool:
        if person_id not in self._people:
            return False

        del self._people[person_id]
        return True


people_repository = PeopleRepository()