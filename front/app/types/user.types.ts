export type User = {
	username: string
	email: string
}

type Profile = {
	role: Role
}

enum Role {
	ADMIN,
	USER
}
