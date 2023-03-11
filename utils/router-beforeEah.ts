import { NextRouter } from "next/router";
import { TOKEN_KEY } from "./contents";

export function routerBeforeEach(router: NextRouter) {
  if(!localStorage.getItem(TOKEN_KEY)) {
    router.push('/')
  }
}
