import { AuthService } from "./auth.service";

class RootService {
	authService = new AuthService()
}

export const rootService = new RootService()