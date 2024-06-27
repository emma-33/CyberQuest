const request = require("superagent")
const Throttle = require("superagent-throttle")

class APIConnector {
    constructor() {
        this.API_TOKEN = "";
        this.throttles = {}
        this.throttle = new Throttle({
            active: true,
            rate: 25,
            ratePer: 6000,
            concurrent: 1,
        })
    }

    async init({ api_token, email, password }){
        if (api_token) {
            this.API_TOKEN = api_token
        } else {
            this.API_TOKEN = await this.getAccessToken(email, password)
        }
        this.AUTH_INFO = { api_token, email, password }
    }

    async getAccessToken(email, password) {
        return new Promise((resolve, reject) => {
            const agent = request.agent()
            agent
              .post("https://www.hackthebox.com/api/v4/login")
              .set({"Content-Type": "application/json;charset=utf-8"})
              .send({email: email, password: password, remember: true})
              .then((response) => {
                console.warn(`Acquired API Session`)
                resolve(response.body.message.access_token)
              })
              .catch((error) => {
                console.warn(error.response.request)
                console.warn("Could not get session:", error.status)
              })
        })
    }

    async htbGetAPI(endpointPath, parseText=false){
        try {
            this.API_TOKEN = await this.getAccessToken(this.AUTH_INFO.email, this.AUTH_INFO.password)
        } catch {
            console.error(error)
        }
        return new Promise((resolve, reject) => {
            const agent = request.agent()
            agent
              .get("https://www.hackthebox.com/api/v4/" + endpointPath)
              .set({ Accept: "application/json, */*" })
              .set({ Authorization: "Bearer " + this.API_TOKEN })
              .use(this.throttle.plugin())
              .then((response) => {
                if (parseText) {
                    resolve(JSON.parse(response.text))
                } else {
                    resolve(response.body)
                }
              })
              .catch((error) => {
                console.log("Could not access " + endpointPath + ":", error)
                reject(false)
              })
        })
    }
}
module.exports = APIConnector
