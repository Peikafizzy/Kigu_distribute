from fastapi import APIRouter, HTTPException, status

from app.schemas.person import PersonCreate, PersonUpdate, PersonRead

from app.services.people_service import (
    get_all_people,
    get_person,
    create_person,
    update_person,
    delete_person,
)


router = APIRouter()


@router.get("/", response_model=list[PersonRead])
def read_people():
    return get_all_people()


@router.get("/{person_id}", response_model=PersonRead)
def read_person(person_id: int):
    person = get_person(person_id)

    if person is None:
        raise HTTPException(
            status_code=404,
            detail="Person not found"
        )

    return person


@router.post(
    "/",
    response_model=PersonRead,
    status_code=status.HTTP_201_CREATED
)
def add_person(data: PersonCreate):
    return create_person(data)


@router.patch("/{person_id}", response_model=PersonRead)
def edit_person(person_id: int, data: PersonUpdate):
    try:
        person = update_person(person_id, data)
    except ValueError as error:
        raise HTTPException(status_code=422, detail=str(error))

    if person is None:
        raise HTTPException(
            status_code=404,
            detail="Person not found"
        )

    return person


@router.delete("/{person_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_person(person_id: int):
    deleted = delete_person(person_id)

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Person not found"
        )

    return None