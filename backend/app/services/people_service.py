from app.schemas.person import PersonCreate, PersonUpdate
from app.repositories.people_repository import people_repository


def get_all_people():
    return people_repository.get_all()


def get_person(person_id: int):
    return people_repository.get_by_id(person_id)


def create_person(data: PersonCreate):
    return people_repository.create(data)


def update_person(person_id: int, data: PersonUpdate):
    return people_repository.update(person_id, data)


def delete_person(person_id: int):
    return people_repository.delete(person_id)