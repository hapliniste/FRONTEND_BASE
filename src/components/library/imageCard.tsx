import NextImage from 'next/image';
import { useState } from 'react';

//import type { Image } from '@/types';

export type Image = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
  username: string;
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ImageCard = ({ image }: { image: Image }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <a href={image.href} className="group">
      <div className="overflow-hidden rounded-lg bg-gray-200">
        <NextImage
          alt=""
          src={image.imageSrc}
          width={1000}
          height={1000}
          objectFit="cover"
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{image.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.username}</p>
    </a>
  );
};
export default ImageCard;