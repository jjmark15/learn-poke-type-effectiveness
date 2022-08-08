import { writable, type Writable } from 'svelte/store';
import { supabaseClient } from './supabaseClient';

export const user: Writable<UserSession | null> = writable(null);

supabaseClient.auth.onAuthStateChange((event, session) => {
    if (event == 'SIGNED_IN') {
        const sessionEmail = session?.user?.email;
    
        if (sessionEmail !== undefined) {
            user.set(new UserSession(sessionEmail));
        }
    }
});

export class UserSession {
	private _email: string;

	constructor(email: string) {
		this._email = email;
	}

	public email(): string {
		return this._email;
	}
}
