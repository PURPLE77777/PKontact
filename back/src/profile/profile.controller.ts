import { Controller } from '@nestjs/common'
import { ProfileService } from './profile.service'

@Controller('profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	getProfile(id: string) {
		return this.profileService.findUnique({ userId: id })
	}
}
