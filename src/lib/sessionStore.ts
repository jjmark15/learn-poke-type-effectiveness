import { writable, type Writable } from 'svelte/store';
import { supabaseClient } from './supabaseClient';

export class UserSession {
	private _email: string | undefined;
	private _active: boolean;

	constructor(email: string | undefined, active: boolean) {
		this._email = email;
		this._active = active;
	}

	public static active(email: string | undefined): UserSession {
		return new UserSession(email, true);
	}

	public static inactive(): UserSession {
		return new UserSession(undefined, false);
	}

	public email(): string | undefined {
		return this._email;
	}

	public active(): boolean {
		return this._active;
	}
}

export const user: Writable<UserSession> = writable(UserSession.inactive());

supabaseClient.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN') {
		const sessionEmail = session?.user?.email;
		user.set(UserSession.active(sessionEmail));
	}
});
