import prisma from '../../prismaClient'

const userSchema = new prisma.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ['USER', 'CREATOR', 'MUSEUM', 'EDITOR'],
			default: 'USER',
		},
		title: { type: String, default: '' },
		bio: { type: String, default: '' },
		images: { type: String, default: null }, // Path to profile image
	},
	{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
