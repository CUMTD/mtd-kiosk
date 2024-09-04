import { IconMessage } from '../../sanity.types';

type IconMessageWithImages = IconMessage & { lightModeImageUrl: string; darkModeImageUrl: string };

export default IconMessageWithImages;
