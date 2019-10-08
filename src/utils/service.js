import axios from "axios"
import { handle } from "./handle-data"

export class Service {
  instance = axios.create({
    baseURL: "http://localhost:3000/entity",
    timeout: 1000
  })
  register(name, password) {
    return handle(
      this.instance.post("person/register", {
        data: {
          name,
          password
        }
      })
    )
  }
  login(name, password) {
    return handle(
      this.instance.post("person/login", {
        data: {
          name,
          password
        }
      })
    )
  }
}

export const service = new Service()
