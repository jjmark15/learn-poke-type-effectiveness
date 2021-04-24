export enum Effectiveness {
	Zero,
	Half,
	Single,
	Double
}

export function effectivenessString(effectiveness: Effectiveness): string {
	switch (effectiveness) {
		case Effectiveness.Zero:
			return 'No effect';
		case Effectiveness.Half:
			return 'Not very effective';
		case Effectiveness.Single:
			return 'Normal';
		case Effectiveness.Double:
			return 'Super effective';
	}
}

export const EFFECTIVENESSES: Array<Effectiveness> = [
	Effectiveness.Zero,
	Effectiveness.Half,
	Effectiveness.Single,
	Effectiveness.Double
];
