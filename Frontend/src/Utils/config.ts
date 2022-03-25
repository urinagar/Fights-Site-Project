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
            vacationsByUser: baseUrl + "vacations-by-user/",
            vacations: baseUrl + "vacations/",
            vacationsImages: baseUrl + "vacations/images/",
            register: baseUrl + "auth/register/",
            login: baseUrl + "auth/login/",
            follow: baseUrl + "vacations/follow/",
            socketServer: "http://localhost:3001/"
        };
    }
}

class DevelopmentConfig extends Config {
    public constructor() {
        super("http://localhost:3001/api/");
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super("http://localhost:3001/api/");
    }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
