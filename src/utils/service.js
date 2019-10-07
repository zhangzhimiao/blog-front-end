import axios from "axios"

export class Service {
  instance = axios.create({
    baseURL: "http://localhost:3000/entity",
    timeout: 1000
  })
  register(name, password) {
    return this.instance.post("person/register", {
      data: {
        name,
        password
      }
    })
  }
  getAll() {
    return this.instance.get("person/index").then(d => d)
  }
}

export const service = new Service()
