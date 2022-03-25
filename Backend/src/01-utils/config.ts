abstract class Config {
    public port: number = 3001;
    public mySql = { host: "", user: "", password: "", database: "" };
    public baseImageUrl = "./src/assets/images/";

    public loginExpiresIn: string;
}

class DevelopmentConfig extends Config {
    public constructor() {
        super();
        this.mySql = { host: "localhost", user: "root", password: "", database: "vacations" };
        this.loginExpiresIn = "3h"; 
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super();
        this.mySql = { host: "localhost", user: "root", password: "", database: "vacations" };
        this.loginExpiresIn = "3h"; 

    }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
