export function validateStringLength(text, _minlength, _length) {
    return (text.length >= _minlength && text.length <= _length);
}

export function validateNull(object) {
    return (object != null);
}

export function validatePet(_pet) {
    if (_pet.petSpecies == null || _pet.petSpecies == "") {
        return "You must select a Pet Species";
    }
    if ((_pet.petBreed == null || _pet.petBreed == "") && _pet.petSpecies != "Others") {
        return "You must select a Pet Breed";
    }
    if (_pet.special == null || _pet.special == "" || _pet.special.length <= 10) {
        return "You must type a minimum of 10 characters for why your pet is Special for you";
    }
    if (_pet.bestMemory == null || _pet.bestMemory == "" || _pet.bestMemory.length <= 10) {
        return "You must type a minimum of 10 characters for the Best Memory of your pet";
    }
    if (_pet.age == null || _pet.age == 0) {
        return "Your pet's age must be minimum of 1";
    }
    return "";
}

export function validatePetObject(_pet) {
    if (_pet.petSpecies == null || _pet.petSpecies == "") {
        return "You must select a Pet Species";
    }
    if ((_pet.petBreed == null || _pet.petBreed == "") && _pet.petSpecies != "Others") {
        return "You must select a Pet Breed";
    }
    if (_pet.description1 == null || _pet.description1 == "" || _pet.description1.length <= 10) {
        return "You must type a minimum of 10 characters for why your pet is Special for you";
    }
    if (_pet.description2 == null || _pet.description2 == "" || _pet.description2.length <= 10) {
        return "You must type a minimum of 10 characters for the Best Memory of your pet";
    }
    if (_pet.age == null || _pet.age == 0) {
        return "Your pet's age must be minimum of 1";
    }
    return "";
}

export function validateEmail(email) {
    let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let rex = regex.test(email);
    if (rex) {
        return "";
    } else {
        return "Please enter a valid email!";
    }
}