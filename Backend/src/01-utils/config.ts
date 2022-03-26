abstract class Config {
    public port: number;
    public mySql = { host: "", user: "", password: "", database: "" };
    public baseImageUrl = "./src/assets/images/";

    public loginExpiresIn: string;
}

class DevelopmentConfig extends Config {
    public constructor() {
        super();
        this.port = 3001;
        this.mySql = { host: "localhost", user: "root", password: "", database: "vacations" };
        this.loginExpiresIn = "3h"; 
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super();
        this.port = +process.env.PORT;
        this.mySql = { host: "eu-cdbr-west-02.cleardb.net", user: "b2a64150e71bd9", password: "2a1e58bd", database: "heroku_3c2b33a04f589f2" };
        this.loginExpiresIn = "3h"; 

    }
}

const config = process.env.ENVIRONMENT === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
