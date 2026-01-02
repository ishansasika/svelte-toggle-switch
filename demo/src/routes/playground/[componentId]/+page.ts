import { SWITCH_METADATA } from '$data/componentMetadata';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const { componentId } = params;

	// For now we only have one component
	if (componentId === 'switch') {
		return {
			metadata: SWITCH_METADATA
		};
	}

	throw error(404, 'Component not found');
};
