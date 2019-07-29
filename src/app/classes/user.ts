export class User {
  firstName: string;
  lastName: string;
  photoURL: string;

  constructor({firstName, lastName, photoUrl}) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.photoURL = photoUrl;
  }
}
