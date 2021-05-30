import { Result, Err, Ok } from 'ts-results';

export function selectRandomMember<T>(list: Array<T>): Result<T, EmptyListError> {
	const length = list.length;
	if (length === 0) {
		return new Err(new EmptyListError());
	}
	const index = Math.floor(Math.random() * length);
	return new Ok(list[index]);
}

export class EmptyListError extends Error {
	constructor() {
		super('cannot select random member from empty list');
	}
}
