abstract class Config {
    public urls = {
        vacationsByUser: "",
        vacations: "",
        vacationsImages: "",
        register: "",
        login: "",
        follow: "",
        socketServer: ""
    }

    public constructor(baseUrl: string) {
        this.urls = {
            vacationsByUser: baseUrl + "api/vacations-by-user/",
            vacations: baseUrl + "api/vacations/",
            vacationsImages: baseUrl + "api/vacations/images/",
            register: baseUrl + "api/auth/register/",
            login: baseUrl + "api/auth/login/",
            follow: baseUrl + "api/vacations/follow/",
            socketServer: baseUrl
        };
    }
}

class DevelopmentConfig extends Config {
    public constructor() {
        super("http://localhost:3001/");
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super("https://flights-web-project.herokuapp.com/");
    }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
