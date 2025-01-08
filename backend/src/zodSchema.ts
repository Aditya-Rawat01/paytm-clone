import z from 'zod'

export const userSignature=z.object({
    firstName: z.string().min(3,"Name should be bigger than 3 characters").max(25, "Name should be smaller thatn 25 characters"),
    lastName:z.string().max(25,"Last Name should be lesser than 25 characters"),
    password:z.string().min(5,"Password should be atleast 5 characters"),
    username:z.string().min(3,"Username must be atleast 3 characters")
})

export const userSigninsignature=z.object({
    password:z.string().min(5,"Password should be atleast 5 characters"),
    username:z.string().min(3,"Username must be atleast 3 characters")
})


export type userType=z.infer<typeof userSignature>