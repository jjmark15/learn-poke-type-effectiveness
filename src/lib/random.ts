export function selectRandomMember<T>(list: Array<T>): T {
	const length = list.length;
	if (length === 0) {
		throw new Error('cannot select random member from empty list');
	}
	const index = Math.floor(Math.random() * length);
	return list[index];
}
