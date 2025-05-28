"use server"

import { requireUser } from "./utils/hooks"

export async function onboardUser() {
    const session = await requireUser()

    


}