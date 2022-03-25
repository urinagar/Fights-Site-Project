class CredentialsModel {
    username: string;
    password: string;

    constructor(credentials: CredentialsModel) {
        this.username = credentials.username;
        this.password = credentials.password;
    }
}

export default CredentialsModel;