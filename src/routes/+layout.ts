import type { LayoutLoad } from './$types';
import { getLatestPost } from '$lib/utils';

export const load: LayoutLoad = async () => {
	const featured = await getLatestPost();
	return { featured };
};
